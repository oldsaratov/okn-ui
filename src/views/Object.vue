<template>
  <div>
    <h1>{{ object.name }}</h1>
    <div>{{ object.description }}</div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Object',

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

</style>
