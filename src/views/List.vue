<template>
  <div class="list-page">
    <div v-if="isLoading">Loading...</div>
    <ObjectsTable v-else :objects="objects"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ObjectsTable from '@/components/ObjectsTable.vue'

export default {
  name: 'home',
  components: {
    ObjectsTable
  },

  computed: {
    ...mapGetters([
      'isLoading',
      'objects'
    ])
  },

  methods: {
    ...mapActions([
      'getObjectsPerPage'
    ])
  },

  created () {
    this.getObjectsPerPage()
  }
}
</script>
