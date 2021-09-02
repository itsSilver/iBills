<template>
  <div class="card px-4 py-4">
    <h4 class="product-action">
      {{ $t('product.action-title') }}
    </h4>
    <hr />
    <h4 class="text-capitalize small-titles label-title">
      {{ $t('product.label') }}
    </h4>
    <client-only placeholder="Loading...">
      <product-label :product="product" />
    </client-only>
    <client-only placeholder="Loading...">
      <vue-html2pdf
        :show-layout="false"
        :enable-download="true"
        :preview-modal="false"
        :paginateElementsByHeight="1200"
        :manual-pagination="true"
        :html-to-pdf-options="htmlToPdfOptions"
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
      <custom-button @click="printLabel" class="mb-4">
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
      <custom-button @click="printBarcode" class="mb-4">
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
      <custom-button @click="newProduct" class="mb-4">
        <template #icon>
          <new-product-logo class="is-medium mr-2" />
        </template>
        <p
          class="justify-between"
          v-shortkey.once="['ctrl', 'alt', 'n']"
          @shortkey="newProduct"
        >
          <span> {{ $t('product.new') }} </span>
          <span class="shortcuts is-hidden-mobile"> Ctrl + Alt + N </span>
        </p>
      </custom-button>

      <custom-button @click="clicked" class="mb-4">
        <template #icon>
          <print-logo class="is-medium mr-2" />
        </template>
        <p class="justify-between">
          <span> Add </span>
          <span class="shortcuts is-hidden-mobile"> Ctrl P </span>
        </p>
      </custom-button>
    </div>
  </div>
</template>

<script>
import CustomButton from '~/components/CustomButton.vue'
import NewProductLogo from '~/components/Logos/NewProductLogo.vue'
import PrintLogo from '~/components/Logos/PrintLogo.vue'
import BarcodeLogo from '~/components/Logos/BarcodeLogo.vue'
import ProductLabel from './ProductLabel.vue'
export default {
  name: 'ProductActions',
  components: {
    CustomButton,
    PrintLogo,
    NewProductLogo,
    ProductLabel,
    BarcodeLogo,
  },
  data() {
    return {
      indefinteToast: null,
      open: null,
      htmlToPdfOptions: {
        margin: [0.3, 0.3, 0.3, 0.3],

        filename: `hehehe.pdf`,

        image: {
          type: 'jpeg',
          quality: 0.98,
        },

        html2canvas: {
          scale: 1,
          useCORS: true,
        },

        jsPDF: {
          unit: 'px',
          format: 'a4',
          orientation: 'portrait',
        },
      },
    }
  },

  methods: {
    clicked() {
      console.log('clikdeee')
    },
    newProduct() {
      this.$router.push(this.localePath('/products/create'))
    },
    printLabel() {
      console.log('print lavelw')
      this.$refs.html2Pdf.generatePdf()
    },
    printBarcode() {
      console.log('print barcode')
    },
    onProgress(x) {
      console.log(x)
    },
    hasGenerated(x) {
      console.log(x)
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