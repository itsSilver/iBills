<template>
  <form @submit.prevent="saveCompany">
    <div class="columns">
      <div class="column">
        <b-field :label="$t('table.name')">
          <b-input
            v-model="companyData.name"
            icon="account"
            :placeholder="$t('table.name')"
            name="name"
            required
            size="is-small"
          />
        </b-field>
      </div>
      <div class="column">
        <b-field :label="$t('table.email')">
          <b-input
            v-model="companyData.email"
            icon="email"
            type="email"
            :placeholder="$t('table.email')"
            name="email"
            required
            size="is-small"
          />
        </b-field>
      </div>
      <div class="column">
        <b-field :label="$t('table.phone')">
          <b-input
            v-model="companyData.phone"
            :placeholder="$t('table.phone')"
            type="number"
            name="phone"
            icon="phone"
            size="is-small"
          />
        </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-field :label="$t('table.code')">
          <b-input
            v-model="companyData.code"
            icon="attachment"
            name="code"
            required
            size="is-small"
          />
        </b-field>
      </div>
      <div class="column">
        <b-field :label="$t('table.fiscal')">
          <b-input
            v-model="companyData.nipt"
            icon="note"
            name="nipt"
            required
            size="is-small"
          />
        </b-field>
      </div>
      <div class="column">
        <b-field :label="$t('table.creation_date')">
          <b-input
            v-model="companyData.creation_date"
            icon="calendar"
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
        v-model="companyData.desc"
        required
        type="textarea"
        size="is-small"
      />
    </b-field>
    <b-field :label="$t('table.address')">
      <b-input
        v-model="companyData.address"
        placeholder="e.g. Partnership proposal"
        required
        icon="pin"
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
  </form>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      date: null,
    }
  },
  props: ['companyData'],
  methods: {
    saveCompany() {
      this.$axios
        .put('/company-data', this.companyData, {
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
  },
}
</script>

<style>
</style>