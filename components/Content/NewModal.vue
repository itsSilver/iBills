<template>
  <b-modal :active.sync="isNewModalActive" :width="720" scroll="keep">
    <div class="">
      <header class="modal-card-head">
        <p class="modal-card-title header-title">
          <b>{{ title }}</b>
        </p>
      </header>
      <section class="modal-card-body">
        <slot />
      </section>
      <!-- <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">Cancel</button>
        <button class="button is-primary" @click="confirm">Save</button>
      </footer> -->
    </div>
  </b-modal>
</template>

<script>
export default {
  // computed: {
  //   newCompany() {
  //     return this.$store.state.companies.newCompany
  //   },
  // },
  // methods: {
  //   onCancel() {
  //     this.$store.commit('companies/CANCEL_COMPANY')
  //   },
  // },
  data() {
    return {
      isNewModalActive: false,
    }
  },
  watch: {
    isActiveNew(newValue) {
      this.isNewModalActive = newValue
    },
    isNewModalActive(newValue) {
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
  props: {
    isActiveNew: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
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
  border-bottom: 1px solid #f1f2f2;
}
</style>