<template>
  <div class="object-page">
    <h1>{{ object.name }}</h1>
    <div>{{ object.description }}</div>
    <ObjectMap :object="object"/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import ObjectMap from '../components/ObjectMap.vue'

export default {
  name: 'Object',
  components: { ObjectMap },

  computed: {
    ...mapState(['object']),
    ...mapGetters(['isLoading']),

    objectId () {
      return this.$route.params.id
    }
  },

  watch: {
    '$route' () {
      this.getObjectById(this.objectId)
    }
  },

  created () {
    this.getObjectById(this.objectId)
  },

  methods: {
    ...mapActions([
      'getObjectById'
    ])
  }
}
</script>

<style scoped lang="scss">
.object-page {
  height: 80vh;
}
</style>
