<template>
  <div class="container pt-c" id="join">
    <div class="header">Join Us</div>
    <div class="line"><div class="inside"></div></div>
    <h2 class="secondary">Create your cryptocurrency portfolio today</h2>
    <p class="third">
      Archive Blockchain has a variety of features that make it the best place
      to start trading
    </p>
    <div class="columns mx-auto pt-4">
      <div class="column is-one-third">
        <div class="card card-list columns">
          <div class="column is-one-quarter col-icon">
            <span class="mdi mdi-poll"></span>
          </div>
          <div class="column is-three-quarters">
            <div class="header">Manage your portfolio</div>
            <p>
              Buy and sell popular digital currencies, keep track of them in the
              one place.
            </p>
          </div>
        </div>
        <div class="card card-list columns">
          <div class="column is-one-quarter col-icon">
            <span class="mdi mdi-briefcase"></span>
          </div>
          <div class="column is-three-quarters">
            <div class="header">Recurring buys</div>
            <p>
              Invest in cryptocurrency slowly over time by scheduling buys
              daily, weekly, or monthly.
            </p>
          </div>
        </div>
        <div class="card card-list columns">
          <div class="column is-one-quarter col-icon">
            <span class="mdi mdi-lock"></span>
          </div>
          <div class="column is-three-quarters">
            <div class="header">Vault protection</div>
            <p>
              For added security, store your funds in a vault with time delayed
              withdrawals.
            </p>
          </div>
        </div>
      </div>
      <div class="column is-two-thirds">
        <img src="~/assets/img/chart.png" alt="chart" />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.header {
  color: #121d33;
  text-align: center;
  font-size: 25px;
  line-height: 100%;
  padding: 10px;
  padding-bottom: 15px;
}
.line {
  height: 1px;
  width: 90px;
  background-color: #004b93;
  text-align: center;
  margin: auto;
}
.secondary {
  text-align: center;
  font-weight: 500;
  font-size: 30px;
  color: #004b93;
}
.third {
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  color: #004b93;
}
.mx-auto {
  margin: auto 0;
}
.custom-card {
  text-align: center;
  padding: 40px 15px;
}
.custom-card span {
  font-size: 40px;
}
.card-list {
  justify-content: center;
  align-items: center;
  align-content: center;
}
.card-list span {
  font-size: 40px;
}
.card-list .col-icon {
  justify-content: center;
  margin: 0 auto;
  text-align: center;
}
</style>
