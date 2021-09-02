<template>
  <div>
    <hero-bar>
      {{ $t('nav.categories') }}
      <div slot="right">
        <nuxt-link to="/" class="button is-small">
          {{ $t('nav.dashboard') }}
        </nuxt-link>
      </div>
    </hero-bar>
    <section class="section is-main-section is-fullheight">
      <card-component
        class="has-table has-mobile-sort-spaced"
        :title="$t('nav.categories')"
        icon="home-city"
      >
        <template #navtop>
          <nav-top-general>
            <button
              class="button is-primary is-small"
              type="button"
              @click="isCreateModalActive = true"
              v-role="'admin'"
            >
              <b-icon icon="plus-thick" />
              <span> {{ $t('navtop.create') }} </span>
            </button>
            <button
              class="button is-danger is-small"
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
              searchable
              v-slot="props"
            >
              {{ props.row.name }}
            </b-table-column>
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
              :label="$t('table.note')"
              field="note"
              v-slot="props"
            >
              {{ props.row.note | truncate(25) }}
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
                  class="button is-blue is-small"
                  type="button"
                  @click.prevent="viewCategory(props.row.id)"
                >
                  <b-icon icon="eye" size="is-small" />
                </button>
                <button
                  class="button is-warning is-small"
                  type="button"
                  @click.prevent="updateCategory(props.row.id)"
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
      <category-update
        :isModalActive="isUpdateModalActive"
        :categoryId="categoryId"
        @cancel="cancelUpdateModal"
        @category-updated="onCategoryUpdate"
        :title="$t('messages.update', { name: `${$t('category.category')}` })"
      />
      <category-create
        :isModalActive="isCreateModalActive"
        @cancel="cancelCreateModal"
        @category-created="onCategoryCreate"
        :title="$t('messages.create', { name: `${$t('category.category')}` })"
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
import CategoryUpdate from '~/components/Modals/Categories/CategoryUpdate.vue'
import ModalBox from '@/components/ModalBox'
import CategoryCreate from '~/components/Modals/Categories/CategoryCreate.vue'
import NewModal from '@/components/Content/NewModal.vue'
import NavTopGeneral from '~/components/Content/NavTopGeneral.vue'
export default {
  name: 'Categories',
  head() {
    return {
      title: `${this.$t('nav.categories')} — ${this.$t('messages.title')}`,
    }
  },
  components: {
    HeroBar,
    CardComponent,
    NavTopMenu,
    CategoryUpdate,
    CategoryCreate,
    ModalBox,
    NewModal,
    NavTopGeneral,
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
    onCategoryCreate(val) {
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
        .get(`/categories/parents`, {
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

    // view category methods
    viewCategory(id) {
      this.$router.push(this.localePath(`/categories/${id}`))
    },

    // end view cat methods
    // Update methdos
    async updateCategory(id) {
      this.categoryId = id
      this.isUpdateModalActive = true
    },
    cancelUpdateModal() {
      this.isUpdateModalActive = false
    },

    onCategoryUpdate(val) {
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
        .delete(`/categories/${this.trashObject.id}`, {
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
        .post('/categories/deleteAll', payload, {
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