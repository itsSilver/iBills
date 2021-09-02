<template>
  <b-modal :active.sync="isModalActive" has-modal-card>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t('messages.confirm') }}</p>
      </header>
      <section class="modal-card-body">
        <p v-html="$t('warehouse.delete', { name: trashObjectName })"></p>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-small" type="button" @click="cancel">
          {{ $t('navtop.cancel') }}
        </button>
        <button class="button is-small is-danger" @click="confirm">
          {{ $t('navtop.delete') }}
        </button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalBox',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    trashObjectName: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isModalActive: false,
    }
  },
  watch: {
    isActive(newValue) {
      this.isModalActive = newValue
    },
    isModalActive(newValue) {
      if (!newValue) {
        this.cancel()
      }
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    confirm() {
      this.$emit('confirm')
    },
  },
}
</script>
