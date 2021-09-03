<template>
  <div>
    <hero-bar>
      {{ $t('customer.customer') }}
      <nuxt-link slot="right" to="/customers" class="button is-small">
        {{ $t('navtop.back') }}
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section is-fullheight">
      <card-component :title="$t('customer.create')" icon="ballot">
        <form @submit.prevent="submit">
          <div class="columns">
            <div class="column">
              <b-field :label="$t('table.code')">
                <b-input
                  v-model="form.code"
                  name="code"
                  required
                  size="is-small"
                />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.name')">
                <b-input
                  v-model="form.name"
                  name="name"
                  required
                  size="is-small"
                />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.number')">
                <b-input
                  v-model="form.number"
                  name="number"
                  type="number"
                  size="is-small"
                />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.email')">
                <b-input
                  v-model="form.email"
                  name="email"
                  type="email"
                  size="is-small"
                />
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field :label="$t('table.phone_number')">
                <b-input
                  v-model="form.phone_mobile"
                  name="phone_mobile"
                  type="number"
                  size="is-small"
                  required
                />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.phone_office')">
                <b-input
                  v-model="form.phone_office"
                  name="phone_office"
                  type="number"
                  size="is-small"
                />
              </b-field>
            </div>

            <div class="column">
              <b-field :label="$t('table.fiscal')">
                <b-input
                  v-model="form.fiscal_code"
                  name="fiscal_code"
                  size="is-small"
                />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.city')">
                <b-input v-model="form.city" name="city" size="is-small" />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.address')">
                <b-input
                  v-model="form.address"
                  name="address"
                  size="is-small"
                />
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field :label="$t('table.note')">
                <b-input
                  v-model="form.note"
                  name="note"
                  type="textarea"
                  size="is-small"
                />
              </b-field>
            </div>
            <div class="column"></div>
          </div>
          <div class="columns"></div>
          <hr />
          <div class="is-flex footer-new-modal">
            <div class="control">
              <b-button type="is-warning" @click="reset" class="is-small">
                {{ $t('navtop.cancel') }}
              </b-button>
            </div>
            <div class="control">
              <b-button native-type="submit" type="is-primary is-small">
                {{ $t('navtop.create') }}
              </b-button>
            </div>
          </div>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>
import mapValues from 'lodash/mapValues'
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'
export default {
  name: 'CreateCustomer',
  components: {
    HeroBar,
    CardComponent,
  },
  data() {
    return {
      isLoading: false,
      form: {
        name: null,
        code: null,
        number: null,
        email: null,
        phone_mobile: null,
        phone_office: null,
        fiscal_code: null,
        city: null,
        address: null,
        note: null,
      },
    }
  },

  methods: {
    async submit() {
      await this.$axios
        .post(`/customers`, this.form, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.$buefy.snackbar.open({
            message: `${this.$t('messages.created', {
              name: res.data.name,
            })}`,
            queue: false,
          })
          this.reset()
        })
        .catch((err) => {
          console.log('err', err.data)
        })
    },
    reset() {
      this.form = mapValues(this.form, (item) => {
        if (item && typeof item === 'object') {
          return []
        }
        return null
      })
    },
  },

  head() {
    return {
      title: `${this.$t('navtop.create')} ${this.$t(
        'nav.customers'
      )} — ${this.$t('messages.title')}`,
    }
  },
}
</script>

<style>
</style>