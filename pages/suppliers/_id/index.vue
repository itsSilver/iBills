<template>
  <div>
    <hero-bar>
      {{ $t('supplier.supplier') }} : {{ data.name }}
      <nuxt-link slot="right" to="/suppliers" class="button is-small">
        {{ $t('navtop.back') }}
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section is-fullheight">
      <card-component :title="$t('supplier.update')" icon="ballot">
        <form @submit.prevent="submit">
          <div class="columns">
            <div class="column">
              <b-field :label="$t('table.code')">
                <b-input
                  v-model="data.code"
                  name="code"
                  required
                  size="is-small"
                />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.name')">
                <b-input
                  v-model="data.name"
                  name="name"
                  required
                  size="is-small"
                />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.number')">
                <b-input v-model="data.number" name="number" size="is-small" />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.email')">
                <b-input
                  v-model="data.email"
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
                  v-model="data.phone_mobile"
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
                  v-model="data.phone_office"
                  name="phone_office"
                  size="is-small"
                  type="number"
                />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.vat')">
                <b-input
                  v-model="data.vat_number"
                  name="vat_number"
                  size="is-small"
                />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.fiscal')">
                <b-input
                  v-model="data.fiscal_code"
                  name="fiscal_code"
                  size="is-small"
                />
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field :label="$t('table.city')">
                <b-input v-model="data.city" name="city" size="is-small" />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.address')">
                <b-input
                  v-model="data.address"
                  name="address"
                  size="is-small"
                />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.website')">
                <b-input
                  v-model="data.website"
                  name="website"
                  size="is-small"
                />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.fax')">
                <b-input v-model="data.fax" name="fax" size="is-small" />
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field :label="$t('table.note')">
                <b-input
                  v-model="data.note"
                  name="note"
                  type="textarea"
                  size="is-small"
                />
              </b-field>
            </div>
            <div class="column"></div>
          </div>
          <hr />
          <div class="is-flex footer-new-modal">
            <div class="control">
              <b-button type="is-warning " class="is-small" @click="reset">
                {{ $t('navtop.cancel') }}
              </b-button>
            </div>
            <div class="control">
              <b-button native-type="submit" type="is-primary" class="is-small">
                {{ $t('navtop.update') }}
              </b-button>
            </div>
          </div>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'
export default {
  name: 'UpdateSupplier',
  components: {
    HeroBar,
    CardComponent,
  },
  data() {
    return {
      isLoading: false,
    }
  },

  methods: {
    async submit() {
      await this.$axios
        .put(`/suppliers/${this.$route.params.id}`, this.data, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.$buefy.snackbar.open({
            message: `${this.$t('messages.updated', {
              name: res.data.name,
            })}`,
            queue: false,
          })
        })
        .catch((err) => {
          console.log('err', err.data)
        })
    },
    reset() {
      history.back()
    },
  },
  async asyncData({ store, $axios, params, $auth }) {
    let response = await $axios.get(`/suppliers/${params.id}`, {
      headers: {
        Authorization: `Bearer ${$auth.strategy.token.get()}`,
        'Content-Type': 'application/json',
      },
    })

    let { data } = response

    return { data }
  },
  head() {
    return {
      title: `${this.$t('navtop.update')} ${this.$t(
        'nav.suppliers'
      )} — ${this.$t('messages.title')}`,
    }
  },
}
</script>

<style>
</style>