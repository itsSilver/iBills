<template>
  <b-modal :active.sync="isActive" :width="720" scroll="keep">
    <div class="">
      <header class="modal-card-head">
        <p class="modal-card-title header-title">
          <b>{{ title }}</b>
        </p>
      </header>
      <section class="modal-card-body">
        <div>
          <form @submit.prevent="onUpdate">
            <div class="columns">
              <div class="column">
                <b-field :label="$t('table.name')">
                  <b-input
                    v-model="updateData.name"
                    icon="account"
                    placeholder="Name"
                    size="is-small"
                    name="name"
                    required
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field :label="$t('table.code')">
                  <b-input
                    v-model="updateData.code"
                    icon="barcode"
                    placeholder="Code"
                    size="is-small"
                    name="code"
                  />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field :label="$t('table.note')">
                  <b-input
                    v-model="updateData.note"
                    icon="note-edit"
                    placeholder="Note"
                    name="note"
                    size="is-small"
                    type="textarea"
                  />
                </b-field>
              </div>
            </div>
            <hr />

            <div class="is-flex footer-new-modal">
              <b-button class="button is-small" type="button" @click="cancel">
                {{ $t('navtop.cancel') }}
              </b-button>

              <button type="submit" class="button is-primary is-small">
                {{ $t('navtop.update') }}
              </button>
            </div>
            <b-loading v-model="isLoading"></b-loading>
          </form>
        </div>
      </section>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'CategoryUpdate',
  data() {
    return {
      isActive: false,
      isLoading: false,
      updateData: [],
    }
  },
  watch: {
    isModalActive(newValue) {
      // if (value) {
      //   this.getCompanyData
      // }
      this.isActive = newValue
    },
    isActive(newValue) {
      if (!newValue) {
        this.cancel()
      }
    },
    categoryId(newValue) {
      this.getCategoryId(newValue)
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    confirm() {
      this.$emit('confirm')
    },
    async getCategoryId(id) {
      this.isLoading = true
      this.$axios
        .get(`/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.updateData = res.data
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          console.log('err', err)
        })
    },
    async onUpdate() {
      this.isLoading = true
      await this.$axios
        .put(`/categories/${this.updateData.id}`, this.updateData, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          this.cancel()
          this.$emit('category-updated', resp.data)
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          console.log('err', err)
        })
    },
  },
  props: {
    isModalActive: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    categoryId: {
      type: Number,
      default: null,
    },
  },
}
</script>

<style>
</style>