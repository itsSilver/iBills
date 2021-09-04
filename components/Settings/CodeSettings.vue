<template>
  <form @submit.prevent="saveCompany">
    <div class="columns">
      <div class="column">
        <b-field :label="$t('table.currency')">
          <client-only>
            <b-select
              v-model="settingsData.currency"
              size="is-small"
              expanded
              v-if="settingsData.currency"
              :loading="currencyLoaded"
            >
              <option
                v-for="option in currencies"
                :value="option"
                :key="option.id"
              >
                {{ option.name }}
              </option>
            </b-select>
          </client-only>
        </b-field>
      </div>
      <div class="column">
        <b-field :label="$t('table.email')">
          <b-input
            v-model="settingsData.email"
            type="email"
            name="email"
            size="is-small"
          />
        </b-field>
      </div>
      <div class="column">
        <b-field :label="$t('table.phone')">
          <b-input
            v-model="settingsData.phone"
            type="number"
            name="phone"
            size="is-small"
          />
        </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-field :label="$t('table.code')">
          <b-input v-model="settingsData.code" name="code" size="is-small" />
        </b-field>
      </div>
      <div class="column">
        <b-field :label="$t('table.fiscal')">
          <b-input v-model="settingsData.nipt" name="nipt" size="is-small" />
        </b-field>
      </div>
      <div class="column">
        <b-field :label="$t('table.creation_date')">
          <b-input
            v-model="settingsData.creation_date"
            name="creation_date"
            size="is-small"
          />
        </b-field>
      </div>
    </div>

    <hr />
    <b-field :label="$t('table.desciption')">
      <b-input v-model="settingsData.desc" type="textarea" size="is-small" />
    </b-field>
    <b-field :label="$t('table.address')">
      <b-input
        v-model="settingsData.address"
        placeholder="e.g. Partnership proposal"
        size="is-small"
      />
    </b-field>
    <hr />
    <b-field grouped>
      <div class="control">
        <b-button native-type="submit" type="is-primary" class="is-small">
          {{ $t('navtop.save') }}
        </b-button>
      </div>
    </b-field>
    <b-loading v-model="isLoading"></b-loading>
  </form>
</template>

<script>
export default {
  name: 'CodeSettings',
  data() {
    return {
      isLoading: true,
      date: null,
      settingsData: [],
      currencies: [],
      currencyLoaded: true,
    }
  },
  mounted() {
    this.getSettings().then(() => {
      this.getCurrencies()
    })
  },
  methods: {
    saveCompany() {
      this.$axios
        .put('/settings', this.settingsData, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          this.$buefy.snackbar.open({
            message: 'Settings Updated',
            queue: false,
          })
        })
        .then(() => {
          location.reload()
        })
    },
    async getSettings() {
      await this.$axios
        .get('/settings', {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          this.isLoading = false
          this.settingsData = resp.data
        })
    },
    async getCurrencies() {
      await this.$axios
        .get('/currencies', {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          this.currencies = resp.data
          this.currencyLoaded = false
        })
    },
  },
}
</script>

<style>
</style>