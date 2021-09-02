<template>
  <div
    class="navbar-item"
    :class="{ 'is-hoverable': isHoverable, 'is-active': isDropdownActive }"
    @click="toggle"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NavBarMenuSelect',
  props: {
    isHoverable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDropdownActive: false,
    }
  },
  computed: {
    toggleDropdownIcon() {
      return this.isDropdownActive ? 'chevron-up' : 'chevron-down'
    },
  },
  mounted() {
    window.addEventListener('click', this.forceClose)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.forceClose)
  },
  methods: {
    toggle() {
      if (!this.isHoverable) {
        this.isDropdownActive = !this.isDropdownActive
      }
    },
    forceClose(e) {
      if (!this.$el.contains(e.target)) {
        this.isDropdownActive = false
      }
    },
  },
}
</script>
