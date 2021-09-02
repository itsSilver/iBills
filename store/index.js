const state = () => ({
  /* NavBar */
  isNavBarVisible: true,

  /* FooterBar */
  isFooterBarVisible: true,

  /* Aside */
  isAsideVisible: true,
  isAsideMobileExpanded: false,
  isAsideDescExpanded: true,

  /* Dark mode */
  isDarkModeActive: false,
  // Company Id
  company_id: null,
  currency: null,
})

const mutations = {
  /* A fit-them-all commit */
  basic(state, payload) {
    state[payload.key] = payload.value
  },

  user(state, user) {
    state.auth.user = user
  },

  /* Aside Mobile */
  asideMobileStateToggle(state, payload = null) {
    const htmlClassName = 'has-aside-mobile-expanded'

    let isShow

    if (payload !== null) {
      isShow = payload
    } else {
      isShow = !state.isAsideMobileExpanded
    }

    if (isShow) {
      document.documentElement.classList.add(htmlClassName)
    } else {
      document.documentElement.classList.remove(htmlClassName)
    }

    state.isAsideMobileExpanded = isShow
  },
  /* Aside Desc */
  asideDescStateToggle(state, payload = null) {
    const htmlClassName1 = 'has-aside-left'
    const htmlClassName2 = 'has-aside-expanded'

    let isShow

    if (payload !== null) {
      isShow = payload
    } else {
      isShow = !state.isAsideDescExpanded
    }

    if (isShow) {
      document.documentElement.classList.add(htmlClassName1)
      document.documentElement.classList.add(htmlClassName2)
    } else {
      document.documentElement.classList.remove(htmlClassName1)
      document.documentElement.classList.remove(htmlClassName2)
    }

    state.isAsideDescExpanded = isShow
  },

  SET_COMPANY_ID(state, payload) {
    state.company_id = payload
  },
  SET_CURRENCY(state, payload) {
    state.currency = payload
  },
}
const getters = {}
const actions = {}
export default {
  state,
  getters,
  mutations,
  actions,
}
