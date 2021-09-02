<template>
  <div>
    <hero-bar>
      {{ $t('nav.alarms') }}
      <div slot="right">
        <nuxt-link to="/" class="button is-small">
          {{ $t('nav.dashboard') }}
        </nuxt-link>
      </div>
    </hero-bar>
    <section class="section is-main-section is-fullheight">
      <div class="columns" style="flex-wrap: wrap">
        <div class="column">
          <div class="card">
            <client-only>
              <b-tabs destroy-on-hide>
                <b-tab-item
                  :label="$t('alarms.expire-products')"
                  icon="alarm-light"
                >
                  <alarm-expire
                    @total-cost="updateTotalCost"
                    @total-sale="updateTotalSale"
                  />
                </b-tab-item>
                <b-tab-item
                  :label="$t('table.nostock-products')"
                  icon="speedometer-slow"
                >
                  <alarm-low-stock />
                </b-tab-item>
              </b-tabs>
            </client-only>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import AlarmExpire from '~/components/Content/Alarms/AlarmExpire.vue'
import AlarmLowStock from '~/components/Content/Alarms/AlarmLowStock.vue'

export default {
  name: 'Alarms',
  head() {
    return {
      title: `${this.$t('nav.alarms')} — ${this.$t('messages.title')}`,
    }
  },
  components: {
    HeroBar,
    CardComponent,
    AlarmExpire,
    AlarmLowStock,
  },
  data() {
    return {
      dataTable: [],
      totalCost: 0,
      totalSale: 0,
    }
  },
  computed: {
    currency() {
      return this.$store.state.currency
    },
  },
  methods: {
    updateTotalCost(val) {
      this.totalCost = parseFloat(val).toFixed(2)
    },
    updateTotalSale(val) {
      this.totalSale = parseFloat(val).toFixed(2)
    },
  },
}
</script>

<style>
</style>