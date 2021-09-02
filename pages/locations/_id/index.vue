<template>
  <div>
    <hero-bar>
      {{ $t('location.location') }} : {{ categoryName }}
      <div slot="right">
        <nuxt-link to="/" class="button is-small">
          {{ $t('nav.dashboard') }}
        </nuxt-link>
      </div>
    </hero-bar>
    <section class="section is-main-section is-fullheight">
      <div class="columns" style="flex-wrap: wrap">
        <div class="column is-12-tablet is-9-widescreen">
          <div class="card">
            <client-only>
              <b-tabs destroy-on-hide>
                <b-tab-item :label="$t('table.products')" icon="archive">
                  <location-products
                    @total-cost="updateTotalCost"
                    @total-sale="updateTotalSale"
                  />
                </b-tab-item>
                <b-tab-item :label="$t('table.transfers')" icon="transfer">
                  <location-transfer />
                </b-tab-item>
              </b-tabs>
            </client-only>
          </div>
        </div>
        <div class="column is-12-tablet is-3-widescreen">
          <card-component
            class="has-table has-mobile-sort-spaced"
            :title="$t('location.location-data')"
            icon="archive"
          >
            <div>dadad</div>
          </card-component>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import LocationProducts from '~/components/Content/Locations/LocationProducts.vue'
import LocationTransfer from '~/components/Content/Locations/LocationTransfer.vue'

export default {
  name: 'LocationsId',
  head() {
    return {
      title: `${this.$t('nav.locations')} — ${this.$t('messages.title')}`,
    }
  },
  components: {
    HeroBar,
    CardComponent,
    LocationProducts,
    LocationTransfer,
  },
  data() {
    return {
      isLoading: false,
      categoryData: null,
      dataTable: [],
      totalCost: 0,
      totalSale: 0,
    }
  },
  computed: {
    categoryName() {
      if (this.categoryData) {
        return this.categoryData.name
      }
    },
    currency() {
      return this.$store.state.currency
    },
    profit() {
      return parseFloat(this.totalSale - this.totalCost).toFixed(2)
    },
  },

  mounted() {
    this.loadAsyncData()
  },
  methods: {
    updateTotalCost(val) {
      this.totalCost = parseFloat(val).toFixed(2)
    },
    updateTotalSale(val) {
      this.totalSale = parseFloat(val).toFixed(2)
    },
    async loadAsyncData() {
      const id = this.$route.params.id
      this.loading = true
      await this.$axios
        .get(`/locations/${id}`, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          this.categoryData = response.data
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          console.log('error', error.data)
        })
    },
  },
}
</script>

<style>
</style>