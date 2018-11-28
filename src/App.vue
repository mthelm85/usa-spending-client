<template>
  <v-app dark>
    <v-content>
      <Map></Map>
    </v-content>
  </v-app>
</template>

<script>
import Map from './components/Map'

export default {
  name: 'App',
  components: {
    Map
  },
  data () {
    return {
      //
    }
  }
}
</script>
