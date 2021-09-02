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
                    name="name"
                    required
                    size="is-small"
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field :label="$t('table.code')">
                  <b-input
                    v-model="createData.code"
                    icon="barcode"
                    placeholder="Code"
                    name="code"
                    size="is-small"
                  />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field :label="$t('table.location')">
                  <b-input
                    v-model="createData.location"
                    icon="pin"
                    :placeholder="$t('table.location')"
                    name="location"
                    size="is-small"
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field :label="$t('table.color')">
                  <b-input
                    v-model="createData.color"
                    icon="palette"
                    name="color"
                    type="color"
                    size="is-small"
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
import mapValues from 'lodash/mapValues'
export default {
  name: 'LocationsCreate',

  data() {
    return {
      isActive: false,
      isLoading: false,
      createData: {
        name: null,
        code: null,
        location: null,
        color: null,
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
      this.createData.warehouse = this.$store.state.companies.company_id
      await this.$axios
        .post(`/locations`, this.createData, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          this.$emit('category-created', resp.data)
          this.isLoading = false
          this.cancel()
          this.reset()
        })
        .catch((err) => {
          this.isLoading = false
          console.log('err', err)
        })
    },
    reset() {
      this.createData = mapValues(this.createData, (item) => {
        if (item && typeof item === 'object') {
          return []
        }
        return null
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