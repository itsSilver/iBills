const state = () => ({
  alarms: [],
})

const mutations = {
  SET_ALARMS(state, payload) {
    state.alarms = payload
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
