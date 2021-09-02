<template>
  <card-component :title="$t('profile.change-password')" icon="lock">
    <form @submit.prevent="submitPassword()">
      <b-field
        horizontal
        :label="$t('profile.table.current-password')"
        class="text-capitalize"
      >
        <b-input
          v-model="form.password_current"
          name="password_current"
          type="password"
          required
          autcomplete="current-password"
          password-reveal
          size="is-small"
        />
      </b-field>
      <hr />
      <b-field
        horizontal
        :label="$t('profile.table.new-password')"
        class="text-capitalize"
      >
        <b-input
          v-model="form.password"
          name="password"
          type="password"
          required
          autocomplete="new-password"
          password-reveal
          minlength="8"
          size="is-small"
        />
      </b-field>
      <b-field
        horizontal
        :label="$t('profile.table.confirm-password')"
        class="text-capitalize"
        :message="notMatch"
        :type="{ 'is-danger': notMatch }"
      >
        <b-input
          v-model="form.password_confirmation"
          name="password_confirmation"
          type="password"
          required
          autocomplete="new-password"
          password-reveal
          size="is-small"
        />
      </b-field>
      <hr />
      <b-field horizontal>
        <div class="control">
          <button
            type="submit"
            class="button is-primary is-small"
            :class="{ 'is-loading': isLoading }"
          >
            {{ $t('navtop.save') }}
          </button>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'
export default {
  name: 'PasswordUpdateForm',
  components: {
    CardComponent,
  },
  data() {
    return {
      isLoading: false,
      notMatch: null,
      form: {
        password_current: null,
        password: null,
        password_confirmation: null,
      },
    }
  },
  methods: {
    async submitPassword() {
      if (this.form.password !== this.form.password_confirmation) {
        console.log('noo match')
        this.notMatch = 'Password dont match'
      } else {
        this.isLoading = true
        const passUpdate = {
          identifier: this.$auth.user.username,
          password: this.form.password_current,
          newPassword: this.form.password,
          confirmPassword: this.form.password_confirmation,
        }
        await this.$axios
          .post('/password', passUpdate, {
            headers: {
              Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
              'Content-Type': 'application/json',
            },
          })
          .then((resp) => {
            console.log('resppp', resp.data.jwt)
            // const token = resp.data.jwt
            // this.$auth.local.token.set(`${token}`)

            this.isLoading = false
            this.$buefy.snackbar.open({
              message: 'Updated',
              queue: false,
            })
          })
          .catch((err) => {
            this.isLoading = false
            if (err.response.status === 400) {
              this.$buefy.snackbar.open({
                message: 'Wrong Password',
                type: 'is-warning',
                queue: false,
              })
            }
          })
      }
    },
  },
}
</script>
