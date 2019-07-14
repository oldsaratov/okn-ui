<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="okn-object">
    <h1 class="okn-object__title">{{ object.name }}</h1>

    <el-row class="okn-object__row">
      <!-- Description -->
      <el-col
        :span="12"
        class="okn-object__description">
        <div v-if="object.description">{{ object.description }}</div>
        <div
          v-else-if="!object.description"
          class="okn-object__no-data">У этого объека пока нет описания.</div>
      </el-col>

      <!-- Photos -->
      <el-col
        :span="12"
        class="okn-object__photos">
        <el-row>
          <el-col :span="24">
            <div class="okn-object__photo okn-object__photo--main">
              <i class="el-icon-picture-outline"/>
            </div>
          </el-col>
        </el-row>

        <el-row
          type="flex"
          justify="space-between">
          <el-col :span="7">
            <div class="okn-object__photo okn-object__photo--mini">
              <i class="el-icon-picture-outline"/>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="okn-object__photo okn-object__photo--mini">
              <i class="el-icon-picture-outline"/>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="okn-object__photo okn-object__photo--mini">
              <i class="el-icon-picture-outline"/>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="okn-object__row">
      <!-- Events -->
      <el-col
        :span="12"
        class="okn-object-events">
        <ObjectEvents
          :object-id="objectId"
          :editable="true"/>
      </el-col>

      <!-- Map -->
      <el-col :span="12">
        <ObjectsMap :objects="[object]"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import ObjectEvents from '../components/ObjectEvents.vue'
import ObjectsMap from '../components/ObjectsMap.vue'

export default {
  name: 'Object',
  components: { ObjectEvents, ObjectsMap },

  computed: {
    ...mapState(['object']),
    ...mapState(['loading']),

    objectId () {
      return this.$route.params.id
    }
  },

  created () {
    this.getObjectById(this.objectId)
  },

  beforeDestroy () {
    this.clearObject()
  },

  methods: {
    ...mapActions(['getObjectById', 'clearObject'])
  }
}
</script>

<style scoped lang="scss">
.okn-object {
  height: 80vh;

  &__title {
    margin-top: 0;
  }

  &__row {
    margin-bottom: 30px;
  }

  &__description {
    padding-right: 30px;
  }

  &__photo {
    background: #f5f7fa;
    color: #909399;
    display: flex;
    justify-content: center;
    align-items: center;

    &--main {
      height: 300px;
      margin-bottom: 30px;
    }

    &--mini {
      height: 120px;
    }

    i {
      font-size: 30px;
    }
  }

  &__no-data {
    color: #909399;
    font-style: italic;
  }

  .okn-leaflet-map {
    min-height: 350px;
  }
}
</style>
