<template>
  <div>
    <div class="c-header">
      <dashboard-header />
    </div>
    <div class="dashboard-chart">
      <dashboard-chart />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  layout: 'dashboard',
  middleware: 'user',
  data() {
    return {}
  },
  head() {
    return {
      title: `Dashboard — Online Blockchain`,
    }
  },
}
</script>
<style scoped>
.c-header {
  background-color: #3d4dd7;
  padding: 2rem 1rem;
  height: 350px;
}
.dashboard-chart {
  margin-top: -220px;
  padding-bottom: 300px;
}
</style>
