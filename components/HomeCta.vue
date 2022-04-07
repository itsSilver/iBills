<template>
  <section class="cta">
    <div class="cta-text">From zero to crypto in minutes</div>
    <button class="get-started" @click="$router.push('/login')">
      Get Started
    </button>
  </section>
</template>

<style scoped>
.cta {
  background-color: rgb(18, 29, 51);
  background-image: url('~assets/img/banner-bg.svg');
  background-repeat: no-repeat;
  background-size: 90rem;
  background-position: -0.0625rem center;
  color: rgb(255, 255, 255);
  padding: 80px 0px;
  display: flex;
  justify-content: center;
}
.cta-text {
  font-size: 42px;
  font-weight: 600;
  line-height: 50px;
  display: flex;
  justify-content: center;
}
.get-started {
  background-color: white;
  color: #121d33;
  font-size: 18px;
  font-weight: 600;
  border-radius: 40px;
  width: 180px;
  height: 50px;
  cursor: pointer;
  border: none;
  margin-left: 20px;
}
@media (max-width: 767px) {
  .cta {
    display: block;
    text-align: center;
  }
  .cta-text[data-v-1e530ca6] {
    text-align: center;
    margin-bottom: 25px;
  }
  .get-started {
    margin-left: 0px;
  }
}
</style>
