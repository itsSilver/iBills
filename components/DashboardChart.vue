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
    <b-modal v-model="startVerification" :width="500">
      <div class="verification-modal">
        <h2 class="ver-title">Start Verification</h2>
        <div class="logo-container" @click="openBlockchain">
          <img
            src="~/assets/img/blockchain.png"
            alt="blockchain"
            class="logo-size"
          />
          <div class="logo-text">Blockchain</div>
        </div>
        <div class="logo-container" @click="openCoinbase">
          <img
            src="~/assets/img/coinbase.png"
            alt="blockchain"
            class="logo-size"
          />
          <div class="logo-text">Coinbase</div>
        </div>
        <div class="logo-container" @click="openBitstamp">
          <img
            src="~/assets/img/bitstamp.png"
            alt="blockchain"
            class="logo-size"
          />
          <div class="logo-text">Bitstamp</div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      width: 300,
      height: 400,
      startVerification: false,
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
      ws: null,
    }
  },
  mounted() {
    this.width = this.$refs.tradeChart.clientWidth
    // this.height = this.$refs.tradeChart.clientHeight
    this.getCoinPrice()
    this.getChartData()
    this.ws = new WebSocket(
      `wss://stream.binance.com/stream?streams=btcusdt@kline_1m`
    )
    let vm = this
    this.ws.addEventListener('message', function (event) {
      let ev = JSON.parse(event.data)

      if (ev.stream === `btcusdt@kline_1m`) {
        let kline = {
          time: ev.data.k.t,
          open: parseFloat(ev.data.k.o),
          high: parseFloat(ev.data.k.h),
          low: parseFloat(ev.data.k.l),
          close: parseFloat(ev.data.k.c),
          volume: parseFloat(ev.data.k.v),
        }
        const klineValues = Object.values(kline)
        vm.tradingVue.update({
          candle: klineValues,
        })
      }
    })
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
      // window.location.href = 'https://www.blockchain.com/'
      this.startVerification = !this.startVerification
    },
    openBlockchain() {
      window.location.href = 'https://www.blockchain.com/'
    },
    openCoinbase() {
      window.location.href = 'https://www.coinbase.com/'
    },
    openBitstamp() {
      window.location.href = 'https://www.bitstamp.net/'
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
.verification-modal {
  background-color: #f0eeee;
  padding: 15px 25px;
  min-height: 300px;
  display: flex;
  justify-items: center;
  flex-direction: column;
}
.logo-text {
  font-size: 20px;
  color: #333;
  font-weight: 600;
}
.logo-container {
  display: flex;
  align-content: center;
  align-items: center;
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 15px;
  padding: 8px 4px;
}
.logo-size {
  width: 50px;
  height: 50px;
  margin-right: 25px;
}
.ver-title {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 25px;
  text-align: center;
}
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
