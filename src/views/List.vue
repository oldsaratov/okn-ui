<template>
  <div class="list-page">
    <el-row
      :gutter="20"
      class="okn-filter-panel">
      <el-col :span="8">
        <el-input
          v-model="searchInput"
          placeholder="Поиск"
          prefix-icon="el-icon-search"/>
      </el-col>
      <el-col :span="8">
        <el-select
          v-model="selectedTypes"
          class="okn-filter-types"
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
      </el-col>
    </el-row>

    <ObjectsTable :objects="objects"/>

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
      searchInput: '',
      selectedTypes: [],
      previouslySelectedTypes: [],
      types: OBJECT_OPTIONS
    }
  },

  computed: {
    ...mapGetters([
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
      return this.selectedTypes.slice().sort().toString() !== this.previouslySelectedTypes.sort().toString()
    }
  }
}
</script>

<style scoped lang="scss">
.okn-filter-panel {
  margin-bottom: 10px;
}

.okn-filter-types {
  width: 100%;
}

.okn-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
