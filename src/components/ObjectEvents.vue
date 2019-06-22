<template>
  <div class="okn-events">
    <h2 class="okn-events__title">События</h2>

    <el-timeline
      v-if="hasEvents"
      class="okn-events__timeline">
      <el-timeline-item
        v-for="(event, index) in events"
        :key="index"
        :timestamp="event.occuredAt">{{ event.name }}</el-timeline-item>
    </el-timeline>

    <div
      v-else-if="!hasEvents"
      class="okn-events__no-data">С этим объектом пока ещё ничего не случилось.</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Object',
  props: {
    objectId: {
      type: String,
      required: true
    }
  },

  computed: {
    ...mapGetters(['events']),

    hasEvents () {
      return Array.isArray(this.events) && this.events.length > 0
    }
  },

  created () {
    this.getObjectEventsById(this.objectId)
  },

  beforeDestroy () {
    this.clearObjectEvents()
  },

  methods: {
    ...mapActions(['getObjectEventsById', 'clearObjectEvents'])
  }
}
</script>

<style scoped lang="scss">
.okn-events {
  padding-right: 30px;

  &__title {
    margin-top: 0;
  }

  &__timeline {
    padding-inline-start: 0;
  }

  &__no-data {
    color: #909399;
    font-style: italic;
  }
}
</style>
