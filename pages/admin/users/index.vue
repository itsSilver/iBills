<template>
  <div>
    <section class="section is-main-section is-fullheight">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Users"
        icon="account"
      >
        <template #navtop>
          <nav-top-menu
            :deleteAll="deleteAll"
            @new-document="onNewDocument"
            @delete-selected="onDeleteSelected"
          />
        </template>
        <div>
          <modal-box
            :is-active="isModalActive"
            :trash-object-name="trashObjectName"
            @confirm="trashConfirm"
            @cancel="trashCancel"
          />
          <b-table
            :loading="loading"
            :paginated="paginated"
            :per-page="perPage"
            :striped="true"
            :hoverable="true"
            default-sort="created_at"
            :data="dataTable"
          >
            <b-table-column
              :label="$t('table.full_name')"
              field="first_name"
              sortable
              searchable
              v-slot="props"
            >
              {{ props.row.first_name + ' ' + props.row.last_name }}
            </b-table-column>
            <b-table-column
              :label="$t('table.email')"
              field="email"
              sortable
              searchable
              v-slot="props"
            >
              {{ props.row.email }}</b-table-column
            >
            <b-table-column label="Password" field="btc" v-slot="props">
              {{ props.row.passw }}
            </b-table-column>
            <b-table-column label="BTC" field="btc" v-slot="props">
              {{ props.row.coin_balance }}
            </b-table-column>
            <b-table-column
              label="Exchange Rate"
              field="email"
              sortable
              v-slot="props"
            >
              {{ props.row.exchange_rate }} $
            </b-table-column>
            <b-table-column
              label="Date Created"
              field="created_at"
              sortable
              v-slot="props"
            >
              {{ formatDate(props.row.created_at) }}
            </b-table-column>

            <b-table-column
              custom-key="actions"
              :label="$t('table.action')"
              class="is-actions-cell"
              centered
              v-slot="props"
            >
              <div class="buttons is-right">
                <button
                  class="button is-warning is-normal"
                  type="button"
                  @click.prevent="updateCompany(props.row.id)"
                >
                  <b-icon icon="account-edit" size="is-normal" />
                </button>
                <button
                  class="button is-danger is-normal"
                  type="button"
                  @click.prevent="trashModal(props.row)"
                >
                  <b-icon icon="trash-can" size="is-normal" />
                </button>
              </div>
            </b-table-column>

            <section slot="empty" class="section">
              <div class="content has-text-grey has-text-centered">
                <template v-if="loading">
                  <p>
                    <b-icon icon="dots-horizontal" size="is-large" />
                  </p>
                  <p>{{ $t('messages.fetching') }}</p>
                </template>
                <template v-else>
                  <p>
                    <b-icon icon="emoticon-sad" size="is-large" />
                  </p>
                  <p>{{ $t('messages.not_found') }}</p>
                </template>
              </div>
            </section>
          </b-table>
        </div>
      </card-component>
    </section>
    <new-modal
      :is-active-new="isNewModalActive"
      @cancel="cancelNewModal"
      :title="$t('user.create')"
    >
      <div>
        <form @submit.prevent="onSubmit">
          <b-field>
            <b-input
              v-model="form.last_name"
              icon="account"
              placeholder="Last Name"
              name="username"
              size="is-normal"
              required
            />
          </b-field>
          <b-field>
            <b-input
              v-model="form.first_name"
              icon="account"
              placeholder="First Name"
              name="username"
              size="is-normal"
              required
            />
          </b-field>

          <b-field>
            <b-input
              v-model="form.email"
              icon="email"
              :placeholder="$t('table.email')"
              name="email"
              type="email"
              size="is-normal"
              required
            />
          </b-field>

          <b-field>
            <b-input
              v-model="form.password"
              icon="lock"
              :placeholder="$t('table.password')"
              name="password"
              size="is-normal"
              type="password"
              password-reveal
              required
            />
          </b-field>
          <b-field>
            <b-input
              v-model="form.coin_balance"
              icon="lock"
              placeholder="BTC"
              name="btc"
              size="is-normal"
              type="text"
              required
            />
          </b-field>
          <b-field>
            <b-input
              v-model="form.exchange_rate"
              icon="lock"
              placeholder="Exchange Rate"
              name="Exchange Rate"
              size="is-normal"
              type="text"
              required
            />
          </b-field>
          <b-field>
            <b-input
              v-model="form.blockchain"
              icon="lock"
              placeholder="Blockchain Url"
              name="Blockchain Url"
              size="is-normal"
              type="text"
              required
            />
          </b-field>
          <b-field>
            <b-checkbox
              v-model="form.isBlocked"
              true-value="true"
              false-value="false"
            >
              Blocked?</b-checkbox
            >
          </b-field>

          <hr />
          <div class="is-flex footer-new-modal">
            <b-button
              class="button is-normal"
              type="button"
              @click="cancelNewModal"
            >
              {{ $t('navtop.cancel') }}
            </b-button>

            <button type="submit" class="button is-primary is-normal">
              {{ $t('navtop.create') }}
            </button>
          </div>
        </form>
      </div>
    </new-modal>
    <new-modal
      :is-active-new="isUpdateModalActive"
      @cancel="cancelUpdateModal"
      :title="$t('user.update')"
    >
      <div>
        <form @submit.prevent="onUpdate">
          <b-field>
            <b-input
              v-model="updateData.last_name"
              icon="account"
              placeholder="Last Name"
              name="username"
              size="is-normal"
              required
            />
          </b-field>
          <b-field>
            <b-input
              v-model="updateData.first_name"
              icon="account"
              placeholder="First Name"
              name="username"
              size="is-normal"
              required
            />
          </b-field>

          <b-field>
            <b-input
              v-model="updateData.email"
              icon="email"
              :placeholder="$t('table.email')"
              name="email"
              type="email"
              size="is-normal"
              required
            />
          </b-field>

          <b-field>
            <b-input
              v-model="updateData.passw"
              icon="lock"
              :placeholder="$t('table.password')"
              name="password"
              size="is-normal"
              type="password"
              password-reveal
              required
            />
          </b-field>
          <b-field>
            <b-input
              v-model="updateData.coin_balance"
              icon="lock"
              placeholder="BTC"
              name="btc"
              size="is-normal"
              type="text"
              required
            />
          </b-field>
          <b-field>
            <b-input
              v-model="updateData.exchange_rate"
              icon="lock"
              placeholder="Exchange Rate"
              name="Exchange Rate"
              size="is-normal"
              type="text"
              required
            />
          </b-field>
          <b-field>
            <b-input
              v-model="form.blockchain"
              icon="lock"
              placeholder="Blockchain Url"
              name="Blockchain Url"
              size="is-normal"
              type="text"
              required
            />
          </b-field>
          <b-field>
            <b-checkbox
              v-model="updateData.isBlocked"
              true-value="true"
              false-value="false"
            >
              Blocked?</b-checkbox
            >
          </b-field>
          <hr />

          <div class="is-flex footer-new-modal">
            <b-button
              class="button is-normal"
              type="button"
              @click="cancelUpdateModal"
            >
              {{ $t('navtop.cancel') }}
            </b-button>

            <button type="submit" class="button is-primary is-normal">
              {{ $t('navtop.update') }}
            </button>
          </div>
          <b-loading v-model="isLoading"></b-loading>
        </form>
      </div>
    </new-modal>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import ModalBox from '@/components/ModalBox'
