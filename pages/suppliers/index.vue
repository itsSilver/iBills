<template>
  <div>
    <hero-bar>
      {{ $t('nav.suppliers') }}
      <nuxt-link slot="right" to="/" class="button is-small">
        {{ $t('nav.dashboard') }}
      </nuxt-link>
    </hero-bar>

    <section class="section is-main-section is-fullheight">
      <card-component
        class="has-table has-mobile-sort-spaced"
        :title="$t('nav.suppliers')"
        icon="archive"
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
            :checked-rows.sync="checkedRows"
            checkable
            :loading="loading"
            :paginated="paginated"
            :per-page="perPage"
            :striped="true"
            :hoverable="true"
            default-sort="code"
            :data="dataTable"
          >
            <b-table-column
              :label="$t('table.code')"
              field="code"
              sortable
              searchable
              v-slot="props"
            >
              {{ props.row.code }}
            </b-table-column>
            <b-table-column
              :label="$t('table.name')"
              field="name"
              sortable
              searchable
              v-slot="props"
            >
              {{ props.row.name }}
            </b-table-column>
            <b-table-column
              :label="$t('table.address')"
              field="address"
              sortable
              v-slot="props"
            >
              {{ props.row.address | truncate(25) }}
            </b-table-column>
            <b-table-column
              :label="$t('table.vat_number')"
              field="vat_number"
              v-slot="props"
            >
              {{ props.row.vat_number }}
            </b-table-column>
            <b-table-column
              :label="$t('table.fiscal_code')"
              field="fiscal_code"
              v-slot="props"
            >
              {{ props.row.fiscal_code }}
            </b-table-column>
            <b-table-column
              :label="$t('table.phone_number')"
              field="phone_mobile"
              v-slot="props"
            >
              {{ props.row.phone_mobile }}
            </b-table-column>
            <b-table-column
              :label="$t('table.email')"
              field="email"
              v-slot="props"
            >
              {{ props.row.email }}
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
                  @click.prevent="updateSupplier(props.row.id)"
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

          <button @click="deleteAllSelected" class="button is-danger is-small">
            {{ $t('navtop.delete') }}
          </button>
        </div>
        <b-loading v-model="isLoading"></b-loading>
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
  name: 'Suppliers',
  head() {
    return {
      title: `${this.$t('nav.suppliers')} — ${this.$t('messages.title')}`,
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
      form: {
        name: null,
        type: null,
        address: null,
      },
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
        .post('/suppliers/deleteAll', payload, {
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

    cancelDeleteModal() {
      this.isDeleteActive = false
    },

    // Update supplier
    updateSupplier(id) {
      this.$router.push(this.localePath(`/suppliers/${id}`))
    },
    onNewDocument() {
      // this.$store.commit('companies/NEW_COMPANY')
      this.$router.push(this.localePath({ name: 'suppliers-create' }))
    },
    async loadAsyncData() {
      this.loading = true
      await this.$axios
        .get(`/suppliers`, {
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
        .delete(`/suppliers/${this.trashObject.id}`, {
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
