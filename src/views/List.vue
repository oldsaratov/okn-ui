<template>
  <div class="list-page">
    <div v-if="isLoading">Loading...</div>
    <ObjectsTable v-else :objects="objects"/>

    <el-pagination class="pagination"
                   layout="prev, pager, next"
                   :current-page="page"
                   :page-size="20"
                   :total="total"
                   @current-change="handleCurrentChange">
    </el-pagination>
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
      'objects',
      'page',
      'total'
    ])
  },

  methods: {
    ...mapActions([
      'getObjectsPerPage'
    ]),

    handleCurrentChange (page) {
      this.getObjectsPerPage(page)
    }
  },

  created () {
    this.getObjectsPerPage()
  }
}
</script>

<style scoped lang="scss">
  .pagination {
    text-align: center;
  }
</style>