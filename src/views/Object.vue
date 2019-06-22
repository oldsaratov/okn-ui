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
        <h2 class="okn-object-events__title">События</h2>
        <el-timeline
          v-if="hasEvents"
          class="okn-object-events__timeline">
          <el-timeline-item
            v-for="(event, index) in object.events"
            :key="index"
            :timestamp="event.occuredAt"
          >{{ event.name }}</el-timeline-item>
        </el-timeline>
        <div
          v-else-if="!hasEvents"
          class="okn-object__no-data">С этим объектом пока ещё ничего не случилось.</div>
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

import ObjectsMap from '../components/ObjectsMap.vue'

export default {
  name: 'Object',
  components: { ObjectsMap },

  computed: {
    ...mapState(['object']),
    ...mapState(['loading']),

    objectId () {
      return this.$route.params.id
    },

    hasEvents () {
      return Array.isArray(this.object.events) && this.object.events.length > 0
    }
  },

  created () {
    this.getObjectById(this.objectId)
    this.getObjectEventsById(this.objectId)
  },

  beforeDestroy () {
    this.clearObject()
  },

  methods: {
    ...mapActions(['getObjectById', 'getObjectEventsById', 'clearObject'])
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

  .okn-object-events {
    padding-right: 30px;

    &__title {
      margin-top: 0;
    }

    &__timeline {
      padding-inline-start: 0;
    }
  }
}
</style>
