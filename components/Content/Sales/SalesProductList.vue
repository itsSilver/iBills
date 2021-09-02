<template>
  <div class="b-table has-mobile-cards">
    <div class="table-wrapper has-mobile-cards">
      <table class="table is-striped is-narrow is-hoverable">
        <thead>
          <tr>
            <th draggable="false">
              <div class="th-wrap">
                <span class="is-relative"> {{ $t('table.barcode') }} </span>
              </div>
            </th>
            <th draggable="false">
              <div class="th-wrap">
                <span class="is-relative"> {{ $t('table.name') }} </span>
              </div>
            </th>
            <th draggable="false">
              <div class="th-wrap">
                <span class="is-relative"> {{ $t('table.quantity') }} </span>
              </div>
            </th>
            <th draggable="false">
              <div class="th-wrap">
                <span class="is-relative"> {{ $t('table.price') }} </span>
              </div>
            </th>

            <th draggable="false">
              <div class="th-wrap">
                <span class="is-relative"> {{ $t('table.discount') }}</span>
              </div>
            </th>
            <th draggable="false">
              <div class="th-wrap">
                <span class="is-relative">
                  {{ $t('table.vat-percentage') }}</span
                >
              </div>
            </th>

            <th draggable="false">
              <div class="th-wrap">
                <span class="is-relative">
                  {{ $t('table.total-no-vat') }}
                </span>
              </div>
            </th>
            <th draggable="false">
              <div class="th-wrap">
                <span class="is-relative"> {{ $t('table.total-vat') }} </span>
              </div>
            </th>
            <th draggable="false">
              <div class="th-wrap">
                <span class="is-relative"> {{ $t('table.total') }} </span>
              </div>
            </th>
            <th draggable="false">
              <div class="th-wrap">
                <span class="is-relative"> {{ $t('table.action') }} </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="custom-table">
          <template v-for="(product, index) in products">
            <sales-product-item
              :product="product"
              :key="index"
              :index="index"
            />
          </template>
        </tbody>
        <client-only>
          <div class="space-x2"></div>
        </client-only>
        <tfoot class="footer-total">
          <tr class="table-footer">
            <td class="" style="" colspan="8">
              <div class="has-text-right">{{ $t('table.total_novat') }}:</div>
            </td>
            <td>
              <client-only>
                <currency-input
                  :value="grandNoTax"
                  class="input is-small custom-input"
                  name="grandTotal"
                  disabled
                />
              </client-only>
            </td>
            <td></td>
          </tr>
          <tr class="table-footer">
            <td class="" style="" colspan="8">
              <div class="has-text-right">{{ $t('table.total_vat') }}:</div>
            </td>
            <td>
              <client-only>
                <currency-input
                  :value="grandTax"
                  class="input is-small custom-input"
                  name="grandTotal"
                  disabled
                />
              </client-only>
            </td>
            <td></td>
          </tr>
          <tr class="table-footer">
            <td class="" style="" colspan="8">
              <div class="has-text-right">{{ $t('table.total_doc') }} :</div>
            </td>
            <td>
              <client-only>
                <currency-input
                  :value="grandTotal"
                  class="input is-small total-input"
                  name="grandTotal"
                  disabled
                />
              </client-only>
            </td>
            <td></td>
          </tr>
        </tfoot>
        <b-loading
          :is-full-page="false"
          v-model="isLoaded"
          :can-cancel="false"
        ></b-loading>
      </table>
    </div>
  </div>
</template>

<script>
import SalesProductItem from './SalesProductItem.vue'
export default {
  name: 'SalesProductList',
  components: {
    SalesProductItem,
  },
  props: ['isLoaded'],
  data() {
    return {
      products: null,
    }
  },
  watch: {
    loadProducts: {
      immediate: true,
      deep: true,
      handler(val) {
        this.products = JSON.parse(JSON.stringify(val))
        this.calcGrandTotal(val)
        this.calcTaxTotal(val)
        this.calcNoTaxTotal(val)
      },
    },
  },
  computed: {
    loadProducts() {
      return this.$store.state.products.loadProducts
    },
    grandTax() {
      return this.$store.state.sales.grandTax
    },
    grandNoTax() {
      return this.$store.state.sales.grandNoTax
    },
    grandTotal() {
      return this.$store.state.sales.grandTotal
    },
  },
  methods: {
    calcGrandTotal(val) {
      if (val.length === 0) {
        this.$store.commit('sales/UPDATE_GRAND_TOTAL', 0)
        return
      }
      let sum = val.reduce((a, b) => {
        return a + parseFloat(b.total)
      }, 0)
      this.$store.commit('sales/UPDATE_GRAND_TOTAL', sum)
    },
    calcTaxTotal(sasa) {
      if (sasa.length === 0) {
        this.$store.commit('sales/UPDATE_GRAND_TAX', 0)
        return
      }
      let taxxx = sasa.reduce((a, b) => {
        return a + parseFloat(b.total_vat)
      }, 0)
      this.$store.commit('sales/UPDATE_GRAND_TAX', taxxx)
    },
    calcNoTaxTotal(dada) {
      if (dada.length === 0) {
        this.$store.commit('sales/UPDATE_GRAND_NOTAX', 0)
        return
      }
      let notax = dada.reduce((a, b) => {
        return a + parseFloat(b.total_novat)
      }, 0)
      this.$store.commit('sales/UPDATE_GRAND_NOTAX', notax)
    },
  },
}
</script>


<style scoped>
.custom-input.is-small {
  border: none;
  background: transparent !important;
  color: #333;
  font-weight: bold;
  max-width: 90px;
}
.input.is-small.custom-input {
  height: 25px;
}
.space-x2 {
  height: 2rem;
}
.total-input {
  background-color: #ffe08a !important;
  border-color: transparent !important;
  color: rgba(0, 0, 0) !important;
  max-width: 90px;
}
</style>