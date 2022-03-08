<template>
  <div
    class="navbar-item has-dropdown has-dropdown-with-icons"
    :class="{ 'is-active': isDropdownActive }"
    @click="toggle"
  >
    <a class="navbar-link is-arrowless">
      <img
        class="lang-icon mr-1"
        :src="require(`~/assets/flags/${$i18n.locale}.png`)"
      />
    </a>
    <div slot="dropdown" class="navbar-dropdown">
      <a
        class="navbar-item"
        v-for="locale in $i18n.locales"
        :key="locale.code"
        @click="changeLocale(locale.code)"
      >
        <img
          class="lang-icon ml-1 mr-1"
          :src="require(`~/assets/flags/${locale.code}.png`)"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownActive: false,
    }
  },
  mounted() {
    window.addEventListener('click', this.forceClose)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.forceClose)
  },
  methods: {
    toggle() {
      this.isDropdownActive = !this.isDropdownActive
    },
    forceClose(e) {
      if (!this.$el.contains(e.target)) {
        this.isDropdownActive = false
      }
    },
    changeLocale(locale) {
      this.$i18n.setLocaleCookie(locale)
      this.$router.push(this.switchLocalePath(locale))
    },
  },
}
</script>

<style scoped>
.lang-icon {
  width: 20px;
  height: 20px;
}
</style>
