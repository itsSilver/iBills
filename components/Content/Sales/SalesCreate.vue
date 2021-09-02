<template>
  <div class="px-4 py-4">
    <form @submit.prevent>
      <div class="columns">
        <div class="column">
          <b-field :label="$t('table.code')">
            <b-input
              v-model="sales.code"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.code')}`,
                })
              "
              name="code"
              size="is-small"
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.date')">
            <client-only>
              <b-datepicker
                v-model="sales.date"
                :locale="locales"
                size="is-small"
                :min-date="new Date()"
                editable
              >
              </b-datepicker>
            </client-only>
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.customer')">
            <b-autocomplete
              size="is-small"
              v-model="sales.customer"
              open-on-focus
              ref="autocompleteSupplier"
              :loading="loadingSupplier"
              :data="supplierData"
              @typing="filteredSupplier"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.customer')}`,
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
                >{{ $t('messages.no_results') }} {{ sales.customer }}</template
              >
            </b-autocomplete>
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.state')">
            <b-select v-model="sales.status" size="is-small" expanded>
              <option
                v-for="option in stateOptions"
                :value="option.value"
                :key="option.value"
              >
                {{ option.name }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>
      <search-product-sale class="mb-4" />
      <div class="columns">
        <div class="column" v-if="loadProducts.length !== 0">
          <sales-product-list :isLoaded="isLoaded" />
        </div>
        <div class="column" v-else>
          <h4 class="add-products">
            {{ $t('messages.search-product') }}
          </h4>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import SearchProductSale from './SearchProductSale.vue'
import SalesProductList from './SalesProductList.vue'
export default {
  components: { SearchProductSale, SalesProductList },
  name: 'SalesCreate',
  data() {
    return {
      sales: {
        customer: null,
        location: null,
        date: new Date(),
        code: null,
        status: 'open',
      },
      stateOptions: [
        { value: 'open', name: `${this.$t('invoices.state.open')}` },
        { value: 'inprogres', name: `${this.$t('invoices.state.progress')}` },
        { value: 'completed', name: `${this.$t('invoices.state.completed')}` },
        { value: 'canceled', name: `${this.$t('invoices.state.canceled')}` },
        { value: 'confirmed', name: `${this.$t('invoices.state.confirmed')}` },
      ],
      isLoaded: false,
      supplierData: [],
      supplierID: null,
      loadingSupplier: false,
      openFocusSupplier: false,
      LocationData: [],
      LocationID: null,
      loadingLocation: false,
      openFocusLocation: false,
    }
  },
  watch: {
    sales: {
      deep: true,
      handler(val) {
        this.$emit('data-sales', val)
      },
    },
    supplierID(val) {
      this.$emit('customer-id', val)
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
    loadProducts() {
      return this.$store.state.products.loadProducts
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
        .get('/sales/getCode', {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          const datas = resp.data
          const code = this.incrementString(datas)
          this.sales.code = code
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
    async submit() {},

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
  },
}
</script>

<style>
</style>