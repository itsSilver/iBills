const state = () => ({
  loads: [],
  load: [],
  transportTotal: 0,
  grandTotal: 0,
})

const mutations = {
  SET_PRODUCTS(state, payload) {
    state.loads = payload
  },
  SET_LOAD(state, payload) {
    state.load = payload
  },
  UPDATE_GRAND_TOTAL(state, payload) {
    state.grandTotal = payload.total
  },
}
const getters = {}
const actions = {
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
}
export default {
  state,
  getters,
  mutations,
  actions,
}
