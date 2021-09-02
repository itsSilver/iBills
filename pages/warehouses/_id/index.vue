<template>
  <div>
    <hero-bar>
      {{ warehouse.name }}
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
            :title="$t('warehouse.warehouse-data')"
            icon="archive"
          >
            <!-- <warehouse-table :warehouse="warehouse" /> -->
          </card-component>
        </div>
        <div class="column is-one-quarter">
          <card-component
            class="has-table has-mobile-sort-spaced"
            :title="$t('warehouse.warehouse-data')"
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
import WarehouseTable from '~/components/Content/Warehouse/WarehouseTable.vue'
export default {
  head() {
    return {
      title: `${this.warehouse.name} — ${this.$t('messages.title')}`,
    }
  },
  components: {
    HeroBar,
    CardComponent,
    WarehouseTable,
  },
  data() {
    return {
      loading: false,
      isLoading: false,
    }
  },
  async asyncData({ store, $axios, $auth, params }) {
    let response = await $axios.get(`/warehouses/${params.id}`, {
      headers: {
        Authorization: `Bearer ${$auth.strategy.token.get()}`,
        'Content-Type': 'application/json',
      },
    })

    let warehouse = response.data
    // let nodes = warehouse.warehouse_nodes

    return { warehouse }
  },
}
</script>

<style>
</style>