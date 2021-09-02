<template>
  <div>
    <hero-bar :has-right-visible="false"> Settings </hero-bar>
    <section class="section is-main-section is-fullheight">
      <div class="card">
        <client-only>
          <b-tabs destroy-on-hide>
            <b-tab-item :label="$t('nav.settings')" icon="ballot">
              <company-form-settings :companyData="companyData" />
            </b-tab-item>
            <b-tab-item :label="$t('settings.codes')" icon="qrcode-scan">
              <code-settings />
            </b-tab-item>
            <b-tab-item label="Videos" icon="video"></b-tab-item>
          </b-tabs>
        </client-only>
      </div>
    </section>
  </div>
</template>

<script>
import CompanyFormSettings from '~/components/Settings/CompanyFormSettings.vue'
import CodeSettings from '~/components/Settings/CodeSettings.vue'
export default {
  name: 'Settings',
  components: {
    CompanyFormSettings,
    CodeSettings,
  },
  data() {
    return {
      isLoading: false,
    }
  },
  async asyncData({ store, $axios, $auth }) {
    let response = await $axios.get(`/company-data`, {
      headers: {
        Authorization: `Bearer ${$auth.strategy.token.get()}`,
        'Content-Type': 'application/json',
      },
    })
    let companyData = response.data
    return { companyData }
  },
  head() {
    return {
      title: `${this.$t('nav.settings')} — ${this.$t('messages.title')}`,
    }
  },
}
</script>

<style scoped>
.is-background-white {
  background-color: #fff;
}
</style>