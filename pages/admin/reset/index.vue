<template>
  <div>
    <section class="section is-main-section is-fullheight">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Change Password"
        icon="account"
      >
        <form @submit.prevent="changePassword" class="p-4">
          <b-field>
            <b-input
              v-model="new_password"
              icon="account"
              placeholder="New Password"
              name="new"
              size="is-normal"
              type="password"
              password-reveal
              required
            />
          </b-field>
          <button type="submit" class="button is-primary is-normal">
            Save
          </button>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>
import NavTopMenu from '@/components/Content/NavTopMenu'
export default {
  components: { NavTopMenu },
  name: 'Users',
  layout: 'admin',
  middleware: 'admin',
  head() {
    return {
      title: `Reset Password — ${this.$t('messages.title')}`,
    }
  },
  data() {
    return {
      new_password: null,
    }
  },
  methods: {
    async changePassword() {
      const payload = {
        password: this.new_password,
        passw: this.new_password,
      }
      await this.$axios
        .put(`/users/${this.$auth.user.id}`, payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          this.$buefy.snackbar.open({
            message: `Password updated successfully!`,
            queue: false,
          })
        })
        .catch((err) => {
          this.$buefy.snackbar.open({
            message: `${this.$t('messages.error')}`,
            queue: false,
          })
        })
    },
  },
}
</script>
