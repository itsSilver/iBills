<template>
  <div>
    <hero-bar>
      {{ $t('nav.stock') }}
      <div slot="right">
        <nuxt-link to="/" class="button is-small">
          {{ $t('nav.dashboard') }}
        </nuxt-link>
      </div>
    </hero-bar>
    <section class="section is-main-section is-fullheight">
      <div class="columns">
        <div class="column is-4-tablet">
          <card-icon
            :symbol="currency"
            :totalValue="totalCost"
            :title="$t('content.stock-price')"
            bgColor="#e7f2f3"
          >
            <stock-price-icon class="image is-64x64" />
          </card-icon>
        </div>
        <div class="column is-4-tablet">
          <card-icon
            :symbol="currency"
            :totalValue="totalSale"
            :title="$t('content.stock-value')"
            bgColor="#fef4de"
          >
            <stock-sale-icon class="image is-64x64" />
          </card-icon>
        </div>
        <div class="column is-4-tablet">
          <card-icon
            :symbol="currency"
            :totalValue="profit"
            :title="$t('content.stock-profit')"
            bgColor="#fbe9eb"
          >
            <stock-profit-icon class="image is-64x64" />
          </card-icon>
        </div>
        <div class="column is-4-tablet"></div>
        <div class="column is-4-tablet"></div>
      </div>
      <card-component
        class="has-table has-mobile-sort-spaced"
        :title="$t('nav.stock')"
        icon="package-up"
      >
        <div class="table-main">
          <b-table
            :loading="loading"
            :paginated="paginated"
            :per-page="perPage"
            :striped="true"
            :hoverable="true"
            default-sort="name"
            :data="dataTable"
          >
            <b-table-column
              :label="$t('table.code')"
              field="product.code"
              sortable
              searchable
              v-slot="props"
            >
              {{ props.row.product.code }}
            </b-table-column>
            <b-table-column
              :label="$t('table.barcode')"
              field="product.barcode"
              sortable
              searchable
              v-slot="props"
            >
              {{ props.row.product.barcode }}
            </b-table-column>
            <b-table-column
              :label="$t('table.name')"
              field="product.name"
              sortable
              searchable
              v-slot="props"
            >
              {{ props.row.product.name }}
            </b-table-column>
            <b-table-column
              :label="$t('table.quantity')"
              field="qty"
              sortable
              v-slot="props"
            >
              {{ props.row.qty }} <b> {{ props.row.product.unit.abbv }}</b>
            </b-table-column>

            <section slot="empty" class="section">
              <div class="content has-text-grey has-text-centered">
                <template v-if="loading">
                  <p>
                    <b-icon icon="dots-horizontal" size="is-large" />
                  </p>
                  <p>{{ $t('messages.fetching') }}</p>
                </template>
                <template v-else>
                  <p>
                    <b-icon icon="emoticon-sad" size="is-large" />
                  </p>
                  <p>{{ $t('messages.not_found') }}</p>
                </template>
              </div>
            </section>
          </b-table>
        </div>
      </card-component>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import CardIcon from '@/components/Content/CardIcon'
import StockPriceIcon from '~/components/Logos/StockPriceIcon.vue'
import StockSaleIcon from '~/components/Logos/StockSaleIcon.vue'
import StockProfitIcon from '~/components/Logos/StockProfitIcon.vue'
export default {
  name: 'Stock',
  head() {
    return {
      title: `${this.$t('nav.stock')} — ${this.$t('messages.title')}`,
    }
  },
  components: {
    HeroBar,
    CardComponent,
    StockPriceIcon,
    StockSaleIcon,
    StockProfitIcon,
    CardIcon,
  },
  data() {
    return {
      deleteAll: false,
      dataTable: [],
      total: 0,
      loading: false,
      page: 1,
      perPage: 10,
      paginated: false,
      isLoading: false,
      totalCost: 0,
      totalSale: 0,
    }
  },
  computed: {
    warehouseID() {
      return this.$store.state.companies.company_id
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
    async loadAsyncData() {
      this.loading = true
      await this.$axios
        .get(`/stocks`, {
          params: {
            _limit: -1,
            warehouse: this.warehouseID,
          },
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          this.dataTable = response.data.data
          this.totalCost = parseFloat(response.data.totalCost).toFixed(2)
          this.totalSale = parseFloat(response.data.totalSale).toFixed(2)

          if (this.dataTable.length > this.perPage) {
            this.paginated = true
          }

          this.loading = false
        })
        .catch((error) => {
          this.dataTable = []
          this.total = 0
          this.loading = false
          throw error
        })
    },
  },
}
</script>
