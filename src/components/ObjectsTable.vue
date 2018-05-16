<template>
  <el-table
    v-loading="isLoading"
    :data="objects"
    class="okn-objects-table"
    height="500">
    <el-table-column
      prop="name"
      label="Название">
      <template slot-scope="scope">
        <router-link :to="{ name: 'object', params: { id: scope.row.objectId }}">{{scope.row.name}}</router-link>
      </template>
    </el-table-column>
    <el-table-column
      :formatter="(row, column, cellValue) => typeFormatter(objectTypes, cellValue)"
      prop="type"
      label="Тип"
      width="200"/>
  </el-table>
</template>

<script>
import { mapState } from 'vuex'

import { OBJECT_OPTIONS } from '../constants'

export default {
  name: 'ObjectsTable',
  props: {
    objects: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      objectTypes: OBJECT_OPTIONS
    }
  },

  computed: {
    ...mapState(['isLoading'])
  },

  methods: {
    typeFormatter (objectTypes, cellValue) {
      return objectTypes.find(obj => obj.value === cellValue).label
    }
  }
}
</script>

<style lang="scss">
.el-table .cell {
  white-space: nowrap;
}

a {
  color: #42b983;
}
</style>
