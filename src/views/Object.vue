<template>
  <div
    v-loading.fullscreen.lock="loading"
    class="okn-object">
    <h1 class="okn-object__title">{{ object.name }}</h1>

    <el-row class="okn-object__row">
      <el-col
        :span="12"
        class="okn-object__description">{{ object.description }}</el-col>

      <el-col
        :span="12"
        class="okn-object__photos">
        <el-row
          type="flex"
          justify="center">
          <el-col :span="22">
            <div class="okn-object__photo okn-object__photo--main">
              <i class="el-icon-picture-outline"/>
            </div>
          </el-col>
        </el-row>

        <el-row
          type="flex"
          justify="space-around">
          <el-col :span="6">
            <div class="okn-object__photo okn-object__photo--mini">
              <i class="el-icon-picture-outline"/>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="okn-object__photo okn-object__photo--mini">
              <i class="el-icon-picture-outline"/>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="okn-object__photo okn-object__photo--mini">
              <i class="el-icon-picture-outline"/>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row class="okn-object__row">
      <el-col
        :span="11"
        :offset="1"
        class="okn-object-events">
        <h2 class="okn-object-events__title">События</h2>
        <el-timeline class="okn-object-events__timeline">
          <el-timeline-item
            v-for="(event, index) in object.events"
            :key="index"
            :timestamp="event.occuredAt"
          >{{ event.name }}</el-timeline-item>
        </el-timeline>
      </el-col>

      <el-col :span="12">
        <el-row
          type="flex"
          justify="center">
          <el-col :span="22">
            <ObjectsMap :objects="[object]"/>
          </el-col>
        </el-row>
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

  &__photo {
    background: #f5f7fa;
    color: #909399;
    display: flex;
    justify-content: center;
    align-items: center;

    &--main {
      height: 250px;
      margin-bottom: 30px;
    }

    &--mini {
      height: 100px;
    }

    i {
      font-size: 30px;
    }
  }

  .okn-leaflet-map {
    min-height: 350px;
  }

  .okn-object-events {
    &__title {
      margin-top: 0;
    }

    &__timeline {
      padding-inline-start: 0;
    }
  }
}
</style>
