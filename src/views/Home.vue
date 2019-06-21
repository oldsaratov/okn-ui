<template>
  <div class="okn-home-page">
    <ObjectsMap
      :objects="mappedObjects"
      :is-clustered="true"/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import ObjectsMap from '../components/ObjectsMap.vue'

export default {
  name: 'Home',
  components: { ObjectsMap },

  computed: {
    ...mapState(['loading']),
    ...mapGetters({
      objects: 'mapObjects'
    }),

    mappedObjects: function () {
      return [...this.objects]
    }
  },

  created () {
    this.getAllObjects()
  },

  methods: {
    ...mapActions([
      'getAllObjects'
    ])
  }
}
</script>

<style scoped lang="scss">
.okn-home-page {
  height: calc(100vh - 52px);

  .okn-leaflet-map {
    min-height: 450px;
  }
}
</style>
