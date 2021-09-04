<template>
  <b-field>
    <b-select
      :placeholder="$t('nav.warehouses')"
      icon="home-city"
      v-model="company_id"
      expanded
      @input="saveNewCompany(company_id)"
    >
      <option
        v-for="option in companies"
        :value="option.id"
        :key="option.id"
        :tag="option.name"
      >
        {{ option.name }}
      </option>
    </b-select>
  </b-field>
</template>

<script>
export default {
  data() {
    return {
      company_id: null,
    }
  },
  mounted() {
    this.getCompanies().then(() => {
      this.getCompany()
    })
  },
  computed: {
    companies() {
      return this.$store.state.companies.companies
    },
  },
  methods: {
    async getCompanies() {
      const token = this.$auth.strategy.token.get()
      await this.$store.dispatch('companies/getCompanies', token)
    },
    async getCompany() {
      const token = this.$auth.strategy.token.get()
      await this.$axios
        .get('/settings', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          const data = response.data
          this.$store.commit('companies/SET_COMPANY_ID', data)
          this.$store.commit('SET_CURRENCY', data.currency.code)
          this.company_id = response.data.company_id
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    async saveNewCompany(val) {
      console.log('val', val)
      const dadas = parseInt(val)
      await this.$store.dispatch('companies/saveCompanyId', dadas).then(() => {
        location.reload()
      })
    },
  },
}
</script>

<style>
</style>