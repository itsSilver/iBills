<template>
  <div class="container">
    <h2 class="welcome">
      Welcome back
      <span class="uppercase"
        >{{ $auth.user.first_name }} {{ $auth.user.last_name }}</span
      >
    </h2>
    <h4 class="blocket-acc" v-if="$auth.user.isBlocked">
      Your account is currently blocked!
    </h4>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.uppercase {
  text-transform: uppercase;
}
.welcome {
  color: #fff;
  font-size: 28px;
  line-height: 32px;
}
.blocket-acc {
  color: hsl(348, 100%, 61%);
  font-size: 22px;
  margin: 20px 0;
}
</style>
