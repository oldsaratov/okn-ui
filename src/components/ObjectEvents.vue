<template>
  <div class="okn-events">
    <h2 class="okn-events__title">События</h2>

    <el-timeline
      v-if="hasEvents"
      :reverse="true"
      class="okn-events__timeline">
      <el-timeline-item
        v-for="(event, index) in events"
        :key="index"
        :timestamp="event.occuredAt"
        class="okn-event">
        <div class="okn-event__name">{{ event.name }}</div>
        <el-tooltip v-if="editable" content="Редактировать" placement="top" :open-delay="500">
          <i class="el-icon-edit okn-event__icon"></i>
        </el-tooltip>

        <el-tooltip v-if="editable" content="Удалить" placement="top" :disabled="disabled" :open-delay="500">
          <i v-if="editable" class="el-icon-delete okn-event__icon" @click="showDeleteConfirmationDialog(event)"></i>
        </el-tooltip>
      </el-timeline-item>
    </el-timeline>

    <div
      v-else-if="!hasEvents"
      class="okn-events__no-data">
      С этим объектом пока ещё ничего не случилось.
    </div>
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
    },
    editable: {
      type: Boolean,
      default: false
    }
  },

   data() {
      return {
        disabled: false
      };
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
    ...mapActions(['getObjectEventsById', 'clearObjectEvents']),

    showDeleteConfirmationDialog(event) {
      this.$confirm('Уверены, что хотите удалить это событие?', '', {
          confirmButtonText: 'Удалить',
          cancelButtonText: 'Отмена',
          focusAfterClosed: false,
          type: 'warning'
        }).then(() => {
          this.preventIconFocus()

          // TODO: Send request to delete Event
          this.$message({ type: 'success', message: 'Событие удалено' });
        }).catch(() => this.preventIconFocus());
    },

    preventIconFocus() {
      this.disabled = true;

      setTimeout(() => this.disabled = false, 1000)
    }
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

  .okn-event {
    &__name {
      font-size: 15px;
      display: inline-block;
      margin-right: 10px;
    }

    &__icon {
      font-size: 20px;
      margin-right: 8px;
      color: #409eff;
      cursor: pointer;
      outline: none;
    }
  }
}
</style>
