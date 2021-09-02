<template>
  <b-autocomplete
    :data="data"
    :placeholder="`${$t('help.list.search')} ...`"
    ref="searchproduct"
    v-model="name"
    :loading="isFetching"
    @typing="getAsyncData"
    @select="onSelect"
    icon="magnify"
  >
    <template slot-scope="props">
      <div class="media">
        <div class="media-content">
          <b>{{ props.option.name }}</b>
          <br />
          <small>
            {{ $t('table.category') }}: <b>{{ props.option.category }}</b>
          </small>
        </div>
      </div>
    </template>
    <template #empty>{{ $t('messages.no_results') }} {{ name }}</template>
  </b-autocomplete>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'SearchProductSale',
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false,
      name: '',
    }
  },
  computed: {
    warehouseID() {
      return this.$store.state.companies.company_id
    },
  },
  methods: {
    getAsyncData: debounce(function (name) {
      if (!name.length) {
        this.data = []
        return
      }
      this.isFetching = true
      this.$axios
        .get(
          `/products/lowData?_where[_or][0][name_contains]=${name}&_where[_or][1][barcode_contains]=${name}`,
          {
            params: {
              _limit: -1,
              // warehouse: this.warehouseID,
            },
            headers: {
              Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(({ data }) => {
          this.data = data
        })
        .catch((error) => {
          this.data = []
          throw error
        })
        .finally(() => {
          this.isFetching = false
          if (this.data.length === 1) {
            const firstOne = this.data[0]
            this.name = firstOne.name
            // this.$refs.searchproduct
            const toHide = this.$refs.searchproduct.$el.childNodes[1]
            toHide.style.display = 'none'
            this.getStock(firstOne)
          }
        })
    }, 500),

    async onSelect(val) {
      this.getStock(val)
    },
    async getStock(val) {
      await this.$axios
        .get('/stocks', {
          params: {
            product: val.id,
            warehouse: this.warehouseID,
          },
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const datas = res.data.data
          if (datas.length !== 0) {
            const qty = datas[0].qty
            val.qty = qty
            this.$store.commit('products/SET_LOAD_PRODUCTS', val)
          } else {
            this.$buefy.dialog.confirm({
              title: `${this.$t('messages.no_stock')}`,
              message: `${this.$t('messages.no_stock_body')}`,
              cancelText: `${this.$t('navtop.cancel')}`,
              confirmText: `${this.$t('navtop.create')}`,
              type: 'is-success',
              onConfirm: () =>
                this.$store.commit('products/SET_LOAD_PRODUCTS', val),
            })
          }
        })
    },
  },
  // computed: {
  //   warehouseID() {
  //     return this.$store.state.companies.company_id
  //   },
  // },
}
</script>