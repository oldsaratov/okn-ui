<template>
  <div class="hello">
    <div
      v-for="object in objects"
      :key="object.id">
      {{ object.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ObjectsTable',
  props: {
    objects: {
      type: Array,
      required: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}
</style>
