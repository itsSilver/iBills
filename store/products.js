const state = () => ({
  products: [],
  loadProducts: [],
  product: false,
  totalGrand: 0,
  totalTax: 0,
  totalNoTax: 0,
  cloneItems: [],
})

const mutations = {
  SET_PRODUCTS(state, payload) {
    state.products = payload
  },
  UPDATE_PRODUCT(state, payload) {
    // let indexID = state.loadProducts.findIndex((item) => {
    //   return payload.product.id === item.product.id
    // })
    // console.log('index', indexID)
    // let newArray = state.loadProducts.splice(indexID, 1, payload)
    // console.log('🚀 ~ UPDATE_PRODUCT ~ newArray', newArray)

    state.loadProducts[payload.index] = JSON.parse(JSON.stringify(payload))
    // console.log('🚀 ~ UPDATE_PRODUCT ~ state.loadProducts', state.loadProducts)

    // let indexID = state.cloneItems.findIndex((item) => {
    //   return payload.index === item.index
    // })
    // state.cloneItems.splice(indexID, 1, { dada: 'dadada' })
    // console.log('index', state.cloneItems)

    // let taxxx = state.cloneItems.reduce((a, b) => {
    //   return a + parseFloat(b.total_vat)
    // }, 0)
    // this.totalTax = taxxx
    // console.log('🚀 ~ CaclAll ~ this.totalTax', this.totalTax)

    // let notax = state.cloneItems.reduce((a, b) => {
    //   return a + parseFloat(b.total_novat)
    // }, 0)
    // this.totalNoTax = notax
    // console.log('🚀 ~ CaclAll ~ this.totalNoTax ', this.totalNoTax)

    // let sum = state.cloneItems.reduce((a, b) => {
    //   return a + parseFloat(b.total)
    // }, 0)
    // this.totalGrand = sum
    // console.log('🚀 ~ CaclAll ~ this.totalGrand', this.totalGrand)
  },

  SET_LOAD_PRODUCTS(state, payload) {
    // let products = state.loadProducts.findIndex(
    //   (obj) => obj.product.id == payload.id
    // )
    // console.log('products', products)
    // if (products !== -1) {
    //   console.log('saas', state.loadProducts[products])
    //   state.loadProducts[products].qty++
    //   console.log('all', state.loadProducts)
    // } else {
    //   state.loadProducts.push({
    //     product: payload,
    //     discount: 0,
    //     qty: 0,
    //     total: 0,
    //   })
    // }

    state.loadProducts.push({
      product: payload,
      discount: 0,
      qty: 1,
      total: 0,
      total_vat: 0,
      total_novat: 0,
      availableQty: payload.qty,
    })
    state.cloneItems = state.loadProducts
  },
  SET_PROD_LOAD(state, payload) {
    state.loadProducts = payload
  },

  REMOVE_PRODUCT(state, payload) {
    state.loadProducts.splice(payload, 1)
  },
  CLEAR_PRODUCTS(state) {
    state.loadProducts = []
  },
}

const getters = {
  // getLoadProducts: (state) => state.loadProducts,
  // gettotalGrand: (state) => state.totalGrand,
}
const actions = {
  // async CaclAll({ state }) {
  //   let taxxx = state.cloneItems.reduce((a, b) => {
  //     return a + parseFloat(b.total_vat)
  //   }, 0)
  //   this.totalTax = taxxx
  //   console.log('🚀 ~ CaclAll ~ this.totalTax', this.totalTax)

  //   let notax = state.cloneItems.reduce((a, b) => {
  //     return a + parseFloat(b.total_novat)
  //   }, 0)
  //   this.totalNoTax = notax
  //   console.log('🚀 ~ CaclAll ~ this.totalNoTax ', this.totalNoTax)

  //   let sum = state.cloneItems.reduce((a, b) => {
  //     return a + parseFloat(b.total)
  //   }, 0)
  //   this.totalGrand = sum
  //   console.log('🚀 ~ CaclAll ~ this.totalGrand', this.totalGrand)
  // },
  async getProducts({ commit }, state) {
    await this.$axios
      .get(`/products`, {
        headers: {
          Authorization: `Bearer ${state}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const data = response.data
        commit('SET_PRODUCTS', data)
      })
  },
  async getProduct({ commit }, state) {
    await this.$axios
      .get(`/products/${state.id}`, {
        headers: {
          Authorization: `Bearer ${state}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const data = response.data
        commit('SET_PRODUCTS', data)
      })
  },
  async addProduct({ commit }, state) {
    await this.$axios
      .post('/products', state, {
        headers: {
          Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
          'Content-Type': 'application/json',
        },
      })
      .then((r) => console.log('resp product', r.data))
      .catch((err) => {
        console.log('error', err)
      })
  },
}
export default {
  state,
  getters,
  mutations,
  actions,
}
