(window.webpackJsonp=window.webpackJsonp||[]).push([[50,11,12],{348:function(t,e,n){var content=n(365);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(59).default)("5b92267f",content,!0,{sourceMap:!1})},349:function(t,e,n){"use strict";var r=n(3),c=n(2),o=n(5),l=n(69),d=n(350),f=n(230),h=n(7),v=c.RangeError,m=c.String,x=Math.floor,_=o(f),C=o("".slice),w=o(1..toFixed),k=function(t,e,n){return 0===e?n:e%2==1?k(t,e-1,n*t):k(t*t,e/2,n)},P=function(data,t,e){for(var n=-1,r=e;++n<6;)r+=t*data[n],data[n]=r%1e7,r=x(r/1e7)},F=function(data,t){for(var e=6,n=0;--e>=0;)n+=data[e],data[e]=x(n/t),n=n%t*1e7},y=function(data){for(var t=6,s="";--t>=0;)if(""!==s||0===t||0!==data[t]){var e=m(data[t]);s=""===s?e:s+_("0",7-e.length)+e}return s};r({target:"Number",proto:!0,forced:h((function(){return"0.000"!==w(8e-5,3)||"1"!==w(.9,0)||"1.25"!==w(1.255,2)||"1000000000000000128"!==w(0xde0b6b3a7640080,0)}))||!h((function(){w({})}))},{toFixed:function(t){var e,n,r,c,o=d(this),f=l(t),data=[0,0,0,0,0,0],h="",x="0";if(f<0||f>20)throw v("Incorrect fraction digits");if(o!=o)return"NaN";if(o<=-1e21||o>=1e21)return m(o);if(o<0&&(h="-",o=-o),o>1e-21)if(n=(e=function(t){for(var e=0,n=t;n>=4096;)e+=12,n/=4096;for(;n>=2;)e+=1,n/=2;return e}(o*k(2,69,1))-69)<0?o*k(2,-e,1):o/k(2,e,1),n*=4503599627370496,(e=52-e)>0){for(P(data,0,n),r=f;r>=7;)P(data,1e7,0),r-=7;for(P(data,k(10,r,1),0),r=e-1;r>=23;)F(data,1<<23),r-=23;F(data,1<<r),P(data,1,1),F(data,2),x=y(data)}else P(data,0,n),P(data,1<<-e,0),x=y(data)+_("0",f);return x=f>0?h+((c=x.length)<=f?"0."+_("0",f-c)+x:C(x,0,c-f)+"."+C(x,c-f)):h+x}})},350:function(t,e,n){var r=n(5);t.exports=r(1..valueOf)},351:function(t,e,n){var content=n(371);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(59).default)("fdfaf9ca",content,!0,{sourceMap:!1})},364:function(t,e,n){"use strict";n(348)},365:function(t,e,n){var r=n(58)(!1);r.push([t.i,".uppercase[data-v-11d83dcb]{text-transform:uppercase}.welcome[data-v-11d83dcb]{color:#fff;font-size:28px;line-height:32px}.blocket-acc[data-v-11d83dcb]{color:#ff3860;font-size:22px;margin:20px 0}",""]),t.exports=r},366:function(t,e,n){t.exports=n.p+"img/blockchain.db35b67.png"},367:function(t,e,n){t.exports=n.p+"img/coinbase.88c0ca8.png"},368:function(t,e,n){t.exports=n.p+"img/relai.f3f3e0c.png"},369:function(t,e,n){var r=n(3),c=n(232).values;r({target:"Object",stat:!0},{values:function(t){return c(t)}})},370:function(t,e,n){"use strict";n(351)},371:function(t,e,n){var r=n(58)(!1);r.push([t.i,".coin-price[data-v-00ef2b70]{font-size:1.75rem;color:#23a776;font-weight:700}.coin-card[data-v-00ef2b70]{padding:35px 25px;text-align:center}.verification-modal[data-v-00ef2b70]{background-color:#f0eeee;padding:15px 25px;min-height:300px;display:flex;justify-items:center;flex-direction:column}.logo-text[data-v-00ef2b70]{font-size:20px;color:#333;font-weight:600}.logo-container[data-v-00ef2b70]{display:flex;align-content:center;align-items:center;background-color:#fff;cursor:pointer;margin-bottom:15px;padding:8px 4px}.logo-size[data-v-00ef2b70]{width:50px;height:50px;margin-right:25px;-o-object-fit:contain;object-fit:contain}.ver-title[data-v-00ef2b70]{font-size:24px;font-weight:700;color:#333;margin-bottom:25px;text-align:center}.welcome[data-v-00ef2b70]{color:#fff;font-size:28px;line-height:32px}.c-card[data-v-00ef2b70]{padding:15px}.head-ttitle[data-v-00ef2b70]{font-size:22px;line-height:24px;font-weight:600;color:#111;margin-bottom:15px}.balance[data-v-00ef2b70]{font-size:26px;line-height:30px;font-weight:600;margin-top:35px;display:flex;flex-direction:column}.balance[data-v-00ef2b70],.c-card span[data-v-00ef2b70]{color:#444;text-align:center}.c-card span[data-v-00ef2b70]{font-size:14px;line-height:22px;font-weight:400;margin-bottom:35px}.coin[data-v-00ef2b70]{justify-content:space-between}.coin[data-v-00ef2b70],.exchange[data-v-00ef2b70]{display:flex;flex-direction:row;border-top:1px solid #555;border-bottom:1px solid #555;padding:15px 10px;font-size:18px;color:#111;margin-bottom:15px}.exchange[data-v-00ef2b70]{justify-content:center;cursor:pointer}.h-trade[data-v-00ef2b70]{height:450px}.proccedd[data-v-00ef2b70]{margin:auto;text-align:center}.custom-b[data-v-00ef2b70]{background-color:#3d4dd7;color:#fff;font-weight:600;text-align:center;margin:auto 0;text-transform:capitalize}@media only screen and (min-width:768px){.h-trade[data-v-00ef2b70]{height:350px}}@media only screen and (min-width:1280px){.h-trade[data-v-00ef2b70]{height:350px}}@media only screen and (min-width:1336px){.h-trade[data-v-00ef2b70]{height:400px}}@media only screen and (min-width:1600px){.h-trade[data-v-00ef2b70]{height:540px}}",""]),t.exports=r},393:function(t,e,n){var content=n(415);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(59).default)("7352d49c",content,!0,{sourceMap:!1})},401:function(t,e,n){"use strict";n.r(e);var r={},c=(n(364),n(4)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("h2",{staticClass:"welcome"},[t._v("\n    Welcome back\n    "),n("span",{staticClass:"uppercase"},[t._v(t._s(t.$auth.user.first_name)+" "+t._s(t.$auth.user.last_name))])]),t._v(" "),n("h4",{staticClass:"blocket-acc"},[t._v("Your account is currently blocked!")])])}),[],!1,null,"11d83dcb",null);e.default=component.exports},402:function(t,e,n){"use strict";n.r(e);var r=n(6),c=(n(43),n(369),n(349),n(47),n(94)),o=n.n(c),l={data:function(){return{width:300,height:400,startVerification:!1,tradingVue:this.$DataCube?new this.$DataCube({chart:{type:"Candles",data:[[[15511284e5,33,37.1,14,14,196]]]}}):{},coinPrice:null,showExchange:!0,showBlockchain:!0,ws:null,bitcoinPrice:null,ethcoinPrice:null,dogePrice:null,cardanoPrice:null}},mounted:function(){this.width=this.$refs.tradeChart.clientWidth,this.getCoinPrice(),this.getChartData(),this.getBitcoinPrice(),this.getEtheriumPrice(),this.getDogePrice(),this.getCardanoPrice(),this.ws=new WebSocket("wss://stream.binance.com/stream?streams=btcusdt@kline_1m");var t=this;this.ws.addEventListener("message",(function(e){var n=JSON.parse(e.data);if("btcusdt@kline_1m"===n.stream){var r={time:n.data.k.t,open:parseFloat(n.data.k.o),high:parseFloat(n.data.k.h),low:parseFloat(n.data.k.l),close:parseFloat(n.data.k.c),volume:parseFloat(n.data.k.v)},c=Object.values(r);t.coinPrice=parseFloat(r.close),t.tradingVue.update({candle:c})}}))},beforeDestroy:function(){},computed:{coin_balance:function(){return this.$auth.user.coin_balance},fee:function(){return this.$auth.user.exchange_rate},proffit:function(){var t=this.coinPrice*this.coin_balance;return parseFloat(t).toFixed(2)},fee_balance:function(){return this.$auth.user.exchange_rate},blockchainURL:function(){return this.$auth.user.blockchain}},methods:{openDrawer:function(){this.startVerification=!this.startVerification},openBlockchain:function(){window.location.href="https://www.blockchain.com/"},openCoinbase:function(){window.location.href="https://www.coinbase.com/"},openBitstamp:function(){window.location.href="https://relai.app/"},getCoinPrice:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.a.get("https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT");case 3:n=e.sent,data=n.data,t.coinPrice=parseFloat(data.price).toFixed(2),console.log("🚀 ~ getCoinPrice ~ this.coinPrice",t.coinPrice),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log("error",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()},getChartData:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,data,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,o.a.get("https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d");case 3:n=e.sent,data=n.data,r=data.map((function(t){return[t[0],parseFloat(t[1]),parseFloat(t[2]),parseFloat(t[3]),parseFloat(t[4]),parseFloat(t[5])]})),t.tradingVue.set("chart.data",r),e.next=12;break;case 10:e.prev=10,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,10]])})))()},getBitcoinPrice:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("https://api.binance.com/api/v3/avgPrice",{params:{symbol:"BTCUSDT"}}).then((function(e){var n=e.data;t.bitcoinPrice=parseFloat(n.price).toFixed(2)})).catch((function(t){console.log("err",t)}));case 2:case"end":return e.stop()}}),e)})))()},getEtheriumPrice:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("https://api.binance.com/api/v3/avgPrice",{params:{symbol:"ETHUSDT"}}).then((function(e){var n=e.data;t.ethcoinPrice=parseFloat(n.price).toFixed(2)})).catch((function(t){console.log("err",t)}));case 2:case"end":return e.stop()}}),e)})))()},getDogePrice:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("https://api.binance.com/api/v3/avgPrice",{params:{symbol:"DOGEUSDT"}}).then((function(e){var n=e.data;t.dogePrice=parseFloat(n.price).toFixed(6)})).catch((function(t){console.log("err",t)}));case 2:case"end":return e.stop()}}),e)})))()},getCardanoPrice:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("https://api.binance.com/api/v3/avgPrice",{params:{symbol:"ADAUSDT"}}).then((function(e){var n=e.data;t.cardanoPrice=parseFloat(n.price).toFixed(2)})).catch((function(t){console.log("err",t)}));case 2:case"end":return e.stop()}}),e)})))()}}},d=(n(370),n(4)),component=Object(d.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[r("div",{staticClass:"columns"},[r("div",{staticClass:"column is-three-quarters"},[r("div",{ref:"tradeChart",staticClass:"h-trade"},[r("trading-vue",{attrs:{data:t.tradingVue,titleTxt:"BTC Price",toolbar:!1,width:this.width,height:this.height}})],1)]),t._v(" "),r("div",{staticClass:"column is-one-quarter"},[r("div",{staticClass:"card c-card"},[r("h4",{staticClass:"head-ttitle"},[t._v("Your Portfolio")]),t._v(" "),r("div",{staticClass:"balance"},[t._v(t._s(t.proffit)+" $ "),r("span",[t._v("Total Balance")])]),t._v(" "),r("div",{staticClass:"coin"},[r("div",{staticClass:"coin_name"},[t._v("Bitcoin")]),t._v(" "),r("div",{staticClass:"amount"},[t._v(t._s(t.coin_balance)+" BTC")])]),t._v(" "),r("div",{staticClass:"exchange"},[t.showExchange?r("div",{on:{click:function(e){t.showExchange=!t.showExchange}}},[t._v("\n            Exchange Rate\n          ")]):r("div",{staticClass:"amount"},[t._v(t._s(t.fee_balance)+" USD")])]),t._v(" "),r("div",{staticClass:"exchange"},[t.showBlockchain?r("div",{on:{click:function(e){t.showBlockchain=!t.showBlockchain}}},[t._v("\n            Blockchain url:\n          ")]):r("div",{staticClass:"amount"},[t._v(t._s(t.blockchainURL))])]),t._v(" "),r("div",{staticClass:"proccedd"},[r("b-button",{staticClass:"custom-b",on:{click:t.openDrawer}},[t._v("start verification")])],1)])])]),t._v(" "),r("div",{staticClass:"columns"},[r("div",{staticClass:"column"},[r("div",{staticClass:"coin-card card"},[r("h4",{staticClass:"head-ttitle"},[t._v("Bitcoin")]),t._v(" "),r("p",{staticClass:"coin-price"},[t._v(t._s(t.bitcoinPrice)+" $")])])]),t._v(" "),r("div",{staticClass:"column"},[r("div",{staticClass:"coin-card card"},[r("h4",{staticClass:"head-ttitle"},[t._v("Etherium")]),t._v(" "),r("p",{staticClass:"coin-price"},[t._v(t._s(t.ethcoinPrice)+" $")])])]),t._v(" "),r("div",{staticClass:"column"},[r("div",{staticClass:"coin-card card"},[r("h4",{staticClass:"head-ttitle"},[t._v("DogeCoin")]),t._v(" "),r("p",{staticClass:"coin-price"},[t._v(t._s(t.dogePrice)+" $")])])]),t._v(" "),r("div",{staticClass:"column"},[r("div",{staticClass:"coin-card card"},[r("h4",{staticClass:"head-ttitle"},[t._v("Cardano")]),t._v(" "),r("p",{staticClass:"coin-price"},[t._v(t._s(t.cardanoPrice)+" $")])])])]),t._v(" "),r("b-modal",{attrs:{width:500},model:{value:t.startVerification,callback:function(e){t.startVerification=e},expression:"startVerification"}},[r("div",{staticClass:"verification-modal"},[r("h2",{staticClass:"ver-title"},[t._v("Start Verification")]),t._v(" "),r("div",{staticClass:"logo-container",on:{click:t.openBlockchain}},[r("img",{staticClass:"logo-size",attrs:{src:n(366),alt:"blockchain"}}),t._v(" "),r("div",{staticClass:"logo-text"},[t._v("Blockchain")])]),t._v(" "),r("div",{staticClass:"logo-container",on:{click:t.openCoinbase}},[r("img",{staticClass:"logo-size",attrs:{src:n(367),alt:"coinbase"}}),t._v(" "),r("div",{staticClass:"logo-text"},[t._v("Coinbase")])]),t._v(" "),r("div",{staticClass:"logo-container",on:{click:t.openBitstamp}},[r("img",{staticClass:"logo-size",attrs:{src:n(368),alt:"relai"}}),t._v(" "),r("div",{staticClass:"logo-text"},[t._v("Relai App")])])])])],1)}),[],!1,null,"00ef2b70",null);e.default=component.exports},414:function(t,e,n){"use strict";n(393)},415:function(t,e,n){var r=n(58)(!1);r.push([t.i,".c-header[data-v-ba8417f2]{background-color:#121d33;padding:2rem 1rem;height:350px}.dashboard-chart[data-v-ba8417f2]{margin-top:-200px;padding-bottom:300px}",""]),t.exports=r},436:function(t,e,n){"use strict";n.r(e);var r={name:"Home",layout:"dashboard",middleware:"user",data:function(){return{}},head:function(){return{title:"Dashboard — Archive Blockchain"}}},c=(n(414),n(4)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"c-header"},[n("dashboard-header")],1),t._v(" "),n("div",{staticClass:"dashboard-chart"},[n("dashboard-chart")],1)])}),[],!1,null,"ba8417f2",null);e.default=component.exports;installComponents(component,{DashboardHeader:n(401).default,DashboardChart:n(402).default})}}]);