<template>
  <div class="px-4 py-4">
    <form @submit.prevent>
      <SearchProductLoad class="mb-4" />
      <div class="columns">
        <div class="column" v-if="loadProducts.length !== 0">
          <loads-product-list
            :loadProducts="loadProducts"
            @delete-single-load="deleteLoad"
            @create-load="createLoad"
            :isLoaded="isLoaded"
          />
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
import SearchProductLoad from '@/components/Content/Loads/SearchProductLoad.vue'
import LoadsProductList from './LoadsProductList.vue'
export default {
  components: { SearchProductLoad, LoadsProductList },
  name: 'LoadsCreate',
  data() {
    return {
      isLoaded: false,
    }
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

  methods: {
    async submit() {},

    //get load details

    async getLoadDetails() {
      await this.$axios
        .get(`/loaddetails`, {
          params: {
            load: this.$route.params.id,
          },
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const loadDetails = res.data
          this.$store.commit('products/SET_PROD_LOAD', loadDetails)
        })
        .catch((err) => {
          console.log('err get loads', err.data)
        })
    },

    // create load
    async createLoad(val) {
      this.isLoaded = true
      const payload = {
        qty: val.qty,
        price: val.price,
        tax: val.tax,
        total: val.total,
        expiration: val.expiration,
        discount: val.discount,
        product: val.product.id,
        cost_tolerance: val.product.cost_tolerance,
        min_qty: val.product.min_qty,
        max_qty: val.product.max_qty,
        warehouse: this.warehouseID,
        load: this.$route.params.id,
      }
      await this.$axios
        .post('/loaddetails', payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.getLoadDetails().then(() => {
            this.isLoaded = false
          })
        })
        .catch((err) => {
          this.isLoaded = false
          if (err.response.status === 400) {
            this.$buefy.dialog.confirm({
              title: `${this.$t('messages.error')}`,
              message: `${this.$t('messages.error-price')}`,
              confirmText: `OK`,
              type: 'is-danger',
              hasIcon: true,
            })
          }
          if (err.response.status === 415) {
            this.$buefy.dialog.confirm({
              title: `${this.$t('messages.error')}`,
              message: `${this.$t('messages.error-max_qty')}`,
              confirmText: `OK`,
              type: 'is-danger',
              hasIcon: true,
            })
          }
          if (err.response.status === 416) {
            const minqty = err.response.data.min_qty
            console.log('🚀 ~ createLoad ~ minqty', minqty)
            this.$buefy.dialog.confirm({
              title: `${this.$t('messages.error')}`,
              message: `${this.$t('messages.error-min_qty', { qty: minqty })}`,
              confirmText: `OK`,
              type: 'is-danger',
              hasIcon: true,
            })
          }
        })
    },
    //delete load
    async deleteLoad(id) {
      await this.$axios
        .delete(`/loaddetails/${id}`, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.getLoadDetails().then(() => {
            this.isLoaded = false
          })
        })
        .catch((err) => {
          this.isLoaded = false
          console.log('err create', err.data)
        })
    },
  },
  props: ['load'],
}
</script>

<style>
</style>