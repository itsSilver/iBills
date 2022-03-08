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
  user: {},
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
  SET_USER(state, user) {
    state.user = user
  },
}
const getters = {
  getUser(state) {
    return state.user
  },
}
const actions = {
  async onAuthStateChangedAction(state, { authUser, claims }) {
    if (!authUser) {
      // claims = null
      state.commit('SET_USER', null)
      this.$router.push({ path: '/login' })
      // Perform logout operations
    } else {
      // Do something with the authUser and the claims object...
      const { uid, email } = authUser
      state.commit('SET_USER', {
        uid,
        email,
      })
    }
  },
}
const strict = false
export default {
  strict,
  state,
  getters,
  mutations,
  actions,
}
