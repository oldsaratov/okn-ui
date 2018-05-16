<template>
  <div>
    Объект {{ $route.params.id }}
    {{object.name}}
  </div>

</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Object',

  created () {
    this.getObjectById(this.objectId)
  },

  watch: {
    '$route' () {
      this.getObjectById(this.objectId)
    }
  },

  computed: {
    ...mapState(['object']),
    ...mapGetters(['isLoading']),

    objectId () {
      return this.$route.params.id;
    }
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