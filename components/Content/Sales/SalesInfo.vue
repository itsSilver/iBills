<template>
  <div class="px-4 py-4">
    <div class="columns">
      <div class="column">
        <b-field :label="$t('table.reference')">
          <b-input
            size="is-small"
            v-model="infos.reference"
            :placeholder="
              $t('messages.placeholder', {
                name: `${$t('table.reference')}`,
              })
            "
            name="reference"
          />
        </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-field :label="$t('table.note')">
          <b-input
            size="is-small"
            v-model="infos.note"
            :placeholder="
              $t('messages.placeholder', {
                name: `${$t('table.note')}`,
              })
            "
            type="textarea"
            name="note"
          />
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SalesInfo',
  data() {
    return {
      infos: [],
    }
  },
  watch: {
    load: {
      immediate: true,
      handler(val) {
        this.infos = { ...val }
      },
    },
    infos: {
      deep: true,
      handler(val) {
        this.$emit('data-info', val)
      },
    },
  },
  props: ['load'],
}
</script>

<style>
</style>