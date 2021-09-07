<template>
  <div id="app">
    <nav-bar @open-help="helpModal = true" />
    <aside-menu
      :menu="menu"
      @menu-click="menuClick"
      @main-drawer="isActiveDrawer = true"
    />
    <nuxt class="bg-colors" />
    <footer-bar />
    <main-drawer
      :isActiveDrawer="isActiveDrawer"
      @cancel="isActiveDrawer = false"
    />
    <help-modal :isActiveDrawer="helpModal" @cancel="helpModal = false" />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'
import MainDrawer from '~/components/Content/MainDrawer.vue'
import HelpModal from '~/components/Modals/Help/HelpModal.vue'

export default {
  name: 'App',
  middleware: 'auth',
  components: {
    FooterBar,
    AsideMenu,
    NavBar,
    MainDrawer,
    HelpModal,
  },
  computed: {
    menu() {
      return [
        'General',
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: `${this.$t('nav.dashboard')}`,
          },
          {
            to: '/warehouses',
            icon: 'home-city',
            label: `${this.$t('nav.warehouses')}`,
          },
          {
            to: '/suppliers',
            icon: 'account-multiple',
            label: `${this.$t('nav.suppliers')}`,
          },
          {
            to: '/customers',
            icon: 'account-multiple',
            label: `${this.$t('nav.customers')}`,
          },
          {
            to: '/users',
            icon: 'account',
            label: `${this.$t('nav.users')}`,
          },
        ],
        `${this.$t('nav.accounting')}`,
        [
          // {
          //   label: `${this.$t('nav.invoices')}`,
          //   icon: 'cart',
          //   menu: [
          //     {
          //       to: `/purchases`,
          //       label: `${this.$t('nav.purchases')}`,
          //       icon: 'cart-plus',
          //     },
          //     {
          //       to: '/sales',
          //       label: `${this.$t('nav.sales')}`,
          //       icon: 'cart-minus',
          //     },
          //   ],
          // },
          {
            to: `/purchases`,
            label: `${this.$t('nav.purchases')}`,
            icon: 'cart-plus',
          },
          {
            to: '/sales',
            label: `${this.$t('nav.sales')}`,
            icon: 'cart-minus',
          },
          {
            to: '/payments',
            label: `${this.$t('nav.cash-unit')}`,
            icon: 'bank',
          },
          {
            to: '/cashiers',
            label: `${this.$t('nav.banks')}`,
            icon: 'piggy-bank',
          },
          {
            to: '/currencies',
            label: `${this.$t('nav.currencies')}`,
            icon: 'currency-eur',
          },
        ],
        `${this.$t('nav.catalog')}`,
        [
          {
            to: '/products',
            label: `${this.$t('nav.products')}`,
            icon: 'archive',
          },
          {
            to: '/categories',
            label: `${this.$t('nav.categories')}`,
            icon: 'menu',
          },
          {
            to: '/vat-rates',
            label: `${this.$t('nav.vat-rates')}`,
            icon: 'file-percent',
          },
          {
            to: '/unit-measures',
            label: `${this.$t('nav.unit_measures')}`,
            icon: 'weight-kilogram',
          },
        ],
        `${this.$t('nav.warehouse')}`,
        [
          {
            to: `/warehouses/${this.$store.state.companies.company_id}`,
            label: `${this.$t('nav.warehouse')}`,
            icon: 'home-city',
          },
        ],

        'Settings',
        [
          {
            to: '/settings',
            label: `${this.$t('nav.settings')}`,
            icon: 'settings',
          },
          {
            to: '/help',
            label: 'Help',
            icon: 'help-circle',
          },
        ],
      ]
    },
  },
  data() {
    return {
      darkMode: false,
      isActiveDrawer: false,
      helpModal: false,
    }
  },
  watch: {
    $route() {
      const user = this.$auth.user
      const roles = []
      roles.push(user.role.name)
      if (user) {
        this.$gates.setRoles(roles)
        // this.$store.commit('user', user)
      }
    },
  },
  created() {
    if (process.browser) {
      const user = this.$auth.user
      const roles = []
      roles.push(user.role.name)
      if (user) {
        this.$gates.setRoles(roles)
        // this.$store.commit('user', user)
      }
    }
  },
  mounted() {
    document.documentElement.classList.add('has-aside-left')
    document.documentElement.classList.add('has-aside-mobile-transition')
    document.documentElement.classList.add('has-aside-desktop-transition')
    document.documentElement.classList.add('has-navbar-fixed-top')
    document.documentElement.classList.add('has-aside-expanded')
  },
  methods: {
    menuClick(item) {
      if (item.action && item.action === 'dark-mode-toggle') {
        this.$store.commit('darkModeToggle')
      }
    },
  },
}
</script>
