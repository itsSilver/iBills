<template>
  <tr draggable="false" :key="prod.length">
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
    <td>
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
        :disabled="disabled"
      ></b-input>
    </td>
    <td>
      <label for="tax" class="is-hidden-desktop">{{ $t('table.vat') }}</label>
      <b-input
        min="0"
        size="is-small"
        type="number"
        v-model="prod.tax"
        v-if="prod.tax"
        name="tax"
        :disabled="disabled"
      ></b-input>
      <b-input
        min="0"
        size="is-small"
        type="number"
        v-model="prod.product.vat"
        v-else
        name="vatRate"
        :disabled="disabled"
      ></b-input>
    </td>
    <td>
      <label for="total" class="is-hidden-desktop">{{
        $t('table.total')
      }}</label>
      <client-only>
        <currency-input
          :value="totale"
          class="input is-small total-input"
          name="total"
          disabled
        />
      </client-only>
    </td>
    <td>
      <div class="is-flex delete-flex">
        <button
          class="button is-primary is-small"
          type="submit"
          @click="saveLoadDetail"
          v-if="!prod.id"
        >
          <b-icon icon="plus-thick" size="is-small" />
        </button>
        <button
          class="button is-danger is-small"
          type="button"
          @click="trashModal(prod)"
          v-if="prod.id"
        >
          <b-icon icon="trash-can" size="is-small" />
        </button>
        <button
          class="button is-danger is-small"
          type="button"
          @click="trashArray(index)"
          v-else
        >
          <b-icon icon="trash-can" size="is-small" />
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'UnloadsProductItem',
  props: ['product', 'index'],
  data() {
    return {
      prod: null,
      quantity: 0,
      discount: 0,
    }
  },
  watch: {
    product: {
      immediate: true,
      handler(val) {
        this.prod = JSON.parse(JSON.stringify(val))
      },
    },
  },
  methods: {
    trashArray(val) {
      this.$store.commit('products/REMOVE_PRODUCT', val)
    },
    trashModal(val) {
      this.$buefy.dialog.confirm({
        title: `${this.$t('messages.confirm')}`,
        message: `${this.$t('warehouse.delete', { name: val.product.name })}`,
        confirmText: `OK`,
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.$emit('delete-load', val.id),
      })
    },
    saveLoadDetail() {
      const qty = parseInt(this.prod.qty)
      if (qty === 0) {
        this.$buefy.dialog.confirm({
          title: 'Error',
          message: `${this.$t('errors.quantity')}`,
          confirmText: 'OK',
          canCancel: false,
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.$refs.quantity.focus(),
        })

        return
      }
      let payload = {
        qty: this.prod.qty,
        total: this.totale,
        discount: this.prod.discount,
        tax: this.prod.product.vat,
        price: this.prod.product.sale,
        product: {
          id: this.prod.product.id,
          cost_tolerance: this.prod.product.sale_tolerance,
          min_qty: this.prod.product.min_qty,
          max_qty: this.prod.product.max_qty,
        },
      }
      this.$emit('add-product', payload)
    },
  },
  computed: {
    totale() {
      let quantity = parseFloat(this.prod.qty)
      let cost = parseFloat(this.prod.product.sale)
      let tax
      if (this.prod.tax) {
        tax = parseFloat(this.prod.tax)
      } else {
        tax = parseFloat(this.prod.product.vat)
      }
      let discount = parseFloat(this.prod.discount)
      let taxRate = tax / 100
      let discountRate = discount / 100
      let totalTax = cost * quantity * taxRate
      let totalDiscount = (cost * quantity + totalTax) * discountRate
      if (cost && tax && quantity) {
        var grandWithTax = cost * quantity + totalTax - totalDiscount
        return parseFloat(grandWithTax)
      }
      if (cost && !tax && quantity) {
        var grandWithTax = cost * quantity - totalDiscount
        return parseFloat(grandWithTax)
      }
      return 0
    },

    disabled() {
      return this.prod.id ? true : false
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
  background-color: #ffe08a;
  border-color: transparent;
  color: rgba(0, 0, 0);
}
td input {
  max-width: 100px !important;
}
</style>