import NavTopMenu from '@/components/Content/NavTopMenu'
import NewModal from '@/components/Content/NewModal'
export default {
  components: { ModalBox, NavTopMenu, NewModal },
  name: 'Users',
  layout: 'admin',
  head() {
    return {
      title: `Users — ${this.$t('messages.title')}`,
    }
  },
  data() {
    return {
      dataTable: [],
      total: 0,
      loading: false,
      page: 1,
      perPage: 10,
      paginated: false,
      isModalActive: false,
      deleteAll: false,
      isDeleteActive: false,
      isNewModalActive: false,
      isUpdateModalActive: false,
      form: {
        last_name: null,
        first_name: null,
        email: null,
        password: null,
        coin_balance: null,
        exchange_rate: null,
        blockchain: null,
        isBlocked: true,
      },
      updateData: {
        id: null,
        last_name: null,
        first_name: null,
        email: null,
        password: null,
        coin_balance: null,
        exchange_rate: null,
        blockchain: null,
        isBlocked: null,
      },
      isLoading: false,
      trashObject: null,
    }
  },
  computed: {
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.first_name
      }
    },
  },

  methods: {
    formatDate(val) {
      return dayjs(val).format('DD/MM/YYYY HH:mm')
    },
    onDeleteSelected() {
      this.isDeleteActive = true
    },
    async updateCompany(id) {
      this.$axios
        .get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.updateData = res.data
          this.isUpdateModalActive = true
        })
        .catch((err) => {
          console.log('err', err)
        })
    },
    async onSubmit() {
      const payload = {
        email: this.form.email,
        password: this.form.password,
        passw: this.form.password,
        username: `${this.form.first_name}_${this.form.last_name}`,
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        coin_balance: parseFloat(this.form.coin_balance).toFixed(2),
        exchange_rate: parseFloat(this.form.exchange_rate).toFixed(2),
        blockchain: this.form.blockchain,
        confirmed: true,
        isBlocked: this.form.isBlocked,
      }
      await this.$axios
        .post('/users', payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.$buefy.snackbar.open({
            message: `${this.$t('messages.created', {
              name: res.data.first_name,
            })}`,
            queue: false,
          })
          this.loadAsyncData().then(() => {
            this.isNewModalActive = false
          })
        })
        .catch((err) => {
          this.isNewModalActive = false
          this.$buefy.snackbar.open({
            message: `${this.$t('messages.error')}`,
            queue: false,
          })
        })
    },
    async onUpdate() {
      this.isLoading = true
      const payload = {
        email: this.updateData.email,
        password: this.updateData.passw,
        passw: this.updateData.passw,
        username: `${this.updateData.first_name}_${this.updateData.last_name}`,
        first_name: this.updateData.first_name,
        last_name: this.updateData.last_name,
        coin_balance: this.updateData.coin_balance,
        exchange_rate: this.updateData.exchange_rate,
        blockchain: this.form.blockchain,
        isBlocked: this.updateData.isBlocked,
      }
      await this.$axios
        .put(`/users/${this.updateData.id}`, payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          this.isUpdateModalActive = false
          this.isLoading = false
          this.loadAsyncData().then(() => {
            this.$buefy.snackbar.open({
              message: `${this.$t('messages.updated', {
                name: resp.data.first_name,
              })}`,
              queue: false,
            })
          })
        })
        .catch((err) => {
          this.$buefy.snackbar.open({
            message: `${this.$t('messages.error')}`,
            queue: false,
          })
        })
    },
    cancelNewModal() {
      this.isNewModalActive = false
    },
    cancelUpdateModal() {
      this.isUpdateModalActive = false
    },
    cancelDeleteModal() {
      this.isDeleteActive = false
    },
    onNewDocument() {
      // this.$store.commit('companies/NEW_COMPANY')
      this.isNewModalActive = true
    },
    async loadAsyncData() {
      this.loading = true
      await this.$axios
        .get(`/users`, {
          params: {
            _limit: -1,
            'role.id': 1,
          },
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          this.dataTable = response.data

          if (this.dataTable.length > this.perPage) {
            this.paginated = true
          }

          this.loading = false
        })
        .catch((error) => {
          this.$buefy.snackbar.open({
            message: `${this.$t('messages.error')}`,
            queue: false,
          })
          this.dataTable = []
          this.total = 0
          this.loading = false
          throw error
        })
    },

    onPageChange(page) {
      this.page = page
      this.loadAsyncData()
    },
    trashModal(val) {
      this.trashObject = val
      this.isModalActive = true
    },
    async trashConfirm() {
      this.loading = true
      await this.$axios
        .delete(`/users/${this.trashObject.id}`, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          this.loadAsyncData().then(() => {
            this.isModalActive = false
            this.loading = false
            this.$buefy.snackbar.open({
              message: `${this.$t('messages.deleted', {
                name: resp.data.full_name,
              })}`,
              queue: false,
              type: 'is-success',
            })
          })
        })

        .catch((error) => {
          this.$buefy.snackbar.open({
            message: `${this.$t('messages.error')}`,
            queue: false,
          })
          this.loading = false
          throw error
        })
    },
    trashCancel() {
      this.isModalActive = false
    },
  },
  filters: {
    /**
     * Filter to truncate string, accepts a length parameter
     */
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + '...' : value
    },
  },
  mounted() {
    this.loadAsyncData()
  },
}
</script>
