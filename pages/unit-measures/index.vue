<template>
  <div>
    <hero-bar>
      {{ $t('nav.unit-measures') }}
      <div slot="right">
        <nuxt-link to="/" class="button is-small">
          {{ $t('nav.dashboard') }}
        </nuxt-link>
      </div>
    </hero-bar>
    <section class="section is-main-section is-fullheight">
      <card-component
        class="has-table has-mobile-sort-spaced"
        :title="$t('nav.unit-measures')"
        icon="file-percent"
      >
        <template #navtop>
          <nav-top-general>
            <button
              class="button is-primary"
              type="button"
              @click="isCreateModalActive = true"
            >
              <b-icon icon="plus-thick" />
              <span> {{ $t('navtop.create') }} </span>
            </button>
            <button
              class="button is-danger"
              type="button"
              v-if="deleteAll"
              @click="isDeleteActive = true"
              v-role="'admin'"
            >
              <b-icon icon="trash-can" />
              <span> {{ $t('navtop.delete_selected') }} </span>
            </button>
          </nav-top-general>
        </template>
        <div class="table-main">
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
              :label="$t('table.abbv')"
              field="abbv"
              sortable
              v-slot="props"
            >
              {{ props.row.abbv }}
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
              v-slot="props"
            >
              <div class="buttons is-right">
                <button
                  class="button is-warning is-small"
                  type="button"
                  @click.prevent="updateVat(props.row.id)"
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
      <units-create
        :isModalActive="isCreateModalActive"
        @cancel="cancelCreateModal"
        @units-created="onUnitCreate"
        :title="
          $t('messages.create', { name: `${$t('unit-measure.unit-measure')}` })
        "
      />
      <units-update
        :isModalActive="isUpdateModalActive"
        :categoryId="categoryId"
        @cancel="cancelUpdateModal"
        @units-updated="onUnitUpdate"
        :title="
          $t('messages.update', { name: `${$t('unit-measure.unit-measure')}` })
        "
      />

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
    </section>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import NavTopMenu from '@/components/Content/NavTopMenu'
import ModalBox from '@/components/ModalBox'
import NewModal from '@/components/Content/NewModal.vue'
import NavTopGeneral from '~/components/Content/NavTopGeneral.vue'
import UnitsCreate from '~/components/Modals/Units/UnitsCreate.vue'
import UnitsUpdate from '~/components/Modals/Units/UnitsUpdate.vue'
export default {
  name: 'UnitMeasures',
  head() {
    return {
      title: `${this.$t('nav.unit-measures')} — ${this.$t('messages.title')}`,
    }
  },
  components: {
    HeroBar,
    CardComponent,
    NavTopMenu,
    ModalBox,
    NewModal,
    NavTopGeneral,
    UnitsCreate,
    UnitsUpdate,
  },
  data() {
    return {
      deleteAll: false,
      dataTable: [],
      total: 0,
      loading: false,
      page: 1,
      perPage: 10,
      checkboxPosition: 'left',
      checkedRows: [],
      paginated: false,
      isLoading: false,
      trashObject: null,
      isUpdateModalActive: false,
      isCreateModalActive: false,
      isDeleteActive: false,
      isModalActive: false,
      updateData: [],
      categoryId: null,
    }
  },
  computed: {
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.tax_code
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
  mounted() {
    this.loadAsyncData()
  },
  methods: {
    // create category methods
    onNewDocument() {
      this.isCreateModalActive = true
    },
    cancelCreateModal() {
      this.isCreateModalActive = false
    },
    onUnitCreate(val) {
      this.$buefy.snackbar.open({
        message: `${this.$t('messages.created', {
          name: val.name,
        })}`,
        queue: false,
      })
      this.loadAsyncData()
    },
    // end create category

    async loadAsyncData() {
      this.loading = true
      await this.$axios
        .get(`/units`, {
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

    // Update methdos
    async updateVat(id) {
      this.categoryId = id
      this.isUpdateModalActive = true
    },
    cancelUpdateModal() {
      this.isUpdateModalActive = false
    },

    onUnitUpdate(val) {
      this.$buefy.snackbar.open({
        message: `${this.$t('messages.updated', {
          name: val.name,
        })}`,
        queue: false,
      })
      this.loadAsyncData()
    },
    // end update methods

    // delete functions
    trashModal(val) {
      this.trashObject = val
      this.isModalActive = true
    },

    async trashConfirm() {
      this.loading = true
      await this.$axios
        .delete(`/units/${this.trashObject.id}`, {
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

    // delete all
    onDeleteSelected() {
      this.isDeleteActive = true
    },

    cancelDeleteModal() {
      this.isDeleteActive = false
    },
    async deleteAllSelected() {
      this.isLoading = true
      const payload = this.checkedRows.map((x) => x.id)
      await this.$axios
        .post('/units/deleteAll', payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.loadAsyncData().then(() => {
            this.isLoading = false
            this.isDeleteActive = false
          })
        })
        .catch((err) => {
          this.isLoading = false
          console.log('err', err.data)
        })
    },

    // end delete
    filterDate(val) {
      return dayjs(val).format(`${this.$config.dateFormat}`)
    },
  },
  filters: {
    truncate(value, length) {
      if (!value) {
        return
      }
      return value.length > length ? value.substr(0, length) + '...' : value
    },
  },
}
</script>

<style>
</style>