<template>
  <div class="card main-drawer-card" @click="openLink">
    <div class="card-icon">
      <slot></slot>
    </div>
    <h4 class="main-drawer-title">
      {{ title }}
    </h4>
  </div>
</template>

<script>
export default {
  props: ['title', 'toLink'],
  methods: {
    openLink() {
      this.$router.push(this.localePath(this.toLink))
      this.$emit('close-main-drawer')
    },
  },
}
</script>

<style scoped>
.card-icon {
  width: 80px;
  height: 80px;
  margin: 1.5rem 0.5rem;
}
.card-icon svg {
  width: 100%;
  height: 100%;
}
.main-drawer-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  justify-items: center;
  cursor: pointer;
}
.main-drawer-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}
html.is-dark-mode-active .main-drawer-title {
  color: #fff;
}
</style>