<template>
  <l-map
    ref="map"
    :zoom.sync="zoom"
    :options="mapOptions"
    :center="center"
    :min-zoom="minZoom"
    :max-zoom="maxZoom">
    <l-control-zoom :position="zoomPosition"/>
    <l-marker
      v-for="marker in markers"
      :key="marker.id"
      :visible="marker.visible"
      :draggable="marker.draggable"
      :lat-lng="marker.position"
      :icon="marker.icon"/>
  </l-map>
</template>

<script>
import L from 'leaflet'
import { LMap, LMarker, LControlZoom } from 'vue2-leaflet'
import 'leaflet.gridlayer.googlemutant'

import { SARATOV_CENTER_COORDS } from '../constants'

export default {
  name: 'ObjectMap',

  components: {
    LMap,
    LMarker,
    LControlZoom
  },

  props: {
    object: {
      type: Object,
      default () { return {} }
    }
  },

  data () {
    return {
      center: SARATOV_CENTER_COORDS,
      mapOptions: { zoomControl: false, attributionControl: false },
      zoom: 13,
      minZoom: 1,
      maxZoom: 20,
      zoomPosition: 'topleft',
      layersPosition: 'topright',
      markers: []
    }
  },

  computed: {
    leafletMap () {
      return this.$refs.map.mapObject
    }
  },

  watch: {
    'object.coords': 'updateMarker'
  },

  mounted () {
    this.addLayers()
  },

  methods: {
    updateMarker (coords) {
      let { latitude, longitude } = coords

      this.markers = [{
        id: 'm1',
        position: { lat: latitude, lng: longitude },
        tooltip: this.object.name,
        draggable: false,
        visible: true
      }]

      // Center the map based on object coords
      this.leafletMap.setView(new L.LatLng(latitude, longitude))
    },

    addLayers () {
      let roadMutant = L.gridLayer.googleMutant({ type: 'roadmap' }).addTo(this.leafletMap)
      let hybridMutant = L.gridLayer.googleMutant({ type: 'hybrid' })

      L.control.layers({
        Roadmap: roadMutant,
        Hybrid: hybridMutant
      }, {}, {
        collapsed: true
      }).addTo(this.leafletMap)
    }
  }
}
</script>

<style>
.vue2leaflet-map {
  height: 75% !important;
  margin-top: 15px;
}
</style>
