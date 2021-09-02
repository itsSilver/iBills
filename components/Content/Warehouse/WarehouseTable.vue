<template>
  <div class="px-4 py-4">
    <form @submit.prevent="onUpdate">
      <div class="columns">
        <div class="column">
          <b-field :label="$t('table.name')">
            <b-input
              v-model="ware.name"
              placeholder="Name"
              name="name"
              size="is-small"
              required
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.code')">
            <b-input
              v-model="ware.code"
              placeholder="Code"
              size="is-small"
              name="code"
              required
            />
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field :label="$t('table.type')">
            <b-input
              v-model="ware.type"
              placeholder="Type"
              size="is-small"
              name="type"
              required
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.address')">
            <b-input
              v-model="ware.address"
              placeholder="Please add an address"
              size="is-small"
              name="address"
              required
            />
          </b-field>
        </div>
      </div>
      <hr />

      <div class="is-flex footer-new-modal">
        <b-button
          class="button is-small"
          type="button"
          @click="cancelUpdateModal"
        >
          {{ $t('navtop.cancel') }}
        </b-button>

        <button type="submit " class="button is-primary is-small">
          {{ $t('navtop.update') }}
        </button>
      </div>
      <b-loading v-model="isLoading"></b-loading>
    </form>
  </div>
</template>

<script>
export default {
  name: 'WarehouseTable',
  props: ['warehouse'],
  data() {
    return {
      ware: [],
    }
  },
  watch: {
    warehouse: {
      immediate: true,
      handler(val) {
        this.ware = val
      },
    },
  },
  methods: {
    submit() {},
  },
}
</script>

<style>
</style>