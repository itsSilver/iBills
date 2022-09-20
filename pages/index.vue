<template>
  <div class="mt-neg" id="home">
    <section class="px-4 bc-bg">
      <div class="container c-p">
        <h1 class="main-text">
          The world’s most popular way to buy, sell, and trade crypto
        </h1>
        <p class="first">
          Fast and secure way to purchase or exchange cryptocurrencies
        </p>
        <button class="get-started" @click="$router.push('/login')">
          Get Started
        </button>
      </div>
    </section>
    <home-features />
    <!-- <home-join-us /> -->
    <home-services />
    <home-exchange />
    <home-cta />
    <home-contact />
  </div>
</template>

<script>
import HomeContact from '~/components/HomeContact.vue'
import HomeCta from '~/components/HomeCta.vue'
import HomeFeatures from '~/components/HomeFeatures.vue'
import HomeServices from '~/components/HomeServices.vue'
import HomeExchange from '~/components/HomeExchange.vue'

export default {
  name: 'Home',
  components: {
    HomeFeatures,
    HomeContact,
    HomeCta,
    HomeServices,
    HomeExchange,
  },
  middleware: 'guest',
  data() {
    return {}
  },
  head() {
    return {
      title: `Bitcoin Block`,
    }
  },
}
</script>
<style scoped>
.main-text {
  font-size: 60px;
  font-weight: 600;
  line-height: 65px;
  color: #333;
  max-width: 600px;
  width: 100%;
  text-align: center;
}
.first {
  color: #666;
  font-size: 20px;
  line-height: 30px;
  margin: 50px 0;
  width: 40%;
  text-align: center;
}
.c-p {
  padding: 12% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}
.get-started {
  background-color: #ff9500;
  color: #121d33;
  font-size: 18px;
  font-weight: 600;
  border-radius: 40px;
  width: 180px;
  height: 50px;
  cursor: pointer;
  border: none;
  text-align: center;
}
@media (max-width: 767px) {
  .first {
    font-size: 20px;
    line-height: 30px;
    margin: 50px 0;
    width: 100%;
  }
  .main-text {
    font-size: 50px;
    font-weight: 500;
    line-height: 50px;
    width: 100%;
  }
}
</style>
