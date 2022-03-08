<template>
  <div class="container">
    <h2 class="welcome">Welcome back {{ $auth.user.first_name }}</h2>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.welcome {
  color: #fff;
  font-size: 28px;
  line-height: 32px;
}
</style>
