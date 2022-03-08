<template></template>

<script>
export default {
  data() {
    return {
      socket: '',
    }
  },
  mounted() {
    this.$auth.strategy.token.set(null)
    this.$auth.setUser(null)
    if (process.browser) {
      window.$nuxt.$cookies.remove('auth._token.local')
      localStorage.setItem('auth._token.local', false)
    }
    this.$auth.logout()
    this.$router.push('/')
  },
}
</script>
