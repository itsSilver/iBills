<template>
  <div>
    <hero-bar>
      {{ $t('nav.users') }}
      <nuxt-link slot="right" to="/" class="button is-small">
        {{ $t('nav.dashboard') }}
      </nuxt-link>
    </hero-bar>

    <section class="section is-main-section is-fullheight">
      <card-component
        class="has-table has-mobile-sort-spaced"
        :title="$t('nav.users')"
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
            default-sort="full_name"
            :data="dataTable"
          >
            <b-table-column
              :label="$t('table.full_name')"
              field="full_name"
              sortable
              v-slot="props"
            >
              {{ props.row.full_name }}
            </b-table-column>
            <b-table-column
              :label="$t('table.email')"
              field="email"
              sortable
              v-slot="props"
            >
              {{ props.row.email }}
            </b-table-column>
            <b-table-column
              :label="$t('table.role')"
              field="role"
              v-slot="props"
            >
              {{ props.row.role.name }}
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
                  class="button is-warning is-small"
                  type="button"
                  @click.prevent="updateCompany(props.row.id)"
                >
                  <b-icon icon="account-edit" size="is-small" />
                </button>
                <button
                  class="button is-danger is-small"
                  type="button"
                  @click.prevent="trashModal(props.row)"
                >
                  <b-icon icon="trash-can" size="is-small" />
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
          <div class="columns">
            <div class="column">
              <b-field>
                <b-input
                  v-model="form.username"
                  icon="account"
                  :placeholder="$t('table.username')"
                  name="username"
                  size="is-small"
                  required
                />
              </b-field>
            </div>
            <div class="column">
              <b-field>
                <b-input
                  v-model="form.email"
                  icon="email"
                  :placeholder="$t('table.email')"
                  name="email"
                  type="email"
                  size="is-small"
                  required
                />
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field>
                <b-input
                  v-model="form.full_name"
                  icon="account"
                  :placeholder="$t('table.full_name')"
                  name="full_name"
                  size="is-small"
                  required
                />
              </b-field>
            </div>
            <div class="column">
              <b-field>
                <b-input
                  v-model="form.password"
                  icon="lock"
                  :placeholder="$t('table.password')"
                  name="password"
                  size="is-small"
                  type="password"
                  password-reveal
                  required
                />
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field>
                <b-select
                  :placeholder="$t('table.role')"
                  icon="lock"
                  v-model="form.role.id"
                  size="is-small"
                  expanded
                >
                  <option
                    v-for="option in roles"
                    :value="option.id"
                    :key="option.id"
                  >
                    {{ option.name }}
                  </option>
                </b-select>
              </b-field>
            </div>
          </div>
          <hr />
          <div class="is-flex footer-new-modal">
            <b-button
              class="button is-small"
              type="button"
              @click="cancelNewModal"
            >
              {{ $t('navtop.cancel') }}
            </b-button>

            <button type="submit" class="button is-primary is-small">
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
          <div class="columns">
            <div class="column">
              <b-field :label="$t('table.username')">
                <b-input
                  v-model="updateData.username"
                  icon="account"
                  placeholder="Username"
                  name="username"
                  size="is-small"
                  required
                />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.email')">
                <b-input
                  v-model="updateData.email"
                  icon="email"
                  placeholder="Email"
                  name="email"
                  size="is-small"
                  type="email"
                  required
                />
              </b-field>
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <b-field :label="$t('table.full_name')">
                <b-input
                  v-model="updateData.full_name"
                  icon="account"
                  size="is-small"
                  placeholder="Full Name"
                  name="full_name"
                  required
                />
              </b-field>
            </div>
            <div class="column">
              <b-field :label="$t('table.role')">
                <b-select
                  :placeholder="$t('table.role')"
                  icon="lock"
                  v-model="updateData.role.id"
                  size="is-small"
                  expanded
                >
                  <option
                    v-for="option in roles"
                    :value="option.id"
                    :key="option.id"
                  >
                    {{ option.name }}
                  </option>
                </b-select>
              </b-field>
            </div>
          </div>
          <hr />

          <div class="is-flex footer-new-modal">
            <b-button
              class="button is-small"
              type="button"
              @click="cancelUpdateModal"
            >
              {{ $t('navtop.cancel') }}
            </b-button>

            <button type="submit" class="button is-primary is-small">
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
  head() {
    return {
      title: `${this.$t('nav.users')} — ${this.$t('messages.title')}`,
    }
  },
  data() {
    return {
      dataTable: [],
      total: 0,
      loading: false,
      page: 1,
      perPage: 10,
      checkboxPosition: 'left',
      checkedRows: [],
      paginated: false,
      isModalActive: false,
      deleteAll: false,
      isDeleteActive: false,
      isNewModalActive: false,
      isUpdateModalActive: false,
      form: {
        name: null,
        type: null,
        address: null,
        role: {
          id: null,
        },
      },
      updateData: {
        name: null,
        type: null,
        address: null,
        role: {
          id: null,
        },
      },
      isLoading: false,
      trashObject: null,
      roles: [],
    }
  },
  computed: {
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.full_name
      }
    },
  },
  watch: {
    checkedRows: function (val) {
      if (val.length !== 0) {
        this.deleteAll = true
      } else {
        this.deleteAll = false
      }
    },
  },
  methods: {
    async getRoles() {
      await this.$axios
        .get('/users-permissions/roles', {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.roles = res.data.roles
        })
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
        username: this.form.username,
        full_name: this.form.full_name,
        confirmed: true,
        role: this.form.role.id,
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
              name: res.data.full_name,
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
        username: this.updateData.username,
        full_name: this.updateData.full_name,
        role: this.updateData.role.id,
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
                name: resp.data.full_name,
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
    this.getRoles()
  },
}
</script>
