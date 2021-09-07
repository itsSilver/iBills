<template>
  <tr draggable="false">
    <td>
      <label for="barcode" class="is-hidden-desktop">{{
        $t('table.barcode')
      }}</label>
      {{ product.product.barcode }}
    </td>
    <td>
      <label for="name" class="is-hidden-desktop">{{ $t('table.name') }}</label>
      {{ product.product.name }}
    </td>
    <td style="display: flex; align-items: center">
      <label for="quantity" class="is-hidden-desktop">{{
        $t('table.quantity')
      }}</label>
      <b-input
        min="0"
        type="number"
        size="is-small"
        v-model="product.qty"
        name="quantity"
        required
        ref="quantity"
        :disabled="disabled"
      ></b-input>
    </td>
    <td>
      <label for="sale" class="is-hidden-desktop">{{ $t('table.sale') }}</label>
      <client-only>
        <currency-input
          v-model="product.product.sale"
          :currency="currency"
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
        v-model="product.discount"
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
        v-model="product.product.vat"
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
          :currency="currency"
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
          :currency="currency"
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
          :currency="currency"
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
          @click="trashArray(product.product.id)"
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
  props: ['product'],
  data() {
    return {
      quantity: 0,
      discount: 0,
      expiration: new Date(),
    }
  },

  methods: {
    trashArray(val) {
      this.$store.commit('products/REMOVE_PRODUCT', val)
    },
  },
  computed: {
    total() {
      let quantity = parseFloat(this.product.qty)
      let cost = parseFloat(this.product.product.sale)
      let tax = parseFloat(this.product.product.vat)
      let discount = parseFloat(this.product.discount)
      let taxRate = tax / 100
      let discountRate = discount / 100
      let totalTax = cost * quantity * taxRate
      let totalDiscount = (cost * quantity + totalTax) * discountRate
      if (cost && tax && quantity) {
        var grandWithTax = cost * quantity + totalTax - totalDiscount
        return (this.product.total = parseFloat(grandWithTax))
      }
      if (cost && !tax && quantity) {
        var grandWithTax = cost * quantity - totalDiscount
        return (this.product.total = parseFloat(grandWithTax))
      }
      return (this.product.total = 0)
    },
    totalTax() {
      let cost = parseFloat(this.product.product.sale)
      let quantity = parseFloat(this.product.qty)
      let tax
      if (this.product.tax) {
        tax = parseFloat(this.product.tax)
      } else {
        tax = parseFloat(this.product.product.vat)
      }
      let taxRate = tax / 100
      let totalTax = cost * quantity * taxRate
      return (this.product.total_vat = totalTax)
    },
    totalNoTax() {
      let cost = parseFloat(this.product.product.sale)
      let quantity = parseFloat(this.product.qty)

      let totalNoTax = cost * quantity
      return (this.product.total_novat = totalNoTax)
    },
    disabled() {
      let id = this.$route.params.id
      if (id) {
        return true
      } else {
        false
      }
    },
    currency() {
      return this.$store.state.currency
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