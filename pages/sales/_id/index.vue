<template>
  <div>
    <hero-bar>
      {{ load.code }}

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
                <sales-edit @form-data="onFormData" :load="load" />
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
            <sales-details :load="load" :transport="totalShipping" />
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
import SalesInfo from '~/components/Content/Sales/SalesInfo.vue'
import SalesDetails from '~/components/Content/Sales/SalesDetails.vue'
import SalesEdit from '~/components/Content/Sales/SalesEdit.vue'
export default {
  name: 'SalesId',
  head() {
    return {
      title: `${this.load.code} — ${this.$t('messages.title')}`,
    }
  },
  components: {
    HeroBar,
    CardComponent,
    ProductActionsCreate,
    SalesInfo,
    SalesDetails,
    SalesEdit,
  },
  watch: {
    loadProducts: {
      immediate: true,
      handler(val) {
        this.calcGrandTotal(val)
      },
    },
  },
  data() {
    return {
      formLoads: {},
      activeTab: 0,
      dataInfo: {},
      dataTransport: {},
      totalShipping: 0,
    }
  },
  methods: {
    calcGrandTotal(val) {
      if (val.length === 0) {
        this.$store.commit('sales/UPDATE_GRAND_TOTAL', 0)
        return
      }
      let sum = val.reduce(function (a, b) {
        return {
          total: a.total + b.total,
        }
      })
      this.$store.commit('sales/UPDATE_GRAND_TOTAL', sum)

      let tax = val.reduce(function (a, b) {
        return {
          total_tax: a.total_vat + b.total_vat,
        }
      })
      this.$store.commit('sales/UPDATE_GRAND_TAX', tax)

      let notax = val.reduce(function (a, b) {
        return {
          total_notax: a.total_novat + b.total_novat,
        }
      })
      this.$store.commit('sales/UPDATE_GRAND_NOTAX', notax)
    },
    onShippingTotal(val) {
      this.totalShipping = val
    },
    onFormData(val) {
      this.formLoads = val
    },
    onDataTransport(val) {
      this.dataTransport = val
    },
    onDataInfo(val) {
      this.dataInfo = val
    },
    async saveLoad() {
      const id = this.$route.params.id
      const payload = {
        reference: this.dataInfo.reference,
        note: this.dataInfo.note,
        // products: this.loadProducts,
        // total: this.grandTotal,
        status: this.formLoads.status,
      }
      await this.$axios
        .put(`/sales/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.$buefy.snackbar.open({
            message: `${this.$t('messages.saved', {
              name: res.data.code,
            })}`,
            queue: false,
          })
        })
        .catch((err) => {
          console.log('err', err.data)
        })
    },
  },
  beforeDestroy() {
    this.$store.commit('products/CLEAR_PRODUCTS')
  },
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
  },
  async asyncData({ $axios, params, $auth, store }) {
    let response = await $axios.get(`/sales/${params.id}`, {
      headers: {
        Authorization: `Bearer ${$auth.strategy.token.get()}`,
        'Content-Type': 'application/json',
      },
    })
    let load = response.data
    let loadDetails = load.products

    store.commit('products/SET_PROD_LOAD', loadDetails)
    store.commit('sales/SET_LOAD', load)
  },
}
</script>