<template>
  <div>
    <hero-bar>
      {{ product.name }}
      <div slot="right" class="navtop-has-buttons">
        <nuxt-link to="/" class="button is-small">
          {{ $t('nav.dashboard') }}
        </nuxt-link>
      </div>
    </hero-bar>
    <section class="section is-main-section is-fullheight">
      <div class="columns">
        <div class="column is-three-quarters">
          <card-component
            class="has-table has-mobile-sort-spaced"
            :title="$t('product.product-data')"
            icon="archive"
          >
            <product-create @form-data="onFormData" />
          </card-component>
        </div>
        <div class="column is-one-quarter">
          <product-actions-create :product="product" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import ProductCreate from '~/components/Content/Products/ProductCreate.vue'
import ProductActionsCreate from '~/components/Content/Products/ProductActionsCreate.vue'
export default {
  head() {
    return {
      title: `${this.$t('product.create')} — ${this.$t('messages.title')}`,
    }
  },
  components: {
    HeroBar,
    CardComponent,
    ProductActionsCreate,
    ProductCreate,
  },
  data() {
    return {
      product: [],
    }
  },
  methods: {
    onFormData(val) {
      this.product = val
    },
  },
}
</script>

<style>
</style>