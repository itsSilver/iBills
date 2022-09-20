<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar is-fixed-top">
    <div class="navbar-brand custom-logo-login">Bitcoin Block</div>
    <div class="navbar-brand is-right">
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
    </div>
    <div
      class="navbar-menu fadeIn animated faster"
      :class="{ 'is-active': isMenuNavBarActive }"
    >
      <div class="navbar-end">
        <nav-bar-menu class="has-divider has-user-avatar">
          <avatar-logo
            style="width: 1.5rem; height: 1.5rem; margin-right: 0.75rem"
          />
          <div class="is-user-name">
            <span>{{ $auth.user.first_name }}</span>
          </div>

          <!-- <div slot="dropdown" class="navbar-dropdown">
            <nuxt-link
              :to="localePath('profile')"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="account" custom-size="default" />
              <span>{{ $t('user-nav.profile') }}</span>
            </nuxt-link>
            <nuxt-link
              :to="localePath('settings')"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="settings" custom-size="default" />
              <span>{{ $t('user-nav.settings') }}</span>
            </nuxt-link>

            <a class="navbar-item">
              <b-icon icon="bell-ring" custom-size="default" />
              <span>{{ $t('user-nav.notifications') }}</span>
            </a>
          </div> -->
        </nav-bar-menu>

        <!-- <lang-switcher /> -->

        <NuxtLink
          :to="localePath('logout')"
          class="navbar-item is-desktop-icon-only"
        >
          <b-icon icon="logout" custom-size="default" />
          <span>{{ $t('nav.logout') }}</span></NuxtLink
        >
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
  name: 'NavBar',
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
<style scoped></style>
