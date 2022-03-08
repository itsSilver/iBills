<template>
  <div class="mt-neg" id="home">
    <section class="primary-bg px-4">
      <div class="container c-p">
        <h1 class="main-text">Buy and sell cryptocurrency</h1>
        <p class="first">
          Fast and secure way to purchase or exchange cryptocurrencies
        </p>
        <button class="get-started" @click="$router.push('/login')">
          Get Started
        </button>
      </div>
    </section>
    <home-features />
    <home-join-us />
    <home-contact />
  </div>
</template>

<script>
import HomeContact from '~/components/HomeContact.vue'
import HomeFeatures from '~/components/HomeFeatures.vue'
import HomeJoinUs from '~/components/HomeJoinUs.vue'

export default {
  name: 'Home',
  components: { HomeFeatures, HomeJoinUs, HomeContact },
  middleware: 'guest',
  data() {
    return {}
  },
  head() {
    return {
      title: `Live Blockchain`,
    }
  },
}
</script>
<style scoped>
.main-text {
  font-size: 50px;
  font-weight: 500;
  line-height: 50px;
  color: white;
  width: 330px;
}
.first {
  color: white;
  font-size: 20px;
  line-height: 30px;
  margin: 50px 0;
  width: 40%;
}
.c-p {
  padding: 10% 0;
}
.get-started {
  background-color: white;
  color: #0d6fda;
  font-size: 18px;
  font-weight: 400;
  border-radius: 40px;
  width: 180px;
  height: 50px;
  cursor: pointer;
  border: none;
}
@media (max-width: 767px) {
  .first {
    color: white;
    font-size: 20px;
    line-height: 30px;
    margin: 50px 0;
    width: 100%;
  }
  .main-text {
    font-size: 50px;
    font-weight: 500;
    line-height: 50px;
    color: white;
    width: 100%;
  }
}
</style>
