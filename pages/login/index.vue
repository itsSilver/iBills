<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div
            class="column is-5-tablet is-4-desktop is-3-widescreen"
            style="background-color: #fff"
          >
            <h2 class="default-title">iMagazine</h2>
            <div class="login-icon">
              <warehouse-icon />
            </div>
            <form class="box" @submit.prevent="onSubmit">
              <b-field>
                <b-input
                  v-model="form.identifier"
                  icon="email"
                  type="email"
                  placeholder="E-mail"
                  name="email"
                  size="is-small"
                  required
                />
              </b-field>
              <b-field>
                <b-input
                  v-model="form.password"
                  icon="lock"
                  type="password"
                  placeholder="Password"
                  name="password"
                  size="is-small"
                  required
                />
              </b-field>

              <div class="field">
                <button type="submit" class="button is-success is-small">
                  Login
                </button>
              </div>
              <div class="error-server" v-if="error_server">
                Credentials dont match!
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import WarehouseIcon from '~/components/Logos/WarehouseIcon.vue'
export default {
  components: { WarehouseIcon },
  layout: 'login',
  middleware: 'auth',
  auth: 'guest',
  name: 'Login',
  head() {
    return {
      title: 'Login — iMagazine',
    }
  },
  data() {
    return {
      form: {
        identifier: null,
        password: null,
      },
      error_server: false,
    }
  },
  methods: {
    async onSubmit() {
      try {
        await this.$auth
          .loginWith('local', {
            data: this.form,
          })
          .then((res) => {
            this.$buefy.snackbar.open({
              message: `${this.$t('messages.welcome')} ${
                res.data.user.full_name
              }`,
              queue: false,
            })
          })
      } catch (err) {
        this.show = false
        this.error_server = true
      }
    },
  },
}
</script>

<style scoped>
.default-title {
  color: #333;
  background-color: #fff;
  border-radius: 4px;
  font-size: 2rem;
  text-align: center;
  padding: 1rem 0.5rem;
}
.login-icon {
  width: 150px;
  height: 150px;
  margin: 1.5rem auto;
}
.login-icon svg {
  width: 100%;
  height: 100%;
}
</style>
