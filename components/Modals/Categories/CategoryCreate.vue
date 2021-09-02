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
          <form @submit.prevent="onCreate">
            <div class="columns">
              <div class="column">
                <b-field :label="$t('table.name')">
                  <b-input
                    v-model="createData.name"
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
                    v-model="createData.code"
                    size="is-small"
                    icon="barcode"
                    placeholder="Code"
                    name="code"
                  />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field :label="$t('table.note')">
                  <b-input
                    v-model="createData.note"
                    icon="note-edit"
                    size="is-small"
                    placeholder="Note"
                    name="note"
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
                {{ $t('navtop.create') }}
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
  name: 'CategoryCreate',

  data() {
    return {
      isActive: false,
      isLoading: false,
      createData: {
        name: null,
        code: null,
        note: null,
      },
      empty: {
        name: null,
        code: null,
        note: null,
      },
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
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    confirm() {
      this.$emit('confirm')
    },

    async onCreate() {
      this.isLoading = true

      await this.$axios
        .post(`/categories`, this.createData, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          this.createData = this.empty
          this.$emit('category-created', resp.data)
          this.isLoading = false
          this.cancel()
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
  },
}
</script>

<style>
</style>