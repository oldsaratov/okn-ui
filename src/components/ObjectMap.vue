<template>
  <l-map
    ref="map"
    :zoom.sync="zoom"
    :options="mapOptions"
    :center="center"
    :min-zoom="minZoom"
    :max-zoom="maxZoom">
    <l-control-layers :position="layersPosition"/>
    <l-tile-layer
      v-for="tileProvider in tileProviders"
      :key="tileProvider.name"
      :name="tileProvider.name"
      :visible="tileProvider.visible"
      :url="tileProvider.url"
      :attribution="tileProvider.attribution"
      layer-type="base"/>
    <l-control-zoom :position="zoomPosition"/>
    <l-marker
      v-for="marker in markers"
      :key="marker.id"
      :visible="marker.visible"
      :draggable="marker.draggable"
      :lat-lng="marker.position"
      :icon="marker.icon">
      <l-popup :content="marker.tooltip"/>
      <l-tooltip :content="marker.tooltip"/>
    </l-marker>
  </l-map>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LPolyline,
  LLayerGroup,
  LTooltip,
  LPopup,
  LControlZoom,
  LControlAttribution,
  LControlScale,
  LControlLayers
} from 'vue2-leaflet'

import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const tileProviders = [
  {
    name: 'OpenStreetMap',
    visible: true,
    attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }
]

export default {
  name: 'ObjectMap',

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPolyline,
    LLayerGroup,
    LTooltip,
    LPopup,
    LControlZoom,
    LControlAttribution,
    LControlScale,
    LControlLayers
  },

  props: ['object'],

  data () {
    return {
      center: [51.537996, 46.0225103],
      opacity: 0.6,
      mapOptions: { zoomControl: false, attributionControl: false },
      zoom: 13,
      minZoom: 1,
      maxZoom: 20,
      zoomPosition: 'topleft',
      attributionPosition: 'bottomright',
      layersPosition: 'topright',
      attributionPrefix: 'Vue2Leaflet',
      imperial: false,
      Positions: ['topleft', 'topright', 'bottomleft', 'bottomright'],
      tileProviders: tileProviders,
      markers: []
    }
  },

  watch: {
    'object.coords': 'updateMarker'
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
      this.$refs.map.mapObject.setView(new L.LatLng(latitude, longitude))
    }
  }
}
</script>

<style>
@import '~leaflet/dist/leaflet.css';

.vue2leaflet-map {
  height: 75% !important;
  margin-top: 15px;
}
</style>
