<template>
  <div>
    <hero-bar :has-right-visible="false"> Dashboard </hero-bar>
    <section class="section is-main-section is-fullheight">
      <tiles>
        <card-widget
          class="tile is-child"
          type="is-primary"
          icon="home-city"
          :number="nrCompany"
          :label="$t('nav.warehouses')"
          toLink="warehouses"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="cart-outline"
          :number="7770"
          prefix="$"
          label="Sales"
        />
        <card-widget
          class="tile is-child"
          type="is-success"
          icon="chart-timeline-variant"
          :number="256"
          suffix="%"
          label="Performance"
        />
      </tiles>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
export default {
  name: 'Home',
  components: {
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
  },
  data() {
    return {}
  },
  head() {
    return {
      title: `Dashboard — iMagazine, POS & Inventory System`,
    }
  },
  async asyncData({ store, $axios, $auth }) {
    let response = await $axios.get(`/warehouses/count`, {
      headers: {
        Authorization: `Bearer ${$auth.strategy.token.get()}`,
        'Content-Type': 'application/json',
      },
    })

    let nrCompany = response.data

    return { nrCompany }
  },
}
</script>
