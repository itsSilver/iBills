<template>
  <div class="container">
    <div class="cards columns is-fullheight">
      <div class="column">
        <div class="card" @click="$router.push('/admin/users')">Users</div>
      </div>
      <div class="column">
        <div class="card" @click="$router.push('/admin/leads')">Leads</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'admin',
}
</script>

<style scoped>
.cards {
  display: flex;
  justify-content: space-evenly;
  justify-items: center;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
}
.card {
  padding: 3rem;
  background-color: #3d4dd7 !important;
  color: #fff !important;
  font-weight: 600 !important;
  cursor: pointer;
}
.column {
  flex-grow: 0 !important;
}
@media (max-width: 767px) {
  .cards {
    flex-direction: column;
    justify-content: center;
  }
}
</style>
