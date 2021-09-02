<template>
  <div>
    <hero-bar>
      {{ $t('sales.create') }}

      <div slot="right" class="navtop-has-buttons">
        <button
          class="button is-primary is-small"
          type="button"
          @click="saveLoad"
        >
          <b-icon icon="plus-thick" />
          <span> {{ $t('navtop.save') }} </span>
        </button>
        <button class="button is-blue is-small" type="button" @click="saveLoad">
          <b-icon icon="file-pdf" />
          <span> {{ $t('navtop.print') }} </span>
        </button>
      </div>
    </hero-bar>
    <section class="section is-main-section is-fullheight">
      <div class="columns" style="flex-wrap: wrap">
        <div class="column is-12-tablet is-9-widescreen">
          <card-component class="has-table has-mobile-sort-spaced">
            <b-tabs v-model="activeTab">
              <b-tab-item :label="$t('table.products')" icon="archive">
                <sales-create
                  @data-sales="onFormData"
                  :load="load"
                  @customer-id="onCustomerId"
                  @update-products="onUpdateProducts"
                />
              </b-tab-item>

              <b-tab-item :label="$t('table.info')" icon="note">
                <sales-info @data-info="onDataInfo" :load="load" />
              </b-tab-item>
            </b-tabs>
          </card-component>
        </div>
        <div class="column is-12-tablet is-3-widescreen">
          <card-component
            class="has-table has-mobile-sort-spaced"
            :title="$t('table.details')"
          >
            <sales-details :load="formLoads" />
          </card-component>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import ProductActionsCreate from '~/components/Content/Products/ProductActionsCreate.vue'
import SalesCreate from '~/components/Content/Sales/SalesCreate.vue'
import SalesInfo from '~/components/Content/Sales/SalesInfo.vue'
import SalesDetails from '~/components/Content/Sales/SalesDetails.vue'
export default {
  name: 'SalesNew',
  head() {
    return {
      title: `${this.$t('sales.create')} — ${this.$t('messages.title')}`,
    }
  },
  components: {
    HeroBar,
    CardComponent,
    ProductActionsCreate,
    SalesCreate,
    SalesInfo,
    SalesDetails,
  },
  data() {
    return {
      formLoads: {},
      activeTab: 0,
      dataInfo: {},
      dataTransport: {},
      totalShipping: 0,
      customerId: null,
      products: null,
      isLoading: false,
    }
  },
  watch: {
    loadProducts: {
      immediate: true,
      handler(val) {
        this.calcGrandTotal(val)
      },
    },
  },
  methods: {
    onUpdateProducts(val) {
      this.products = val
    },
    calcGrandTotal(val) {
      if (val.length === 0) {
        this.$store.commit('sales/UPDATE_GRAND_TOTAL', 0)
        return
      }
      let sum = val.reduce(function (a, b) {
        return a.total + b.total
      })
      this.$store.commit('sales/UPDATE_GRAND_TOTAL', sum)

      let tax = val.reduce(function (a, b) {
        // function(previousValue, currentValue)
        return a.total_vat + b.total_vat
      })
      this.$store.commit('sales/UPDATE_GRAND_TAX', tax)
    },
    onShippingTotal(val) {
      this.totalShipping = val
    },
    onFormData(val) {
      this.formLoads = val
    },

    onDataInfo(val) {
      this.dataInfo = val
    },
    onCustomerId(val) {
      this.customerId = val
    },
    async saveLoad() {
      this.isLoading = true
      const payload = {
        reference: this.dataInfo.reference,
        note: this.dataInfo.note,
        warehouse: this.warehouseID,
        customer: this.customerId,
        date: this.formLoads.date,
        code: this.formLoads.code,
        products: this.loadProducts,
        total: this.grandTotal,
        status: this.formLoads.status,
      }
      console.log('payload', payload)
      await this.$axios
        .post(`/sales`, payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.isLoading = false
          const load = res.data
          this.$store.commit('sales/SET_LOAD', load)
          this.$router.push(this.localePath(`/sales/${load.id}`))
        })
        .catch((err) => {
          this.isLoading = false
          console.log('err', err.data)
          this.$buefy.snackbar.open({
            message: `${this.$t('messages.error')}`,
            queue: false,
          })
        })
    },
  },
  // beforeDestroy() {
  //   this.$store.commit('products/CLEAR_PRODUCTS')
  // },
  computed: {
    load() {
      return this.$store.state.sales.load
    },
    loadProducts() {
      return this.$store.state.products.loadProducts
    },
    grandTotal() {
      return this.$store.state.sales.grandTotal
    },
    warehouseID() {
      return this.$store.state.companies.company_id
    },
  },
}
</script>

<style>
</style>