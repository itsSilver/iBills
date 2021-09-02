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
          <div class="card">
            <client-only>
              <b-tabs destroy-on-hide>
                <b-tab-item :label="$t('product.product-data')" icon="archive">
                  <product-form :product="product" />
                </b-tab-item>
                <b-tab-item :label="$t('table.stock')" icon="transfer">
                  <product-locations />
                </b-tab-item>
              </b-tabs>
            </client-only>
          </div>
        </div>
        <div class="column is-one-quarter">
          <product-actions :product="product" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import ProductForm from '~/components/Content/Products/ProductForm.vue'
import ProductActions from '~/components/Content/Products/ProductActions.vue'
import ProductLocations from '~/components/Content/Products/ProductLocations.vue'
export default {
  head() {
    return {
      title: `${this.product.name} — ${this.$t('messages.title')}`,
    }
  },
  components: {
    HeroBar,
    CardComponent,
    ProductForm,
    ProductActions,
    ProductLocations,
  },
  data() {
    return {
      deleteAll: false,
      dataTable: [],
      loading: false,
      isLoading: false,
      trashObject: null,
      isDeleteActive: false,
      isModalActive: false,
      parseCsv: null,
      selected: null,
    }
  },
  async asyncData({ store, $axios, $auth, params }) {
    let response = await $axios.get(`/products/${params.id}`, {
      headers: {
        Authorization: `Bearer ${$auth.strategy.token.get()}`,
        'Content-Type': 'application/json',
      },
    })

    let product = response.data

    return { product }
  },
}
</script>

<style>
</style>