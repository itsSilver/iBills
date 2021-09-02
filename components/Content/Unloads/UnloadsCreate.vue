<template>
  <div class="px-4 py-4">
    <form @submit.prevent>
      <SearchProductUnload class="mb-4" />
      <div class="columns">
        <div class="column" v-if="loadProducts.length !== 0">
          <unloads-product-list
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
import SearchProductUnload from './SearchProductUnload.vue'
import UnloadsProductList from './UnloadsProductList.vue'
export default {
  components: { SearchProductUnload, UnloadsProductList },
  name: 'UnloadsCreate',
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
        .get(`/unloaddetails`, {
          params: {
            unload: this.$route.params.id,
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
        unload: this.$route.params.id,
        warehouse: this.warehouseID,
      }
      await this.$axios
        .post('/unloaddetails', payload, {
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
          if (err.response.status === 416) {
            const total = err.response.data.current_qty
            console.log('🚀 ~ createLoad ~ total', total)
            this.$buefy.dialog.confirm({
              title: `${this.$t('messages.error')}`,
              message: `${this.$t('messages.error-no_stock', { qty: total })}`,
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
        .delete(`/unloaddetails/${id}`, {
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