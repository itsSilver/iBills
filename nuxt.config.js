export default {
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Department Blockchain',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  target: 'static',
  /*
   ** Customize the progress-bar color
   */
  // loading: { color: '#ff3860' },
  loading: { color: '#00d1b2' },
  /*
   ** Global CSS
   */
  css: ['./assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/after-each.js', mode: 'client' },
    { src: '~/plugins/vue-tradingjs.client.js', mode: 'client' },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    ['nuxt-buefy', { materialDesignIcons: false }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxtjs-mdi-font',
    '@nuxtjs/auth-next',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'it',
            name: 'It',
            file: 'it.json',
          },
          {
            code: 'en',
            name: 'En',
            file: 'en.json',
          },
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'en',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
          alwaysRedirect: true,
          fallbackLocale: 'en',
        },
        vuex: {
          moduleName: 'i18n',
          syncLocale: true,
          syncMessages: true,
          syncRouteParams: true,
        },
      },
    ],
  ],
  router: {
    linkActiveClass: 'active',
    base: '/',
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'https://api.department-blockchain.net',
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'jwt',
          required: true,
          type: 'Bearer',
        },
        user: {
          property: '',
          autoFetch: true,
        },
        endpoints: {
          login: { url: '/auth/local', method: 'post' },
          logout: false,
          user: { url: '/users/me', method: 'get' },
        },
        redirect: false,
        watchLoggedIn: true,
      },
    },
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  publicRuntimeConfig: {
    baseURL: 'https://api.department-blockchain.net',
    // dateFormat: 'DD/MM/YYYY',
    dateFormat: 'MM/DD/YYYY',
  },
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (!config.externals) {
        config.externals = {}
      }
    },
  },
  server: {
    port: 2650
  }
}
