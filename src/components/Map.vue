<template lang="html">
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex>
        <v-card dark>
          <v-card-title primary-title>
            <h3>Government Contracts Where Labor Standards Apply - Data from USASpending.gov</h3>
          </v-card-title>
          <v-card-text>
            <div
              id="map"
              :class="{
                'mapxs': $vuetify.breakpoint.xs,
                'mapsm': $vuetify.breakpoint.sm,
                'mapmd': $vuetify.breakpoint.md,
                'maplg': $vuetify.breakpoint.lg,
                'mapxl': $vuetify.breakpoint.xl,
              }">
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
// import apiKeys from '@/apiKeys'
import L from 'leaflet'
import 'leaflet.markercluster'
export default {
  data () {
    return {
      location: {
        countyName: null,
        countiesViewed: [],
        stateName: null
      },
      map: {
        map: null,
        tileLayer: null,
        centerMarker: null
      },
      markerIcons: {
        center: new L.Icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      }
    }
  },

  mounted () {
    this.map.map = L.map('map', { zoomControl: false })
      .locate({ setView: true, maxZoom: 10 })
      .on('locationfound', (location) => {
        this.reverseGeolocate(location.latlng.lat, location.latlng.lng)
      })
      .on('dragend', () => {
        let location = this.map.map.getCenter()
        this.reverseGeolocate(location.lat, location.lng)
      })
    this.map.tileLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      subdomains: 'abcd',
      maxZoom: 14,
      minZoom: 8
    })
    this.map.tileLayer.addTo(this.map.map)
  },

  methods: {
    async fetchData () {
      // const res = await axios.get('http://localhost:3000/awards', {
      const res = await axios.get('https://usa-spending.herokuapp.com/awards', {
        params: {
          state_code: this.location.stateName,
          county_name: this.location.countyName
        }
      }).catch(err => console.log(err))
      // Push zip codes to a set, convert to array, pass array to API query so we don't
      // have to call the API hundreds of times to get the coords
      let zips = new Set()
      for (let i = 0; i < res.data.results.length; i++) {
        zips.add(res.data.results[i].primary_place_of_performance_zip_4.toString().substring(0, 5))
      }
      // const zipCoords = await axios.get('http://localhost:3000/zip', {
      const zipCoords = await axios.get('https://usa-spending.herokuapp.com/zip', {
        params: {
          zips: Array.from(zips)
        }
      }).catch(err => console.log(err))
      const zipCoordsArray = zipCoords.data.results
      function returnCoords (zip) {
        return zipCoordsArray.filter(z => z.ZIP === zip)
      }
      let markers = L.markerClusterGroup()
      for (let i = 0; i < res.data.results.length; i++) {
        if (returnCoords(res.data.results[i].primary_place_of_performance_zip_4.toString().substring(0, 5))[0] !== undefined) {
          markers.addLayer(
            L.marker([
              returnCoords(res.data.results[i].primary_place_of_performance_zip_4.toString().substring(0, 5))[0].LAT,
              returnCoords(res.data.results[i].primary_place_of_performance_zip_4.toString().substring(0, 5))[0].LNG
            ])
              .bindPopup(`
                <strong>Recipient:</strong> ${res.data.results[i].recipient_name}
                <br />
                <strong>Recipient Address:</strong> ${res.data.results[i].recipient_address_line_1}, ${res.data.results[i].recipient_city_name} ${res.data.results[i].recipient_zip_4_code}
                <br />
                <strong>Recipient Phone:</strong> ${res.data.results[i].recipient_phone_number}
                <br />
                <strong>Funding Agency:</strong> ${res.data.results[i].funding_agency_name}/${res.data.results[i].awarding_sub_agency_name}
                <br />
                <strong>Description:</strong> ${res.data.results[i].award_description}
                <br />
                <strong>Current Total Value of Award:</strong> ${res.data.results[i].current_total_value_of_award}
                <br />
                <strong>NAICS:</strong> ${res.data.results[i].naics_code}
                <br />
                <strong>NAICS Description:</strong> ${res.data.results[i].naics_description}
                <br />
                <strong>No. of Employees:</strong> ${res.data.results[i].number_of_employeees}
                <br />
                <strong>Current End Date:</strong> ${res.data.results[i].period_of_performance_current_end_date}
                <br />
                <strong>Potential End Date:</strong> ${res.data.results[i].period_of_performance_potential_end_date}
                <br />
                <strong>Primary Place of Performance:</strong> ${res.data.results[i].primary_place_of_performance_city_name}
                `)
          )
        }
      }
      this.map.map.addLayer(markers)
    },
    async reverseGeolocate (lat, lng) {
      const geocode = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyADvjrQS1WEJIw7NSd7-9Wvdfo0ylybi3U`).catch(err => console.log(err))
      let countyName = null
      geocode.data.results.forEach((x) => {
        if (x.types.includes('administrative_area_level_2')) {
          countyName = x.address_components[0].short_name.replace(' County', '')
          this.location.countyName = countyName.toUpperCase()
        } else if (x.types.includes('administrative_area_level_1')) {
          this.location.stateName = x.address_components[0].short_name
        }
      })
      if (this.location.countiesViewed.includes(countyName) === false) {
        this.fetchData()
        this.location.countiesViewed.push(countyName)
      }
    }
  }
}
</script>

<style lang="css">
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
.mapxs {
  height: 220px;
}
.mapsm {
  height: 400px;
}
.mapmd {
  height: 500px;
}
.maplg {
  height: 600px;
}
.mapxl {
  height: 800px;
}
</style>
