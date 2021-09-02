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
            <unloads-product-item
              :product="product"
              :key="index"
              :index="index"
              @add-product="addPayload"
              @delete-load="onDeleteLoad"
            />
          </template>
        </tbody>
        <!-- <tfoot>
          <tr class="table-footer">
            <th class="" style="" colspan="8">
              <div class="has-text-right">Footer</div>
            </th>
            <th></th>
          </tr>
        </tfoot> -->
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
import UnloadsProductItem from './UnloadsProductItem.vue'
export default {
  name: 'UnloadsProductList',
  components: {
    UnloadsProductItem,
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
      },
    },
  },
  computed: {
    loadProducts() {
      return this.$store.state.products.loadProducts
    },
  },
  methods: {
    addPayload(val) {
      this.$emit('create-load', val)
    },
    onDeleteLoad(id) {
      this.$emit('delete-single-load', id)
    },
  },
}
</script>

<style scoped>
.card.has-table .b-table {
  overflow: unset;
}
</style>