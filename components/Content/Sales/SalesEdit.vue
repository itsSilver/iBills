<template>
  <div class="px-4 py-4">
    <form @submit.prevent>
      <div class="columns">
        <div class="column">
          <b-field :label="$t('table.code')">
            <b-input
              v-model="prod.code"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.code')}`,
                })
              "
              name="code"
              disabled
              size="is-small"
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.date')">
            <b-input
              :value="filterDate(prod.date)"
              name="customer"
              disabled
              size="is-small"
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.customer')">
            <b-input
              v-model="prod.customer"
              name="customer"
              disabled
              size="is-small"
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.state')">
            <b-select v-model="prod.status" size="is-small" expanded>
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
      <search-product-sale class="mb-4" v-if="!disabled" />
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
import dayjs from 'dayjs'
import SearchProductSale from './SearchProductSale.vue'
import SalesProductList from './SalesProductList.vue'
export default {
  components: { SearchProductSale, SalesProductList },
  name: 'SalesEdit',
  props: ['load'],
  data() {
    return {
      isLoaded: false,
      prod: null,
      stateOptions: [
        { value: 'open', name: `${this.$t('invoices.state.open')}` },
        { value: 'inprogres', name: `${this.$t('invoices.state.progress')}` },
        { value: 'completed', name: `${this.$t('invoices.state.completed')}` },
        { value: 'canceled', name: `${this.$t('invoices.state.canceled')}` },
        { value: 'confirmed', name: `${this.$t('invoices.state.confirmed')}` },
      ],
    }
  },
  watch: {
    load: {
      immediate: true,
      handler(val) {
        this.prod = JSON.parse(JSON.stringify(val))
        this.prod.index = this.index
      },
    },
    prod: {
      deep: true,
      handler(val) {
        this.$emit('form-data', val)
      },
    },
  },
  computed: {
    loadProducts() {
      return this.$store.state.products.loadProducts
    },
    warehouseID() {
      return this.$store.state.companies.company_id
    },
    disabled() {
      let id = this.$route.params.id
      if (id) {
        return true
      } else {
        false
      }
    },
  },

  methods: {
    filterDate(val) {
      return dayjs(val).format(`${this.$config.dateFormat}`)
    },
  },
}
</script>

<style>
</style>