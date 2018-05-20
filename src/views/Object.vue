<template>
  <div class="okn-object-page">
    <h1>{{ object.name }}</h1>
    <div>{{ object.description }}</div>
    <ObjectsMap :object="object"/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import ObjectsMap from '../components/ObjectsMap.vue'

export default {
  name: 'Object',
  components: { ObjectsMap },

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
.okn-object-page {
  height: 80vh;
}
</style>
