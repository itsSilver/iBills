<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <help-shortcut :text="$t('help.list.search')" shortcut="Ctrl F" />
      </div>
      <div class="column">
        <help-shortcut :text="$t('help.list.menu')" shortcut="Ctrl M" />
      </div>
    </div>
  </div>
</template>

<script>
import HelpShortcut from './HelpShortcut.vue'
export default {
  components: { HelpShortcut },
  name: 'HelpCardData',
}
</script>

<style>
</style>