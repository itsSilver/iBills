<template>
  <div class="px-4 py-4">
    <div class="is-flex details-row">
      <h4 class="details-title">{{ $t('table.code') }} :</h4>
      <p>{{ load.code }}</p>
    </div>
    <div class="is-flex details-row">
      <h4 class="details-title">{{ $t('table.date') }} :</h4>
      <p>{{ filterDate(load.date) }}</p>
    </div>
    <div class="is-flex details-row" v-if="load.customer">
      <h4 class="details-title">{{ $t('table.customer') }} :</h4>
      <p>{{ load.customer }}</p>
    </div>
    <div class="is-flex details-row" v-if="load.reference">
      <h4 class="details-title">{{ $t('table.reference') }} :</h4>
      <p>{{ load.reference }}</p>
    </div>

    <div v-if="load.note">
      <hr />

      <h3>Note</h3>
      <div class="is-flex details-row">
        <h4 class="details-title">{{ $t('table.note') }} :</h4>
        <div>
          {{ load.note }}
        </div>
      </div>
    </div>
    <div>
      <hr />

      <h3>Invoice total</h3>
      <div class="is-flex details-row">
        <h4 class="details-title">{{ $t('table.total_novat') }} :</h4>
        <div>
          <client-only>
            <currency-input
              :value="grandNoTax"
              class="custom-input is-small"
              disabled
            />
          </client-only>
        </div>
      </div>
      <div class="is-flex details-row">
        <h4 class="details-title">{{ $t('table.total_vat') }}:</h4>
        <div>
          <client-only>
            <currency-input
              :value="grandTax"
              class="custom-input is-small"
              disabled
            />
          </client-only>
        </div>
      </div>
      <div class="is-flex details-row">
        <h4 class="details-title">{{ $t('table.products-total') }} :</h4>
        <div>
          <client-only>
            <currency-input
              :value="grandTotal"
              class="custom-input is-small"
              disabled
            />
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'SalesDetails',
  props: ['load'],
  data() {
    return {}
  },
  methods: {
    openSupplierData() {
      console.log('tryingnss')
    },
    filterDate(val) {
      return dayjs(val).format(`${this.$config.dateFormat}`)
    },
  },
  computed: {
    grandTotal() {
      return this.$store.state.sales.grandTotal
    },
    grandTax() {
      return this.$store.state.sales.grandTax
    },
    grandNoTax() {
      return this.$store.state.sales.grandNoTax
    },
  },
}
</script>

<style scoped>
.details-title {
  font-weight: 700;
}
.details-row input {
  max-width: 110px;
}
.details-row {
  justify-content: space-between;
  flex-wrap: wrap;
}
.custom-input {
  border: none;
  background: none;
  font-weight: 600;
  color: #333;
  text-align: right;
}
</style>