<template>
  <div>
    <hero-bar>
      {{ $t('nav.warehouses') }}
      <div slot="right">
        <nuxt-link to="/" class="button is-small">
          {{ $t('nav.dashboard') }}
        </nuxt-link>
      </div>
    </hero-bar>

    <section class="section is-main-section is-fullheight">
      <card-component
        class="has-table has-mobile-sort-spaced"
        :title="$t('nav.loads')"
        icon="home-city"
      >
        <template #navtop>
          <nav-top-menu
            :deleteAll="deleteAll"
            @new-document="onNewDocument"
            @delete-selected="onDeleteSelected"
          >
          </nav-top-menu>
        </template>
        <div v-if="dataTable">
          <client-only>
            <b-table
              :checked-rows.sync="checkedRows"
              checkable
              :loading="loading"
              :paginated="paginated"
              :per-page="perPage"
              :striped="true"
              :hoverable="true"
              default-sort="name"
              :data="dataTable"
            >
              <b-table-column
                :label="$t('table.name')"
                field="name"
                sortable
                v-slot="props"
              >
                {{ props.row.name }}
              </b-table-column>
              <b-table-column
                :label="$t('table.code')"
                field="code"
                sortable
                v-slot="props"
              >
                {{ props.row.code }}
              </b-table-column>
              <b-table-column
                :label="$t('table.type')"
                field="type"
                v-slot="props"
              >
                {{ props.row.type }}
              </b-table-column>
              <b-table-column
                :label="$t('table.address')"
                field="address"
                sortable
                v-slot="props"
              >
                {{ props.row.address }}
              </b-table-column>

              <b-table-column
                :label="$t('table.created')"
                field="created_at"
                sortable
                v-slot="props"
              >
                <small
                  class="has-text-grey is-abbr-like"
                  :title="props.row.created_at"
                  >{{ filterDate(props.row.created_at) }}</small
                >
              </b-table-column>
              <b-table-column
                custom-key="actions"
                :label="$t('table.action')"
                class="is-actions-cell"
                centered
                v-role="'admin'"
                v-slot="props"
              >
                <div class="buttons is-right">
                  <button
                    class="button is-blue is-small"
                    type="button"
                    @click.prevent="viewCompany(props.row.id)"
                  >
                    <b-icon icon="eye" size="is-small" />
                  </button>
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
          </client-only>
        </div>
      </card-component>
      <new-modal
        :is-active-new="isNewModalActive"
        @cancel="cancelNewModal"
        :title="$t('warehouse.create')"
      >
        <div>
          <form @submit.prevent="onSubmit">
            <div class="columns">
              <div class="column">
                <b-field>
                  <b-input
                    v-model="form.name"
                    icon="account"
                    placeholder="Name"
                    size="is-small"
                    name="name"
                    required
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-input
                    v-model="form.code"
                    icon="barcode"
                    size="is-small"
                    placeholder="Code"
                    name="code"
                    required
                  />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field>
                  <b-input
                    v-model="form.type"
                    icon="home-city"
                    size="is-small"
                    placeholder="Type"
                    name="type"
                    required
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field>
                  <b-input
                    v-model="form.address"
                    icon="pin"
                    size="is-small"
                    placeholder="Please enter an address"
                    name="address"
                    required
                  />
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
        :title="$t('warehouse.update')"
      >
        <div>
          <form @submit.prevent="onUpdate">
            <div class="columns">
              <div class="column">
                <b-field :label="$t('table.name')">
                  <b-input
                    v-model="updateData.name"
                    icon="account"
                    size="is-small"
                    placeholder="Name"
                    name="name"
                    required
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field :label="$t('table.code')">
                  <b-input
                    v-model="updateData.code"
                    icon="barcode"
                    size="is-small"
                    placeholder="Code"
                    name="code"
                    required
                  />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field :label="$t('table.type')">
                  <b-input
                    v-model="updateData.type"
                    icon="home-city"
                    size="is-small"
                    placeholder="Type"
                    name="type"
                    required
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field :label="$t('table.address')">
                  <b-input
                    v-model="updateData.address"
                    icon="pin"
                    size="is-small"
                    placeholder="Please add an address"
                    name="address"
                    required
                  />
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
      <new-modal
        :is-active-new="isDeleteActive"
        :title="$t('navtop.delete_selected')"
      >
        <div>
          <p
            v-html="$t('warehouse.delete', { name: `${$t('messages.all')}` })"
          ></p>
          <hr />
          <div class="is-flex footer-new-modal">
            <b-button
              class="button is-small"
              type="button"
              @click="cancelDeleteModal"
            >
              {{ $t('navtop.cancel') }}
            </b-button>

            <button
              @click="deleteAllSelected"
              class="button is-danger is-small"
            >
              {{ $t('navtop.delete') }}
            </button>
          </div>
          <b-loading v-model="isLoading"></b-loading>
        </div>
      </new-modal>
      <modal-box
        :is-active="isModalActive"
        :trash-object-name="trashObjectName"
        @confirm="trashConfirm"
        @cancel="trashCancel"
      />
    </section>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import ModalBox from '@/components/ModalBox'
import NavTopMenu from '@/components/Content/NavTopMenu'
import NewModal from '@/components/Content/NewModal'
export default {
  components: { ModalBox, NavTopMenu, NewModal },
  name: 'Warehouses',
  head() {
    return {
      title: `${this.$t('nav.warehouses')} — ${this.$t('messages.title')}`,
    }
  },
  data() {
    return {
      dataTable: null,
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
        code: null,
      },
      updateData: { name: null, type: null, address: null, code: null },
      isLoading: false,
      trashObject: null,
    }
  },
  computed: {
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.name
      }
    },
    company_id() {
      return this.$store.state.companies.company_id
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
    async deleteAllSelected() {
      const payload = this.checkedRows.map((x) => x.id)
      await this.$axios
        .post('/warehouses/deleteAll', payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.loadAsyncData().then(() => {
            this.isDeleteActive = false
          })
        })
        .catch((err) => {
          console.log('err', err.data)
        })
    },
    onDeleteSelected() {
      this.isDeleteActive = true
    },
    viewCompany(id) {
      this.$router.push(this.localePath(`/warehouses/${id}`))
    },
    async updateCompany(id) {
      this.$axios
        .get(`/warehouses/${id}`, {
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
      await this.$store.dispatch('companies/addCompany', this.form).then(() => {
        this.cancelNewModal()
        this.loadAsyncData()
        this.form.name = null
        this.form.type = null
        this.form.code = null
        this.form.address = null
      })
    },
    async onUpdate() {
      this.isLoading = true
      const payload = {
        name: this.updateData.name,
        type: this.updateData.type,
        address: this.updateData.address,
        code: this.updateData.code,
      }
      await this.$axios
        .put(`/warehouses/${this.updateData.id}`, payload, {
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
                name: resp.data.name,
              })}`,
              queue: false,
            })
          })
        })
        .catch((err) => {
          console.log('err', err)
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
        .get(`/warehouses`, {
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
        .delete(`/warehouses/${this.trashObject.id}`, {
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
                name: resp.data.name,
              })}`,
              queue: false,
              type: 'is-success',
            })
          })
        })

        .catch((error) => {
          this.loading = false
          throw error
        })
    },
    trashCancel() {
      this.isModalActive = false
    },
    filterDate(val) {
      return dayjs(val).format(`${this.$config.dateFormat}`)
    },
  },
  filters: {
    truncate(value, length) {
      return value.length > length ? value.substr(0, length) + '...' : value
    },
  },
  mounted() {
    this.loadAsyncData()
  },
}
</script>
