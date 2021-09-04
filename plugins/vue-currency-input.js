import Vue from 'vue'
import VueCurrencyInput from 'vue-currency-input'
const pluginOptions = {
  /* see config reference */
  globalOptions: { locale: 'de' },
}
Vue.use(VueCurrencyInput, pluginOptions)
