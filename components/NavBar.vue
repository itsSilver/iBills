<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar is-fixed-top">
    <div class="navbar-brand">
      <a
        class="navbar-item"
        @click.prevent="menuToggleMobile"
        v-shortkey.once="['ctrl', 'm']"
        @shortkey="menuToggleMobile"
      >
        <b-icon :icon="menuToggleMobileIcon" type="is-custom" />
      </a>
      <div
        class="navbar-item no-left-space-touch"
        style="position: relative"
        v-shortkey="['ctrl', 'f']"
        @shortkey="focusInput"
      >
        <search-menu-input />
      </div>
    </div>
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
        <nav-bar-menu-select class="has-divider">
          <!-- <b-icon icon="menu" custom-size="default" type="is-custom" /> -->
          <companies-select-main />
        </nav-bar-menu-select>
        <nav-bar-menu class="has-divider has-user-avatar">
          <avatar-logo
            style="width: 1.5rem; height: 1.5rem; margin-right: 0.75rem"
          />
          <div class="is-user-name">
            <span>{{ $auth.user.full_name }}</span>
          </div>

          <div slot="dropdown" class="navbar-dropdown">
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
            <!-- <hr class="navbar-divider" />
            <a class="navbar-item">
              <b-icon icon="logout" custom-size="default" />
              <span>Log Out</span>
            </a> -->
          </div>
        </nav-bar-menu>

        <lang-switcher />
        <a
          title="help"
          class="navbar-item has-divider is-desktop-icon-only"
          v-shortkey.once="['ctrl', 'h']"
          @shortkey="toggleHelp"
          @click="toggleHelp"
        >
          <b-icon icon="help-circle-outline" custom-size="default" />
          <span>Help</span></a
        >

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
import CompaniesSelectMain from './CompaniesSelectMain.vue'
import SearchMenuInput from './SearchMenuInput.vue'
import AvatarLogo from './Logos/AvatarLogo.vue'

export default {
  name: 'NavBar',
  components: {
    NavBarMenu,
    LangSwitcher,
    CompaniesSelectMain,
    NavBarMenuSelect,
    SearchMenuInput,
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
    focusInput(e) {
      var targetDiv = e.target.childNodes[0].childNodes[0].childNodes[0]
      targetDiv.focus()
    },
    toggleHelp() {
      this.$emit('open-help')
    },
    menuToggleMobile() {
      this.$store.commit('asideMobileStateToggle')
      this.$store.commit('asideDescStateToggle')
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
</style>