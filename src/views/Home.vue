<template>
  <div class="about">
    <h1>Map is coming soon...</h1>

    {{ objects }}
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',

  computed: {
    ...mapGetters([
      'objects'
    ])
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