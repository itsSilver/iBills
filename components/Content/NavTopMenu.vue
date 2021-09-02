<template>
  <div class="is-flex custom-navtop">
    <slot></slot>
    <button
      class="button is-primary is-small"
      type="button"
      @click="$emit('new-document')"
      v-role="'admin'"
    >
      <b-icon icon="plus-thick" size="is-small" />
      <span> {{ $t('navtop.create') }} </span>
    </button>
    <button
      class="button is-danger is-small"
      type="button"
      v-if="deleteAll"
      @click="$emit('delete-selected')"
      v-role="'admin'"
    >
      <b-icon icon="trash-can" size="is-small" />
      <span> {{ $t('navtop.delete_selected') }} </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'NavTopMenu',
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