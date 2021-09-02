<template>
  <div class="product-label">
    <div class="columns">
      <div class="column is-one-third is-flex">
        <barcode
          :value="product.barcode"
          format="EAN13"
          lineColor="#21314e"
          id="barcode-result"
          tag="img"
          class="rotated"
        >
          No Barcode
        </barcode>
      </div>
      <div class="column is-two-thirds" id="product-label">
        <div class="data-label">
          <div class="label-name">
            <b>
              {{ product.name }}
            </b>
          </div>
          <hr />
          <div class="label-price">
            {{ $t('table.price') }} : <b>{{ product.sale }} EUR</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductLabel',
  props: ['product'],
  data() {
    return {}
  },
}
</script>

<style scoped>
.rotated {
  transform: rotate(90deg);
}
.label-title {
  margin-bottom: 1.8rem;
}
.data-label {
  border: 1px solid #21314e;
  padding: 1rem;
}
hr {
  margin: 1rem auto;
}
</style>