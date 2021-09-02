<template>
  <div class="px-4 py-4">
    <div class="columns">
      <div class="column">
        <b-field :label="$t('table.shipping_cost')">
          <client-only>
            <currency-input
              v-model="transport.shipping_cost"
              class="input is-small"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.shipping_cost')}`,
                })
              "
              name="shipping_cost"
            />
          </client-only>
        </b-field>
      </div>
      <div class="column">
        <b-field :label="$t('table.shipping_tax')">
          <b-input
            v-model="transport.shipping_tax"
            :placeholder="
              $t('messages.placeholder', {
                name: `${$t('table.shipping_tax')}`,
              })
            "
            type="number"
            name="shipping_tax"
            size="is-small"
          />
        </b-field>
      </div>
      <div class="column">
        <b-field :label="$t('table.total_cost')">
          <client-only>
            <currency-input
              v-model="shipping_total"
              class="input is-small"
              disabled
              name="shipping_total"
            />
          </client-only>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnloadsTransport',
  data() {
    return {
      transport: null,
    }
  },
  watch: {
    load: {
      immediate: true,
      handler(val) {
        this.transport = { ...val }
      },
    },
    transport: {
      deep: true,
      handler(val) {
        this.$emit('data-transport', val)
      },
    },
    shipping_total: {
      immediate: true,
      handler(val) {
        this.$emit('shipping-total', val)
      },
    },
  },
  computed: {
    shipping_total() {
      const cost = parseFloat(this.transport.shipping_cost).toFixed(2)
      const tax = parseInt(this.transport.shipping_tax)
      if (cost && tax) {
        var grandWithTax = cost * ((100 + tax) / 100)

        return Number(grandWithTax)
      }
      if (cost && !tax) {
        var grandWithTax = Number(cost)

        return grandWithTax
      }
      return 0
    },
  },
  props: ['load'],
}
</script>

<style>
</style>