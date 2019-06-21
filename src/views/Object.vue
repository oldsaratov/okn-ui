<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="okn-object-page">
    <h1>{{ object.name }}</h1>
    <div>{{ object.description }}</div>
    <ObjectsMap :objects="[object]"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import ObjectsMap from '../components/ObjectsMap.vue'

export default {
  name: 'Object',
  components: { ObjectsMap },

  computed: {
    ...mapState(['object']),
    ...mapState(['loading']),

    objectId () {
      return this.$route.params.id
    }
  },

  created () {
    this.getObjectById(this.objectId)
    this.getObjectEventsById(this.objectId)
  },

  beforeDestroy () {
    this.clearObject()
  },

  methods: {
    ...mapActions(['getObjectById', 'getObjectEventsById', 'clearObject'])
  }
}
</script>

<style scoped lang="scss">
.okn-object-page {
  height: 80vh;

  h1 {
    margin-top: 0;
  }

  .okn-leaflet-map {
    min-height: 350px;
    margin-top: 15px;
  }
}
</style>
