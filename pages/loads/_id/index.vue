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
                <loads-create @form-data="onFormData" :load="load" />
              </b-tab-item>
              <b-tab-item :label="$t('table.transport')" icon="truck-delivery">
                <loads-transport
                  @data-transport="onDataTransport"
                  :load="load"
                  @shipping-total="onShippingTotal"
                />
              </b-tab-item>
              <b-tab-item :label="$t('table.info')" icon="note">
                <loads-info @data-info="onDataInfo" :load="load" />
              </b-tab-item>
            </b-tabs>
          </card-component>
        </div>
        <div class="column is-12-tablet is-3-widescreen">
          <card-component
            class="has-table has-mobile-sort-spaced"
            :title="$t('table.details')"
          >
            <loads-details :load="load" :transport="totalShipping" />
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
import LoadsCreate from '~/components/Content/Loads/LoadsCreate.vue'
import LoadsTransport from '~/components/Content/Loads/LoadsTransport.vue'
import LoadsInfo from '~/components/Content/Loads/LoadsInfo.vue'
import LoadsDetails from '~/components/Content/Loads/LoadsDetails.vue'
export default {
  name: 'LoadsId',
  head() {
    return {
      title: `${this.load.code} — ${this.$t('messages.title')}`,
    }
  },
  components: {
    HeroBar,
    CardComponent,
    ProductActionsCreate,
    LoadsCreate,
    LoadsTransport,
    LoadsInfo,
    LoadsDetails,
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
        this.$store.commit('loads/UPDATE_GRAND_TOTAL', 0)
        return
      }
      let sum = val.reduce(function (a, b) {
        // function(previousValue, currentValue)
        return {
          total: a.total + b.total,
        }
      })
      this.$store.commit('loads/UPDATE_GRAND_TOTAL', sum)
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
        shipping_cost: this.dataTransport.shipping_cost,
        shipping_tax: this.dataTransport.shipping_tax,
        reason: this.dataInfo.reason,
        note: this.dataInfo.note,
        total: this.grandTotal,
      }
      await this.$axios
        .put(`/loads/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const load = res.data
          this.$store.commit('loads/SET_LOAD', load)
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
      return this.$store.state.loads.load
    },
    loadProducts() {
      return this.$store.state.products.loadProducts
    },
    grandTotal() {
      return this.$store.state.loads.grandTotal
    },
  },
  async asyncData({ $axios, params, $auth, store }) {
    let response = await $axios.get(`/loads/${params.id}`, {
      headers: {
        Authorization: `Bearer ${$auth.strategy.token.get()}`,
        'Content-Type': 'application/json',
      },
    })
    let load = response.data
    let response2 = await $axios.get(`/loaddetails`, {
      params: {
        load: params.id,
      },
      headers: {
        Authorization: `Bearer ${$auth.strategy.token.get()}`,
        'Content-Type': 'application/json',
      },
    })
    let loadDetails = response2.data
    store.commit('products/SET_PROD_LOAD', loadDetails)
    store.commit('loads/SET_LOAD', load)
  },
}
</script>

<style>
</style>