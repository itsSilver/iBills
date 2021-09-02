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
                <b-field :label="$t('table.tax_code')">
                  <b-input
                    v-model="createData.tax_code"
                    icon="percent"
                    :placeholder="
                      $t('messages.placeholder', {
                        name: `${$t('table.tax_code')}`,
                      })
                    "
                    name="tax_code"
                    size="is-small"
                    required
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field :label="$t('table.tax_value')">
                  <b-input
                    v-model="createData.tax_value"
                    icon="label-percent"
                    :placeholder="
                      $t('messages.placeholder', {
                        name: `${$t('table.tax_value')}`,
                      })
                    "
                    size="is-small"
                    name="tax_value"
                    required
                  />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field :label="$t('table.note')">
                  <b-input
                    v-model="createData.desc"
                    icon="note-edit"
                    :placeholder="
                      $t('messages.placeholder', {
                        name: `${$t('table.note')}`,
                      })
                    "
                    name="desc"
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
  name: 'VatsCreate',

  data() {
    return {
      isActive: false,
      isLoading: false,
      createData: {
        tax_code: null,
        tax_value: null,
        desc: null,
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
        .post(`/vats`, this.createData, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          this.reset()
          this.$emit('vat-created', resp.data)
          this.isLoading = false
          this.cancel()
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