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
                <b-field :label="$t('table.code')">
                  <b-input
                    v-model="createData.code"
                    :placeholder="
                      $t('messages.placeholder', {
                        name: `${$t('table.code')}`,
                      })
                    "
                    name="code"
                    size="is-small"
                    required
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field :label="$t('table.date')">
                  <client-only>
                    <b-datepicker
                      :placeholder="
                        $t('messages.placeholder', {
                          name: `${$t('table.date')}`,
                        })
                      "
                      v-model="createData.date"
                      icon="calendar-today"
                      :locale="locales"
                      size="is-small"
                      required
                    >
                    </b-datepicker>
                  </client-only>
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field :label="$t('table.customer')">
                  <b-autocomplete
                    size="is-small"
                    v-model="createData.customer"
                    open-on-focus
                    ref="autocompleteSupplier"
                    :loading="loadingSupplier"
                    :data="supplierData"
                    @typing="filteredSupplier"
                    :placeholder="
                      $t('messages.placeholder', {
                        name: `${$t('table.supplier')}`,
                      })
                    "
                    field="name"
                    @select="onSelectSupplier"
                    @focus="onFocusSupplier"
                    required
                  >
                    <template slot-scope="props">
                      <div class="media">
                        <div class="media-content">
                          <p>
                            <b>{{ props.option.name }}</b>
                            <br />

                            {{ $t('table.phone_number') }}:
                            <b>{{ props.option.phone_mobile }}</b>
                          </p>
                        </div>
                      </div>
                    </template>

                    <template #empty
                      >{{ $t('messages.no_results') }}
                      {{ createData.supplier }}</template
                    >
                  </b-autocomplete>
                </b-field>
              </div>
              <div class="column">
                <b-field :label="$t('table.unload_reason')">
                  <b-input
                    v-model="createData.reason"
                    :placeholder="
                      $t('messages.placeholder', {
                        name: `${$t('table.unload_reason')}`,
                      })
                    "
                    name="reason"
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
export default {
  name: 'UnlModalCreate',

  data() {
    return {
      isActive: false,
      isLoading: false,
      createData: {
        code: null,
        date: new Date(),
        customer: null,
        location: null,
      },
      supplierData: [],
      supplierID: null,
      loadingSupplier: false,
      openFocusSupplier: false,
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
  computed: {
    locales() {
      if (this.$i18n.locale === 'en') {
        return 'en-US'
      }
      if (this.$i18n.locale === 'it') {
        return 'it-IT'
      }
      if (this.$i18n.locale === 'sq') {
        return 'sq-Al'
      }
    },
    warehouseID() {
      return this.$store.state.companies.company_id
    },
  },
  mounted() {
    this.getLastCode()
  },
  methods: {
    async getLastCode() {
      await this.$axios
        .get('/unloads/lastCode', {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          const datas = resp.data
          const code = this.incrementString(datas)
          this.createData.code = code
        })
    },
    incrementString(string) {
      // Extract string's number
      var number = string.match(/\d+/) === null ? 0 : string.match(/\d+/)[0]

      // Store number's length
      var numberLength = number.length

      // Increment number by 1
      number = (parseInt(number) + 1).toString()

      // If there were leading 0s, add them again
      while (number.length < numberLength) {
        number = '0' + number
      }

      return string.replace(/[0-9]/g, '').concat(number)
    },

    onSelectSupplier(val) {
      this.supplierID = val
    },

    async onFocusSupplier() {
      this.loadingSupplier = true
      await this.$axios
        .get('/customers', {
          params: {
            _limit: -1,
          },
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.loadingSupplier = false
          this.supplierData = res.data
        })
    },
    filteredSupplier(val) {
      let filtered = this.supplierData.filter((name) => {
        return (
          name.name.toString().toLowerCase().indexOf(val.toLowerCase()) >= 0
        )
      })

      if (val === '') {
        this.onFocusSupplier()
      }
      this.supplierData = filtered
      return this.supplierData
    },

    cancel() {
      this.$emit('cancel')
    },
    async onCreate() {
      this.isLoading = true
      const payload = {
        code: this.createData.code,
        date: this.createData.date,
        customer: this.supplierID.id,
        warehouse: this.warehouseID,
        reason: this.createData.reason,
        created_by: this.$auth.user.id,
      }

      await this.$axios
        .post(`/unloads`, payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          const id = resp.data.id
          this.$router.push(this.localePath(`/unloads/${id}`))
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