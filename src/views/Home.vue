<template>
  <div class="okn-home-page">
    <h1>Map is coming soon...</h1>

    <ObjectsMap :objects="objects"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ObjectsMap from '../components/ObjectsMap.vue'

export default {
  name: 'Home',
  components: { ObjectsMap },

  computed: {
    ...mapGetters({
      objects: 'mapObjects'
    })
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
  height: 80vh;
}
</style>
