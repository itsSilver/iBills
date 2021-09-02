<template>
  <form @submit.prevent="saveCompany">
    <div class="columns">
      <div class="column">
        <b-field :label="$t('table.currency')">
          <b-input
            v-model="settingsData.currency"
            name="name"
            required
            size="is-small"
          />
        </b-field>
      </div>
      <div class="column">
        <b-field :label="$t('table.email')">
          <b-input
            v-model="settingsData.email"
            type="email"
            name="email"
            required
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
          <b-input
            v-model="settingsData.code"
            name="code"
            required
            size="is-small"
          />
        </b-field>
      </div>
      <div class="column">
        <b-field :label="$t('table.fiscal')">
          <b-input
            v-model="settingsData.nipt"
            name="nipt"
            required
            size="is-small"
          />
        </b-field>
      </div>
      <div class="column">
        <b-field :label="$t('table.creation_date')">
          <b-input
            v-model="settingsData.creation_date"
            name="creation_date"
            required
            size="is-small"
          />
        </b-field>
      </div>
    </div>

    <hr />
    <b-field :label="$t('table.desciption')">
      <b-input
        v-model="settingsData.desc"
        required
        type="textarea"
        size="is-small"
      />
    </b-field>
    <b-field :label="$t('table.address')">
      <b-input
        v-model="settingsData.address"
        placeholder="e.g. Partnership proposal"
        required
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
      isLoading: false,
      date: null,
      settingsData: [],
    }
  },
  mounted() {
    this.getSettings()
  },
  methods: {
    saveCompany() {
      this.$axios
        .put('/company-data', this.settingsData, {
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
    },
    async getSettings() {
      this.isLoading = true
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
  },
}
</script>

<style>
</style>