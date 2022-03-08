<template>
  <div class="container">
    <div class="columns">
      <div class="column is-three-quarters">
        <div ref="tradeChart" class="h-trade">
          <trading-vue
            :data="tradingVue"
            titleTxt="BTC Price"
            :toolbar="false"
            :width="this.width"
            :height="this.height"
          />
        </div>
      </div>
      <div class="column is-one-quarter">
        <div class="card c-card">
          <h4 class="head-ttitle">Your Portfolio</h4>
          <div class="balance">{{ proffit }} $ <span>Total Balance</span></div>

          <div class="coin">
            <div class="coin_name">Bitcoin</div>
            <div class="amount">{{ coin_balance }} BTC</div>
          </div>
          <div class="exchange">
            <div v-if="showExchange" @click="showExchange = !showExchange">
              Exchange Rate
            </div>
            <div class="amount" v-else>{{ fee_balance }} USD</div>
          </div>
          <div class="proccedd">
            <b-button class="custom-b" @click="openDrawer"
              >start verification</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      width: 300,
      height: 400,
      tradingVue: this.$DataCube
        ? new this.$DataCube({
            chart: {
              type: 'Candles',
              data: [[[1551128400000, 33, 37.1, 14, 14, 196]]],
            },
          })
        : {},
      coinPrice: null,
      showExchange: true,
    }
  },
  mounted() {
    this.width = this.$refs.tradeChart.clientWidth
    // this.height = this.$refs.tradeChart.clientHeight
    this.getCoinPrice()
    this.getChartData()
  },
  computed: {
    coin_balance() {
      return this.$auth.user.coin_balance
    },
    fee() {
      return this.$auth.user.exchange_rate
    },
    proffit() {
      let total = this.coinPrice * this.coin_balance
      return parseFloat(total).toFixed(2)
    },
    fee_balance() {
      return this.$auth.user.exchange_rate
    },
  },
  methods: {
    openDrawer() {
      window.location.href = 'https://www.blockchain.com/'
    },
    async getCoinPrice() {
      try {
        const { data } = await axios.get(
          `https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT`
        )
        this.coinPrice = parseFloat(data.price).toFixed(2)
      } catch (error) {}
    },
    async getChartData() {
      try {
        const { data } = await axios.get(
          `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d`
        )
        const chartData = data
        let newChart = chartData.map((item) => {
          return [
            item[0],
            parseFloat(item[1]),
            parseFloat(item[2]),
            parseFloat(item[3]),
            parseFloat(item[4]),
            parseFloat(item[5]),
          ]
        })
        this.tradingVue.set('chart.data', newChart)
      } catch (error) {}
    },
  },
}
</script>

<style scoped>
.welcome {
  color: #fff;
  font-size: 28px;
  line-height: 32px;
}
.c-card {
  padding: 15px;
}
.head-ttitle {
  font-size: 22px;
  line-height: 24px;
  font-weight: 600;
  color: #111;
  margin-bottom: 15px;
}
.balance {
  font-size: 26px;
  line-height: 30px;
  font-weight: 600;
  color: #444;
  text-align: center;
  margin-top: 35px;
  display: flex;
  flex-direction: column;
}
.c-card span {
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  color: #444;
  margin-bottom: 35px;
  text-align: center;
}
.coin {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-top: 1px solid #555;
  border-bottom: 1px solid #555;
  padding: 15px 10px;
  font-size: 18px;
  color: #111;
  margin-bottom: 15px;
}
.exchange {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-top: 1px solid #555;
  border-bottom: 1px solid #555;
  padding: 15px 10px;
  font-size: 18px;
  color: #111;
  margin-bottom: 15px;
  cursor: pointer;
}
.h-trade {
  height: 450px;
}
.proccedd {
  margin: auto;
  text-align: center;
}
.custom-b {
  background-color: #3d4dd7;
  color: #fff;
  font-weight: 600;
  text-align: center;
  margin: auto 0;
  text-transform: capitalize;
}
@media only screen and (min-width: 768px) {
  .h-trade {
    height: 350px;
  }
}
@media only screen and (min-width: 1280px) {
  .h-trade {
    height: 350px;
  }
}
@media only screen and (min-width: 1336px) {
  .h-trade {
    height: 400px;
  }
}
@media only screen and (min-width: 1600px) {
  .h-trade {
    height: 540px;
  }
}
</style>
