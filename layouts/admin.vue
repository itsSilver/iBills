<template>
  <div id="app">
    <nav-bar-admin @open-help="helpModal = true" />
    <aside-menu
      :menu="menu"
      @menu-click="menuClick"
      @main-drawer="isActiveDrawer = true"
    />
    <nuxt />
    <footer-bar />
  </div>
</template>

<script>
// @ is an alias to /src
import FooterBar from '~/components/FooterBar.vue'
import AsideMenu from '@/components/AsideMenu'
import NavBarAdmin from '~/components/NavBarAdmin.vue'

export default {
  name: 'Admin',
  components: {
    FooterBar,
    AsideMenu,
    NavBarAdmin,
  },
  middleware: 'auth',
  data() {
    return {
      darkMode: false,
      isActiveDrawer: false,
    }
  },
  computed: {
    menu() {
      return [
        'General',
        [
          {
            to: '/admin/users',
            icon: 'account',
            label: `Users`,
          },
          {
            to: '/admin/leads',
            icon: 'home-city',
            label: `Leads`,
          },
        ],
      ]
    },
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
