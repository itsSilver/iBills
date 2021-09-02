const state = () => ({
  companies: [],
  newCompany: false,
  company_id: null,
})

const mutations = {
  SET_COMPANIES(state, payload) {
    state.companies = payload
  },
  SET_COMPANY_ID(state, payload) {
    state.company_id = payload.company_id
  },
}
const getters = {}
const actions = {
  async getCompanies({ commit }, state) {
    await this.$axios
      .get(`/warehouses`, {
        headers: {
          Authorization: `Bearer ${state}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const data = response.data
        commit('SET_COMPANIES', data)
      })
  },
  async addCompany({ commit }, state) {
    await this.$axios
      .post('/warehouses', state, {
        headers: {
          Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
          'Content-Type': 'application/json',
        },
      })
      .then((r) => console.log('resp warehouses', r.data))
      .catch((err) => {
        console.log('error', err)
      })
  },
  async saveCompanyId({ commit }, payload) {
    console.log('payload', payload)
    const company_id = {
      company_id: payload,
    }
    await this.$axios
      .put('/settings', company_id, {
        headers: {
          Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const data = response.data
        commit('SET_COMPANY_ID', data)
      })
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
