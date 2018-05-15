<template>
  <div class="list-page">
    <el-select
      v-model="selectedTypes"
      class="okn-types-filter"
      multiple
      placeholder="Тип"
      @visible-change="onFilterTypesToggled"
      @remove-tag="onFilterTypeRemoved">
      <el-option
        v-for="type in types"
        :key="type.value"
        :label="type.label"
        :value="type.value"/>
    </el-select>

    <div v-if="isLoading">Loading...</div>
    <ObjectsTable
      v-else
      :objects="objects"/>

    <el-pagination
      :current-page="page"
      :page-size="20"
      :total="total"
      class="okn-pagination"
      layout="prev, pager, next"
      @current-change="onCurrentPageChanged"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ObjectsTable from '../components/ObjectsTable.vue'
import { OBJECT_OPTIONS } from '../constants'

export default {
  name: 'Home',
  components: { ObjectsTable },

  data () {
    return {
      selectedTypes: [],
      previouslySelectedTypes: [],
      types: OBJECT_OPTIONS
    }
  },

  computed: {
    ...mapGetters([
      'isLoading',
      'objects',
      'page',
      'total'
    ])
  },

  created () {
    this.getObjectsByParams()
  },

  methods: {
    ...mapActions([
      'getObjectsByParams'
    ]),

    onFilterTypesToggled (isOpened) {
      if (!isOpened && this._selectedTypesHasBeenChanged()) {
        this.previouslySelectedTypes = this.selectedTypes
        this.getObjectsByParams({ page: 1, types: this.selectedTypes })
      }
    },

    onFilterTypeRemoved () {
      this.previouslySelectedTypes = this.selectedTypes
      this.getObjectsByParams({ page: 1, types: this.selectedTypes })
    },

    onCurrentPageChanged (page) {
      this.getObjectsByParams({ page, types: this.selectedTypes })
    },

    _selectedTypesHasBeenChanged () {
      return this.selectedTypes.sort().toString() !== this.previouslySelectedTypes.sort().toString()
    }
  }
}
</script>

<style scoped lang="scss">
  .okn-types-filter {
    width: 400px;
  }

  .okn-pagination {
    text-align: center;
  }
</style>
