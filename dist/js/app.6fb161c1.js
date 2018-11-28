(function(t){function e(e){for(var a,s,c=e[0],i=e[1],l=e[2],p=0,d=[];p<c.length;p++)s=c[p],r[s]&&d.push(r[s][0]),r[s]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a]);u&&u(e);while(d.length)d.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,c=1;c<n.length;c++){var i=n[c];0!==r[i]&&(a=!1)}a&&(o.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},r={app:0},o=[];function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],i=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var u=i;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"1b8b":function(t,e,n){},5490:function(t,e,n){"use strict";var a=n("1b8b"),r=n.n(a);r.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var a=n("2b0e"),r=n("bb71");n("da64");a["a"].use(r["a"],{iconfont:"md"});var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{dark:""}},[n("v-content",[n("Map")],1)],1)},s=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{fluid:"","fill-height":""}},[n("v-layout",{attrs:{"align-center":"","justify-center":""}},[n("v-flex",[n("v-card",{attrs:{dark:""}},[n("v-card-title",{attrs:{"primary-title":""}},[n("h3",[t._v("Government Contracts Where Labor Standards Apply - Data from USASpending.gov")])]),n("v-card-text",[n("div",{class:{mapxs:t.$vuetify.breakpoint.xs,mapsm:t.$vuetify.breakpoint.sm,mapmd:t.$vuetify.breakpoint.md,maplg:t.$vuetify.breakpoint.lg,mapxl:t.$vuetify.breakpoint.xl},attrs:{id:"map"}})])],1)],1)],1)],1)},i=[],l=(n("a481"),n("6762"),n("2fdb"),n("1c4c"),n("6b54"),n("ac6a"),n("5df3"),n("4f7f"),n("96cf"),n("1da1")),u=n("bc3a"),p=n.n(u),d=n("e11e"),f=n.n(d),m=(n("2573"),{data:function(){return{location:{countyName:null,countiesViewed:[],stateName:null},map:{map:null,tileLayer:null,centerMarker:null},markerIcons:{center:new f.a.Icon({iconUrl:"https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",shadowUrl:"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]})}}},mounted:function(){var t=this;this.map.map=f.a.map("map",{zoomControl:!1}).locate({setView:!0,maxZoom:10}).on("locationfound",function(e){t.reverseGeolocate(e.latlng.lat,e.latlng.lng)}).on("dragend",function(){var e=t.map.map.getCenter();t.reverseGeolocate(e.lat,e.lng)}),this.map.tileLayer=f.a.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}{r}.png",{attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',subdomains:"abcd",maxZoom:14,minZoom:8}),this.map.tileLayer.addTo(this.map.map)},methods:{fetchData:function(){var t=Object(l["a"])(regeneratorRuntime.mark(function t(){var e,n,a,r,o,s,c,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return s=function(t){return o.filter(function(e){return e.ZIP===t})},t.next=3,p.a.get("https://usa-spending.herokuapp.com/awards",{params:{state_code:this.location.stateName,county_name:this.location.countyName}}).catch(function(t){return console.log(t)});case 3:for(e=t.sent,console.log(e),n=new Set,a=0;a<e.data.results.length;a++)n.add(e.data.results[a].primary_place_of_performance_zip_4.toString().substring(0,5));return t.next=9,p.a.get("https://usa-spending.herokuapp.com/zip",{params:{zips:Array.from(n)}}).catch(function(t){return console.log(t)});case 9:for(r=t.sent,o=r.data.results,c=f.a.markerClusterGroup(),i=0;i<e.data.results.length;i++)void 0!==s(e.data.results[i].primary_place_of_performance_zip_4.toString().substring(0,5))[0]&&c.addLayer(f.a.marker([s(e.data.results[i].primary_place_of_performance_zip_4.toString().substring(0,5))[0].LAT,s(e.data.results[i].primary_place_of_performance_zip_4.toString().substring(0,5))[0].LNG]).bindPopup("\n                <strong>Recipient:</strong> ".concat(e.data.results[i].recipient_name,"\n                <br />\n                <strong>Recipient Address:</strong> ").concat(e.data.results[i].recipient_address_line_1,", ").concat(e.data.results[i].recipient_city_name," ").concat(e.data.results[i].recipient_zip_4_code,"\n                <br />\n                <strong>Recipient Phone:</strong> ").concat(e.data.results[i].recipient_phone_number,"\n                <br />\n                <strong>Funding Agency:</strong> ").concat(e.data.results[i].funding_agency_name,"/").concat(e.data.results[i].awarding_sub_agency_name,"\n                <br />\n                <strong>Description:</strong> ").concat(e.data.results[i].award_description,"\n                <br />\n                <strong>Current Total Value of Award:</strong> ").concat(e.data.results[i].current_total_value_of_award,"\n                <br />\n                <strong>NAICS:</strong> ").concat(e.data.results[i].naics_code,"\n                <br />\n                <strong>NAICS Description:</strong> ").concat(e.data.results[i].naics_description,"\n                <br />\n                <strong>No. of Employees:</strong> ").concat(e.data.results[i].number_of_employeees,"\n                <br />\n                <strong>Current End Date:</strong> ").concat(e.data.results[i].period_of_performance_current_end_date,"\n                <br />\n                <strong>Potential End Date:</strong> ").concat(e.data.results[i].period_of_performance_potential_end_date,"\n                <br />\n                <strong>Primary Place of Performance:</strong> ").concat(e.data.results[i].primary_place_of_performance_city_name,"\n                ")));this.map.map.addLayer(c);case 14:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),reverseGeolocate:function(){var t=Object(l["a"])(regeneratorRuntime.mark(function t(e,n){var a,r,o=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p.a.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=".concat(e,",").concat(n,"&key=").concat(Object({NODE_ENV:"production",BASE_URL:"/"}).GOOGLE_API)).catch(function(t){return console.log(t)});case 2:a=t.sent,r=null,a.data.results.forEach(function(t){t.types.includes("administrative_area_level_2")?(r=t.address_components[0].short_name.replace(" County",""),o.location.countyName=r.toUpperCase()):t.types.includes("administrative_area_level_1")&&(o.location.stateName=t.address_components[0].short_name)}),!1===this.location.countiesViewed.includes(r)&&(this.fetchData(),this.location.countiesViewed.push(r));case 6:case"end":return t.stop()}},t,this)}));return function(e,n){return t.apply(this,arguments)}}()}}),g=m,_=(n("5490"),n("2877")),h=n("6544"),b=n.n(h),v=n("b0af"),y=n("99d9"),w=n("12b2"),x=n("a523"),k=n("0e8f"),S=n("a722"),O=Object(_["a"])(g,c,i,!1,null,null,null);O.options.__file="Map.vue";var j=O.exports;b()(O,{VCard:v["a"],VCardText:y["a"],VCardTitle:w["a"],VContainer:x["a"],VFlex:k["a"],VLayout:S["a"]});var A={name:"App",components:{Map:j},data:function(){return{}}},C=A,P=n("7496"),V=n("549c"),L=Object(_["a"])(C,o,s,!1,null,null,null);L.options.__file="App.vue";var N=L.exports;b()(L,{VApp:P["a"],VContent:V["a"]}),a["a"].config.productionTip=!1,new a["a"]({render:function(t){return t(N)}}).$mount("#app")}});
//# sourceMappingURL=app.6fb161c1.js.map