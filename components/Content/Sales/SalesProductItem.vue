<template>
  <tr draggable="false">
    <td>
      <label for="barcode" class="is-hidden-desktop">{{
        $t('table.barcode')
      }}</label>
      {{ prod.product.barcode }}
    </td>
    <td>
      <label for="name" class="is-hidden-desktop">{{ $t('table.name') }}</label>
      {{ prod.product.name }}
    </td>
    <td style="display: flex; align-items: center">
      <label for="quantity" class="is-hidden-desktop">{{
        $t('table.quantity')
      }}</label>
      <b-input
        min="0"
        type="number"
        size="is-small"
        v-model="prod.qty"
        name="quantity"
        required
        ref="quantity"
        :disabled="disabled"
      ></b-input>
      <b-tooltip size="is-small">
        <template v-slot:content>
          <span> Stoku ne magazine : {{ prod.availableQty }} </span>
        </template>
        <b-icon icon="barn"> </b-icon>
      </b-tooltip>
    </td>
    <td>
      <label for="sale" class="is-hidden-desktop">{{ $t('table.sale') }}</label>
      <client-only>
        <currency-input
          v-model="prod.product.sale"
          class="input is-small"
          name="sale"
          :disabled="disabled"
        />
      </client-only>
    </td>

    <td>
      <label for="discount" class="is-hidden-desktop">{{
        $t('table.discount')
      }}</label>
      <b-input
        min="0"
        size="is-small"
        type="number"
        v-model="prod.discount"
        name="discount"
        max="100"
        :disabled="disabled"
      ></b-input>
    </td>
    <td>
      <label for="tax" class="is-hidden-desktop">{{ $t('table.vat') }}</label>
      <b-input
        min="0"
        size="is-small"
        type="number"
        v-model="prod.product.vat"
        name="vatRate"
        max="100"
        :disabled="disabled"
      ></b-input>
    </td>
    <td>
      <label for="total" class="is-hidden-desktop">{{
        $t('table.total-no-vat')
      }}</label>
      <client-only>
        <currency-input
          :value="totalNoTax"
          class="input is-small"
          name="totalNoTax"
          disabled
        />
      </client-only>
    </td>
    <td>
      <label for="total" class="is-hidden-desktop">{{
        $t('table.total-vat')
      }}</label>
      <client-only>
        <currency-input
          :value="totalTax"
          class="input is-small"
          name="totalTax"
          disabled
        />
      </client-only>
    </td>
    <td>
      <label for="total" class="is-hidden-desktop">{{
        $t('table.total')
      }}</label>
      <client-only>
        <currency-input
          :value="total"
          class="input is-small total-input"
          name="total"
          disabled
        />
      </client-only>
    </td>
    <td>
      <div class="is-flex delete-flex">
        <button
          class="button is-danger is-small"
          type="button"
          @click="trashArray(index)"
          :disabled="disabled"
        >
          <b-icon icon="trash-can" size="is-small" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'SalesProductItem',
  props: ['product', 'index'],
  data() {
    return {
      prod: null,
      quantity: 0,
      discount: 0,
      expiration: new Date(),

      qtyAvailable: 0,
      toltipText: 'testing',
    }
  },
  watch: {
    product: {
      immediate: true,
      handler(val) {
        this.prod = JSON.parse(JSON.stringify(val))
        this.prod.index = this.index
      },
    },
    prod: {
      deep: true,
      handler(val) {
        this.$store.commit('products/UPDATE_PRODUCT', this.prod)
      },
    },
  },
  methods: {
    trashArray(val) {
      this.$store.commit('products/REMOVE_PRODUCT', val)
    },
  },
  computed: {
    total() {
      let quantity = parseFloat(this.prod.qty)
      let cost = parseFloat(this.prod.product.sale)
      let tax = parseFloat(this.prod.product.vat)
      let discount = parseFloat(this.prod.discount)
      let taxRate = tax / 100
      let discountRate = discount / 100
      let totalTax = cost * quantity * taxRate
      let totalDiscount = (cost * quantity + totalTax) * discountRate
      if (cost && tax && quantity) {
        var grandWithTax = cost * quantity + totalTax - totalDiscount
        return (this.prod.total = parseFloat(grandWithTax))
      }
      if (cost && !tax && quantity) {
        var grandWithTax = cost * quantity - totalDiscount
        return (this.prod.total = parseFloat(grandWithTax))
      }
      return (this.prod.total = 0)
    },
    totalTax() {
      let cost = parseFloat(this.prod.product.sale)
      let quantity = parseFloat(this.prod.qty)
      let tax
      if (this.prod.tax) {
        tax = parseFloat(this.prod.tax)
      } else {
        tax = parseFloat(this.prod.product.vat)
      }
      let taxRate = tax / 100
      let totalTax = cost * quantity * taxRate
      return (this.prod.total_vat = totalTax)
    },
    totalNoTax() {
      let cost = parseFloat(this.prod.product.sale)
      let quantity = parseFloat(this.prod.qty)

      let totalNoTax = cost * quantity
      return (this.prod.total_novat = totalNoTax)
    },
    disabled() {
      let id = this.$route.params.id
      if (id) {
        return true
      } else {
        false
      }
    },
  },
}
</script>

<style scoped>
.delete-flex {
  width: 100%;
  flex-direction: row;
  justify-content: end;
}
.delete-flex button {
  margin-right: 5px;
  width: 100%;
}
.input.is-small.total-input {
  background-color: #ffe08a !important;
  border-color: transparent !important;
  color: rgba(0, 0, 0) !important;
}
td input {
  max-width: 100px !important;
}
</style>