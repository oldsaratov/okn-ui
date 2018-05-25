<template>
  <div class="okn-leaflet-map">
    <slot v-if="ready"/>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet.gridlayer.googlemutant'
import 'leaflet-plugins/layer/tile/Yandex'
import 'leaflet-panel-layers'

import { SARATOV_CENTER_COORDS } from '../constants'

export default {
  name: 'ObjectsMap',

  props: {
    objects: {
      type: Array,
      default: () => []
    },

    draggable: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      ready: false
    }
  },

  watch: {
    'objects': 'updateMarkers'
  },

  mounted () {
    this.initMap()
    this.addLayers()
  },

  methods: {
    initMap () {
      this.leafletMap = L.map(this.$el, {
        attributionControl: false,
        center: SARATOV_CENTER_COORDS,
        zoom: 13,
        minZoom: 1,
        maxZoom: 20,
        zoomPosition: 'topleft',
        layersPosition: 'topright'
      })

      this.ready = true
    },

    addLayers () {
      let googleRoadmapLayer = L.gridLayer.googleMutant({ type: 'roadmap' }).addTo(this.leafletMap)
      let googleSatelliteLayer = L.gridLayer.googleMutant({ type: 'satellite' })
      let googleHybridLayer = L.gridLayer.googleMutant({ type: 'hybrid' })
      let yandexSchemaLayer = new L.Yandex()
      let yandexSatelliteLayer = new L.Yandex('satellite')
      let yandexHybridLayer = new L.Yandex('hybrid')

      L.control.panelLayers([
        {
          group: 'Google',
          layers: [
            { name: 'Схема', layer: googleRoadmapLayer },
            { name: 'Спутник', layer: googleSatelliteLayer },
            { name: 'Гибрид', layer: googleHybridLayer }
          ]
        },
        {
          group: 'Яндекс',
          layers: [
            { name: 'Схема', layer: yandexSchemaLayer },
            { name: 'Спутник', layer: yandexSatelliteLayer },
            { name: 'Гибрид', layer: yandexHybridLayer }
          ]
        }
      ], []).addTo(this.leafletMap)
    },

    updateMarkers () {
      this.objects.forEach(object => {
        L.marker(this.getLatLng(object.coords), { draggable: this.draggable }).addTo(this.leafletMap)
      })

      // Center the map based on object coords if only one object has been passed
      if (this.objects.length === 1) {
        this.leafletMap.setView(this.getLatLng(this.objects[0].coords))
      }
    },

    getLatLng (coords) {
      return new L.LatLng(coords.latitude, coords.longitude)
    }
  }
}
</script>

<style lang="scss">
.okn-leaflet-map {
  height: 75% !important;
  margin-top: 15px;
}

.leaflet-panel-layers {
  .leaflet-panel-layers-group {
    margin-bottom: 5px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .leaflet-panel-layers-grouplabel {
    font-weight: 600;
  }

  .leaflet-panel-layers-title {
    span {
      margin-left: 3px;
    }
  }
}
</style>
