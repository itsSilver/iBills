<template>
  <div class="container pt-c">
    <div class="columns wallet">
      <div class="column">
        <div class="wallet-logo"><wallet-icon /> Wallet</div>
        <h2 class="wallet-header">
          The Easiest and Most Powerful Crypto Wallet
        </h2>
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
      <div class="column">
        <div class="img-wallet">
          <img src="~/assets/img/wallet-control-funds.png" alt="wallet" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WalletIcon from '@/components/Logos/WalletIcon.vue'
export default {
  components: { WalletIcon },
  data() {
    return {
      isOpen: 0,
      collapses: [
        {
          title: 'Buy and Sell Crypto in Minutes',
          text: 'Instantly buy Bitcoin with credit card, debit card, or by linking your bank.',
        },
        {
          title: 'Earn up to 13.5% in rewards',
          text: 'Fund a Rewards Account with crypto and watch it grow.',
        },
        {
          title: 'Control your funds with Private Key Wallet',
          text: 'No one but you can access Private Key Wallets. Not even us.',
        },
        {
          title: 'At home or on the go',
          text: 'Manage your Wallet from a desktop, mobile, or both.',
        },
        {
          title: 'All your crypto in one place',
          text: 'View and manage your balance across the Wallet, the Exchange, and your hardware, all in your wallet dashboard.',
        },
      ],
    }
  },
}
</script>

<style scoped>
.wallet {
  background-color: #f7f5fe;
  padding: 60px 40px;
  border-radius: 12px;
}
.wallet-logo {
  display: flex;
  justify-content: space-evenly;
  max-width: 120px;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  background-color: #efecfe;
  padding: 10px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 25px;
}
.wallet-header {
  font-size: 2rem;
  font-weight: 600;
  line-height: 3.25rem;
  color: #7349f2;
  margin-bottom: 25px;
}
.collapse.card {
  background: transparent !important;
}
.card-header-title {
  color: #7349f2 !important;
}
.card {
  color: #7349f2 !important;
}
.img-wallet {
  max-width: 420px;
  margin: auto;
}
</style>
