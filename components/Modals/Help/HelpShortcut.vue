<template>
  <div class="is-flex help-short">
    <p class="text-info text-capitalize">{{ text }}</p>
    <p class="shortcuts">{{ shortcut }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelpShortcut',
  props: ['text', 'shortcut'],
}
</script>

<style scoped>
.help-short {
  justify-content: space-between;
  padding: 0.5rem 0.25rem;
  border-bottom: 1px solid #aaa;
}
.text-info {
  font-size: 1rem;
  color: #333;
  font-weight: 600;
}
.shortcuts {
  border: 1px solid #aaa;
  border-radius: 6px;
  color: #aaa;
  padding-left: 5px;
  padding-right: 5px;
}
</style>