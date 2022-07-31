<template>
  <div class="container pt-c">
    <div class="columns wallet">
      <div class="column">
        <div class="img-wallet">
          <img src="~/assets/img/exchange.png" alt="exchange" />
        </div>
      </div>
      <div class="column">
        <div class="wallet-logo"><exchange-logo /> Exchange</div>
        <h2 class="wallet-header">Lightning-Fast Crypto Trading</h2>
        <b-collapse
          class="card"
          animation="slide"
          v-for="(collapse, index) of collapses"
          :key="index"
          :open="isOpen == index"
          @open="isOpen = index"
          :aria-id="'contentIdForA11y5-' + index"
        >
          <template #trigger="props">
            <div
              class="card-header"
              role="button"
              :aria-controls="'contentIdForA11y5-' + index"
              :aria-expanded="props.open"
            >
              <p class="card-header-title">
                {{ collapse.title }}
              </p>
            </div>
          </template>
          <div class="card-content">
            <div class="content">
              {{ collapse.text }}
            </div>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import ExchangeLogo from '@/components/Logos/ExchangeLogo.vue'
export default {
  components: { ExchangeLogo },
  data() {
    return {
      isOpen: 0,
      collapses: [
        {
          title: 'Trade in 3 fiat currencies',
          text: 'The Exchange supports USD, EUR, and GBP.',
        },
        {
          title: 'A matching engine that can keep up with you',
          text: 'The world’s fastest crypto matching engine, built by and for traders.',
        },
        {
          title: '24/7 live chat support',
          text: 'Chat with customer support directly in the Exchange, anytime.',
        },
        {
          title: 'Margin Trading',
          text: 'More buying power means up to 5x the profit.',
        },
      ],
    }
  },
}
</script>

<style scoped>
.wallet {
  background-color: #f5fafe;
  padding: 60px 40px;
  border-radius: 12px;
}
.wallet-logo {
  display: flex;
  justify-content: space-evenly;
  max-width: 150px;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  background-color: #ecf5fe;
  padding: 10px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 25px;
}
.wallet-header {
  font-size: 2rem;
  font-weight: 600;
  line-height: 3.25rem;
  color: #0052ff;
  margin-bottom: 25px;
}
.collapse.card {
  background: transparent !important;
}
.card-header-title {
  color: #0052ff !important;
}
.card {
  color: #0052ff !important;
}
.img-wallet {
  max-width: 420px;
  margin: auto;
}
</style>
