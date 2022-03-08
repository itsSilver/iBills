<template>
  <div id="login">
    <nav-bar-login />
    <nuxt />
  </div>
</template>

<script>
import NavBarLogin from '@/components/NavBarLogin'
export default {
  name: 'Login',
  components: {
    NavBarLogin,
  },
  mounted() {
    document.documentElement.classList.remove('has-aside-left')
    document.documentElement.classList.remove('has-aside-mobile-transition')
    document.documentElement.classList.remove('has-navbar-fixed-top')
    document.documentElement.classList.remove('has-aside-expanded')
  },
}
</script>
