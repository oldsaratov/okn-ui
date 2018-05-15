<template>
  <el-table
    class="okn-objects-table"
    v-loading="isLoading"
    :data="objects"
    height="500">
    <el-table-column prop="name" label="Название"></el-table-column>
    <el-table-column
        prop="type"
        label="Тип"
        width="200"
        :formatter="(row, column, cellValue) => typeFormatter(objectTypes, cellValue)">
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters } from 'vuex'

import { OBJECT_OPTIONS } from '../constants'

export default {
  name: 'ObjectsTable',
  props: {
    objects: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      objectTypes: OBJECT_OPTIONS
    }
  },

  computed: {
    ...mapGetters(['isLoading'])
  },

  methods: {
    typeFormatter (objectTypes, cellValue) {
      return objectTypes.find(obj => obj.value === cellValue).label
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
