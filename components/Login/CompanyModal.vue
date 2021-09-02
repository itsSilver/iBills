<template>
  <b-modal :active.sync="isCompanyActive" :width="450" scroll="keep">
    <div class="">
      <header class="modal-card-head">
        <p class="modal-card-title header-title">
          <b>{{ title }}</b>
        </p>
      </header>
      <section class="modal-card-body">
        <slot />
      </section>
    </div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      isCompanyActive: false,
    }
  },
  watch: {
    isActiveCompany(newValue) {
      this.isCompanyActive = newValue
    },
    isCompanyActive(newValue) {
      if (!newValue) {
        this.cancel()
      }
    },
  },
  computed: {
    companies() {
      return this.$store.state.companies.companies
    },
  },
  props: {
    isActiveCompany: {
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