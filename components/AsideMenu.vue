<template>
  <aside
    v-show="isAsideVisible"
    class="aside is-placed-left is-expanded aside-sidebar"
  >
    <aside-tools :is-main-menu="true">
      <span slot="label" @click="openMainDrawer" class="cursor-pointer">
        <b>Online Blockchain</b>
      </span>
    </aside-tools>
    <div class="menu is-menu-main custom-sidebar">
      <template v-for="(menuGroup, index) in menu">
        <p v-if="typeof menuGroup === 'string'" :key="index" class="menu-label">
          {{ menuGroup }}
        </p>
        <aside-menu-list
          v-else
          :key="index"
          :menu="menuGroup"
          @menu-click="menuClick"
        />
      </template>
    </div>
    <div class="bottom">
      <NuxtLink :to="localePath('logout')" class="navbar-item">
        <b-icon icon="logout" custom-size="default" />
        <span>{{ $t('nav.logout') }}</span></NuxtLink
      >
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import AsideTools from '@/components/AsideTools'
import AsideMenuList from '@/components/AsideMenuList'

export default {
  name: 'AsideMenu',
  components: { AsideTools, AsideMenuList },
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState(['isAsideVisible']),
  },
  methods: {
    menuClick(item) {
      this.$emit('menu-click', item)
    },
    openMainDrawer() {
      this.$emit('main-drawer')
    },
  },
}
</script>
