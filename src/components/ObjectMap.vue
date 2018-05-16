<template>
  <l-map
    :zoom.sync="zoom"
    :options="mapOptions"
    :center="center"
    :min-zoom="minZoom"
    :max-zoom="maxZoom"
    style="height: 45%" >
    <l-control-layers :position="layersPosition"/>
    <l-tile-layer
      v-for="tileProvider in tileProviders"
      :key="tileProvider.name"
      :name="tileProvider.name"
      :visible="tileProvider.visible"
      :url="tileProvider.url"
      :attribution="tileProvider.attribution"
      layer-type="base"/>
    <l-control-zoom :position="zoomPosition" />
    <l-marker
      v-for="marker in markers"
      :key="marker.id"
      :visible="marker.visible"
      :draggable="marker.draggable"
      :lat-lng="marker.position"
      :icon="marker.icon">
      <l-popup :content="marker.tooltip" />
      <l-tooltip :content="marker.tooltip" />
    </l-marker>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPolyline, LLayerGroup, LTooltip, LPopup, LControlZoom, LControlAttribution, LControlScale, LControlLayers } from 'vue2-leaflet'

import L from 'leaflet'
import object from '../store/modules/object'
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

  props: {
    object: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      center: [51.505, -0.09],
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
      markers: [
        { id: 'm1', position: { lat: 51.505, lng: -0.09 }, tooltip: object.name, draggable: true, visible: true }
      ]
    }
  }
}
</script>

<style>
@import '~leaflet/dist/leaflet.css';
</style>
