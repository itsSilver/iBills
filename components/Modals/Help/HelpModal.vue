<template>
  <b-modal
    :active.sync="helpModalActive"
    :width="640"
    scroll="keep"
    class="help-modal"
  >
    <help-card @cancel="cancel" :title="$t('help.title')" />
  </b-modal>
</template>

<script>
import HelpCard from './HelpCard.vue'

export default {
  name: 'HelpModal',
  components: {
    HelpCard,
  },
  data() {
    return {
      helpModalActive: false,
    }
  },
  watch: {
    isActiveDrawer(newValue) {
      this.helpModalActive = newValue
    },
    helpModalActive(newValue) {
      if (!newValue) {
        this.cancel()
      }
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
  },
  props: {
    isActiveDrawer: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.header-title {
  font-size: 1.25rem;
  text-align: center;
  text-transform: capitalize;
}
.modal-card-foot {
  display: flex;
  justify-content: space-between;
}
.modal-card-body {
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
}
</style>