<template>
  <div
    class="is-fullwidth is-start is-flex custom-btn"
    @click="$emit('click')"
    :class="{ 'pointer-none': disabled }"
  >
    <slot name="icon" />
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style scoped>
.is-start {
  justify-content: start;
}
.custom-btn {
  cursor: pointer;
  border: 1px solid #21314e;
  padding: 0.75rem 0.5rem;
  border-radius: 4px;
  background: #f2f7fa;
}
.pointer-none {
  pointer-events: none;
}
</style>
