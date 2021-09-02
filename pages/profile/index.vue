<template>
  <div>
    <hero-bar>
      Profile
      <nuxt-link slot="right" to="/" class="button is-small">
        Dashboard
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section is-fullheight">
      <tiles>
        <card-component title="Profile" icon="account" class="tile is-child">
          <user-avatar class="image has-max-width is-aligned-center" />
          <hr />
          <b-field label="Name">
            <b-input
              :value="$auth.user.full_name"
              custom-class="is-static"
              size="is-small"
              readonly
            />
          </b-field>
          <hr />
          <b-field label="E-mail">
            <b-input
              :value="$auth.user.email"
              custom-class="is-static"
              size="is-small"
              readonly
            />
          </b-field>
        </card-component>

        <password-update-form class="tile is-child" />
      </tiles>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'
import PasswordUpdateForm from '@/components/PasswordUpdateForm'
import Tiles from '@/components/Tiles'
import UserAvatar from '@/components/UserAvatar'
export default {
  name: 'Profile',
  components: {
    UserAvatar,
    Tiles,
    PasswordUpdateForm,
    HeroBar,
    CardComponent,
  },

  head() {
    return {
      title: `${this.$t('user-nav.profile')} — ${this.$t('messages.title')}`,
    }
  },
}
</script>
