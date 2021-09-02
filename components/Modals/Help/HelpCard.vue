<template>
  <div class="card">
    <header class="modal-card-head">
      <p class="modal-card-title header-title">
        <b>{{ title }}</b>
      </p>
      <p>
        <span class="shortcut-card">Ctrl H</span>
      </p>
    </header>
    <section class="modal-card-body">
      <help-card-data />
    </section>
    <footer class="modal-card-foot">
      <button class="button is-small" type="button" @click="$emit('cancel')">
        {{ $t('navtop.cancel') }}
      </button>
    </footer>
  </div>
</template>

<script>
import HelpCardData from './HelpCardData.vue'
export default {
  name: 'HelpCard',
  components: { HelpCardData },
  props: ['title'],
}
</script>
<style scoped>
.shortcut-card {
  border: 1px solid #aaa;
  border-radius: 6px;
  color: #aaa;
  padding-left: 5px;
  padding-right: 5px;
}
</style>