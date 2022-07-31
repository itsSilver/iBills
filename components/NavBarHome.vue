<template>
  <nav
    v-show="isNavBarVisible"
    id="navbar-main-2"
    class="navbar is-fixed-top nav-space"
    style="background-color: #0d6fda"
  >
    <div class="navbar-brand custom-logo" @click="$router.push('/')">
      Coinbase Remote
    </div>
    <div class="menu-list is-hidden-mobile">
      <a href="#home">Home</a>
      <a href="#features">Portfolio</a>
      <a href="#contact">Contact</a>
    </div>
    <!-- <div class="navbar-brand is-right">
      <a
        class="navbar-item navbar-item-menu-toggle is-hidden-desktop"
        @click.prevent="menuNavBarToggle"
      >
        <b-icon
          :icon="menuNavBarToggleIcon"
          custom-size="default"
          type="is-custom"
        />
      </a>
    </div> -->
    <div
      class="navbar-menu fadeIn animated faster"
      :class="{ 'is-active': isMenuNavBarActive }"
    >
      <div class="navbar-end">
        <button class="button-login" @click="$router.push('/login')">
          Login
        </button>

        <!-- <lang-switcher /> -->
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import NavBarMenu from '@/components/NavBarMenu'
import NavBarMenuSelect from '@/components/NavBarMenuSelect'

import LangSwitcher from './LangSwitcher.vue'
import AvatarLogo from './Logos/AvatarLogo.vue'

export default {
  name: 'NavBarHome',
  components: {
    NavBarMenu,
    LangSwitcher,
    NavBarMenuSelect,
    AvatarLogo,
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
<style scoped>
.shortcut-search {
  position: absolute;
  width: 50px;
  text-align: center;
  border: 1px solid #aaa;
  border-radius: 6px;
  top: 5px;
  right: 5px;
  color: #aaa;
}
.button-login {
  padding: 7px 13px;
  border: none;
  width: 120px;
  height: 40px;
  background-color: white;
  color: #0d6fda;
  font-size: 18px;
  font-weight: 400;
  border-radius: 40px;
  cursor: pointer;
}
.menu-list {
  display: flex;
  gap: 1rem;
  color: #fff;
  text-transform: uppercase;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.menu-list a:hover {
  background-color: transparent !important;
}
</style>
