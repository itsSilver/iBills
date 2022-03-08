<template>
  <div id="app">
    <nav-bar @open-help="helpModal = true" />
    <nuxt />
    <footer-bar />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import FooterBar from '~/components/FooterBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    FooterBar,
  },
  middleware: 'auth',
  data() {
    return {
      darkMode: false,
      isActiveDrawer: false,
    }
  },

  mounted() {
    document.documentElement.classList.add('has-aside-left')
    document.documentElement.classList.add('has-aside-mobile-transition')
    document.documentElement.classList.add('has-navbar-fixed-top')
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
