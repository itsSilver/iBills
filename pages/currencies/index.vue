<template>
  <div>
    <hero-bar>
      {{ $t('nav.currencies') }}
      <div slot="right">
        <nuxt-link to="/" class="button is-small">
          {{ $t('nav.dashboard') }}
        </nuxt-link>
      </div>
    </hero-bar>
    <section class="section is-main-section is-fullheight">
      <card-component
        class="has-table has-mobile-sort-spaced"
        :title="$t('nav.currencies')"
        icon="file-percent"
      >
        <template #navtop>
          <nav-top-general>
            <button
              class="button is-primary is-small"
              type="button"
              @click="isCreateModalActive = true"
            >
              <b-icon icon="plus-thick" size="is-small" />
              <span> {{ $t('navtop.create') }} </span>
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
              v-slot="props"
            >
              {{ props.row.code }}
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
                  @click.prevent="updateCurrency(props.row.id)"
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
      <currency-create
        :isModalActive="isCreateModalActive"
        @cancel="cancelCreateModal"
        @currency-created="onCurrencyCreate"
        :title="$t('messages.create', { name: `${$t('currency.currency')}` })"
      />
      <currency-update
        :isModalActive="isUpdateModalActive"
        :categoryId="categoryId"
        @cancel="cancelUpdateModal"
        @currency-updated="onCurrencyUpdate"
        :title="$t('messages.update', { name: `${$t('currency.currency')}` })"
      />
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import NavTopMenu from '@/components/Content/NavTopMenu'
import ModalBox from '@/components/ModalBox'
import NavTopGeneral from '~/components/Content/NavTopGeneral.vue'
import CurrencyCreate from '~/components/Modals/Currencies/CurrencyCreate.vue'
import CurrencyUpdate from '~/components/Modals/Currencies/CurrencyUpdate.vue'
export default {
  name: 'VatRates',
  head() {
    return {
      title: `${this.$t('nav.currencies')} — ${this.$t('messages.title')}`,
    }
  },
  components: {
    HeroBar,
    CardComponent,
    NavTopMenu,
    ModalBox,
    NavTopGeneral,
    CurrencyCreate,
    CurrencyUpdate,
  },
  data() {
    return {
      deleteAll: false,
      dataTable: [],
      total: 0,
      loading: false,
      page: 1,
      perPage: 10,

      paginated: false,
      isLoading: false,
      trashObject: null,
      isUpdateModalActive: false,
      isCreateModalActive: false,
      updateData: [],
      categoryId: null,
      isModalActive: false,
    }
  },
  computed: {
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.tax_code
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
    onCurrencyCreate(val) {
      this.$buefy.snackbar.open({
        message: `${this.$t('messages.created', {
          name: val.tax_code,
        })}`,
        queue: false,
      })
      this.loadAsyncData()
    },
    // end create category

    async loadAsyncData() {
      this.loading = true
      await this.$axios
        .get(`/currencies`, {
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
    async updateCurrency(id) {
      this.categoryId = id
      this.isUpdateModalActive = true
    },
    cancelUpdateModal() {
      this.isUpdateModalActive = false
    },

    onCurrencyUpdate(val) {
      this.$buefy.snackbar.open({
        message: `${this.$t('messages.updated', {
          name: val.tax_code,
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
        .delete(`/currencies/${this.trashObject.id}`, {
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