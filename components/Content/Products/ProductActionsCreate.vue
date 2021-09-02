<template>
  <div class="card px-4 py-4">
    <h4 class="product-action">
      {{ $t('product.action-title') }}
    </h4>
    <hr />
    <client-only placeholder="Loading...">
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
      >
        <section slot="pdf-content">
          <product-label :product="product" />
        </section>
      </vue-html2pdf>
    </client-only>
    <hr />
    <div class="buttons-actions">
      <div>
        <custom-button @click="printLabel" class="mb-4" v-if="disabledLabel">
          <template #icon>
            <print-logo class="is-medium mr-2" />
          </template>
          <p
            class="justify-between"
            v-shortkey.once="['ctrl', 'p']"
            @shortkey="printLabel"
          >
            <span> {{ $t('product.print-label') }} </span>
            <span class="shortcuts is-hidden-mobile"> Ctrl + P </span>
          </p>
        </custom-button>
        <custom-button
          @click="printBarcode"
          class="mb-4"
          v-if="disabledBarcode"
        >
          <template #icon>
            <barcode-logo class="is-medium mr-2" />
          </template>
          <p
            class="justify-between"
            v-shortkey.once="['ctrl', 'alt', 'p']"
            @shortkey="printBarcode"
          >
            <span> {{ $t('product.print-barcode') }} </span>
            <span class="shortcuts is-hidden-mobile"> Ctrl + Alt + P </span>
          </p>
        </custom-button>
      </div>
      <custom-button @click="createNew" class="mb-4">
        <template #icon>
          <new-product-logo class="is-medium mr-2" />
        </template>
        <p
          class="justify-between"
          v-shortkey.once="['ctrl', 'alt', 'n']"
          @shortkey="createNew"
        >
          <span> {{ $t('product.create') }} </span>
          <span class="shortcuts is-hidden-mobile">Ctrl + Alt + N</span>
        </p>
      </custom-button>
    </div>
  </div>
</template>

<script>
import CustomButton from '~/components/CustomButton.vue'
import BarcodeLogo from '~/components/Logos/BarcodeLogo.vue'
import NewProductLogo from '~/components/Logos/NewProductLogo.vue'
import PrintLogo from '~/components/Logos/PrintLogo.vue'
import ProductLabel from './ProductLabel.vue'
export default {
  name: 'ProductActionsCreate',
  components: {
    CustomButton,
    PrintLogo,
    NewProductLogo,
    BarcodeLogo,
    ProductLabel,
  },
  data() {
    return {
      open: null,
      disabledLabel: false,
      disabledBarcode: false,
      pdf: null,
    }
  },

  watch: {
    product: {
      deep: true,
      handler(val) {
        this.checkVals(val)
      },
    },
  },
  methods: {
    checkVals(val) {
      if (!val) return

      if (val.name && val.barcode && val.sale) {
        this.disabledLabel = true
        this.disabledBarcode = true
      } else {
        this.disabledLabel = false
        this.disabledBarcode = false
      }
    },
    clicked() {
      console.log('clikdeee')
    },
    printLabel() {
      console.log('print label')
      this.$refs.html2Pdf.generatePdf()
    },
    printBarcode() {
      console.log('print barcode')
    },
    createNew() {
      this.$router.push(this.localePath('/products/create'))
    },
  },
  props: ['product'],
}
</script>

<style scoped>
.product-action {
  font-size: 1.25rem;
  line-height: 32px;
  color: #333;
  font-weight: 600;
}

.is-medium {
  height: 1.5em;
  width: 1.5em;
}
.mr-2 {
  margin-right: 0.5rem;
}
.shortcuts {
  border: 1px solid #aaa;
  border-radius: 6px;
  color: #aaa;
  padding-left: 5px;
  padding-right: 5px;
  background-color: #fff;
}
.justify-between {
  justify-content: space-between;
  display: flex;
  width: 100%;
}
</style>