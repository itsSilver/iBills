<template>
  <div class="is-flex custom-navtop">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'NavTopGeneral',
  data() {
    return {
      // deleteAll: false,
    }
  },
  props: ['deleteAll'],
}
</script>

<style scoped>
.custom-navtop {
  align-items: center;
  gap: 1rem;
  margin-right: 1rem;
}
</style>