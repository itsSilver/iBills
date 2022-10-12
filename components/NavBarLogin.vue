<template>
  <nav
    v-show="isNavBarVisible"
    id="navbar-main-login"
    class="navbar is-fixed-top"
  >
    <div class="navbar-brand custom-logo-login" @click="$router.push('/')">
      Internal Blockchain
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import NavBarMenu from '@/components/NavBarMenu'

export default {
  name: 'NavBar',
  components: {
    NavBarMenu,
  },
  data() {
    return {
      isMenuNavBarActive: false,
      dark: false,
      showShortcut: true,
    }
  },
  computed: {
    menuNavBarToggleIcon() {
      return this.isMenuNavBarActive ? 'close' : 'dots-vertical'
    },
    menuToggleMobileIcon() {
      return this.isAsideMobileExpanded ? 'backburger' : 'forwardburger'
    },

    ...mapState([
      'isNavBarVisible',
      'isAsideMobileExpanded',
      'isAsideDescExpanded',
      'isDarkModeActive',
      ,
    ]),
  },

  methods: {
    menuToggleMobile() {
      this.$store.commit('asideMobileStateToggle')
    },
    menuNavBarToggle() {
      this.isMenuNavBarActive = !this.isMenuNavBarActive
    },
  },
}
</script>
<style scoped></style>
