<template>
  <div class="okn-events">
    <div class="okn-events__title-container">
      <h2 class="okn-events__title">События</h2>

      <el-button
        v-if="editable"
        type="text"
        icon="el-icon-plus"
        @click="openNewEventDialog()">Добавить</el-button>
    </div>

    <el-timeline
      v-if="hasEvents"
      :reverse="true"
      class="okn-events__timeline">
      <el-timeline-item
        v-for="(event, index) in events"
        :key="index"
        :timestamp="event.occuredAt | moment('DD/MM/YYYY')"
        class="okn-event">
        <div class="okn-event__name">{{ event.name }}</div>
        <el-tooltip
          v-if="editable"
          :open-delay="500"
          content="Редактировать"
          placement="top">
          <i
            class="el-icon-edit okn-event__icon"
            @click="openEditEventDialog(event)"/>
        </el-tooltip>

        <el-tooltip
          v-if="editable"
          :disabled="tooltipDisabled"
          :open-delay="500"
          content="Удалить"
          placement="top">
          <i
            v-if="editable"
            class="el-icon-delete okn-event__icon"
            @click="openDeleteConfirmationDialog(event)"/>
        </el-tooltip>
      </el-timeline-item>
    </el-timeline>

    <div
      v-else-if="!hasEvents"
      class="okn-events__no-data">
      С этим объектом пока ещё ничего не случилось.
    </div>

    <el-dialog
      :title="eventDialogTitle"
      :visible.sync="eventDialogVisible"
      class="okn-events__dialog">
      <el-form
        ref="eventForm"
        :model="eventForm"
        :rules="eventFormRules"
        label-width="120px">
        <el-form-item
          prop="name"
          label="Заголовок">
          <el-input
            v-model="eventForm.name"
            autocomplete="off"/>
        </el-form-item>

        <el-form-item label="Описание">
          <el-input
            v-model="eventForm.description"
            type="textarea"/>
        </el-form-item>

        <el-form-item label="Дата">
          <el-date-picker
            v-model="eventForm.occuredAt"
            type="date"
            placeholder="Выберите дату"/>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="closeEventDialog()">Отмена</el-button>
        <el-button
          type="primary"
          @click="submitEventForm()">{{ eventDialogSubmitButtonText }}</el-button>
      </span>
    </el-dialog>
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

  data () {
    return {
      eventForm: {},
      newEvent: {
        name: '',
        description: '',
        occuredAt: ''
      },
      eventFormRules: {
        name: [
          { required: true, message: 'Обязательное поле', trigger: 'blur' }
        ]
      },
      eventDialogTitle: '',
      eventDialogSubmitButtonText: '',
      eventDialogVisible: false,
      tooltipDisabled: false
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
    ...mapActions(['getObjectEventsById', 'clearObjectEvents']),

    openNewEventDialog () {
      this.eventDialogMode = 'new'
      this.eventDialogTitle = 'Новое событие'
      this.eventDialogSubmitButtonText = 'Добавить'
      this.eventForm = Object.assign({}, this.newEvent)
      this.toggleEventDialogVisible(true)
    },

    openEditEventDialog (event) {
      this.eventDialogMode = 'edit'
      this.eventDialogTitle = 'Редактирование события'
      this.eventDialogSubmitButtonText = 'Сохранить'
      this.eventForm = Object.assign({}, event)
      this.toggleEventDialogVisible(true)
    },

    toggleEventDialogVisible (value) {
      this.eventDialogVisible = value
    },

    openDeleteConfirmationDialog (event) {
      this.$confirm('Уверены, что хотите удалить это событие?', '', {
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        focusAfterClosed: false,
        type: 'warning'
      }).then(() => {
        this.preventIconFocus()

        // TODO: Send request to delete Event
        this.$message({ type: 'success', message: 'Событие удалено' })
      }).catch(() => this.preventIconFocus())
    },

    closeEventDialog () {
      this.$refs['eventForm'].resetFields()
      this.toggleEventDialogVisible(false)
    },

    submitEventForm () {
      this.$refs['eventForm'].validate((valid) => {
        if (valid) {
          if (this.eventDialogMode === 'new') {
            this.createEvent()
          } else if (this.eventDialogMode === 'edit') {
            this.saveEvent()
          }
        } else {
          return false
        }
      })
    },

    createEvent () {
      console.log('TODO: Send request to create Event', this.eventForm)
    },

    saveEvent () {
      console.log('TODO: Send request to save Event', this.eventForm)
    },

    preventIconFocus () {
      this.tooltipDisabled = true

      setTimeout(() => this.tooltipDisabled = false, 1000)
    }
  }
}
</script>

<style scoped lang="scss">
.okn-events {
  padding-right: 30px;

  &__title {
    display: inline-block;
    margin: 0 10px 0 0;
    line-height: 40px;
  }

  &__title-container {
    margin-bottom: 20px;
  }

  &__timeline {
    padding-inline-start: 0;
  }

  &__no-data {
    color: #909399;
    font-style: italic;
  }

  &__dialog {
    .el-dialog__body {
      padding-top: 10px;
      padding-bottom: 10px;
    }
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
