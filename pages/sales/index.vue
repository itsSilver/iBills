<template>
  <div>
    <hero-bar>
      {{ $t('nav.sales') }}
      <div slot="right" class="navtop-has-buttons">
        <nuxt-link to="/" class="button is-small">
          {{ $t('nav.dashboard') }}
        </nuxt-link>
      </div>
    </hero-bar>
    <section class="section is-main-section is-fullheight">
      <card-component
        class="has-table has-mobile-sort-spaced"
        :title="$t('nav.sales')"
        icon="archive"
      >
        <template #navtop>
          <nav-top-general>
            <button
              class="button is-primary is-small"
              type="button"
              @click="$router.push(localePath('/sales/new'))"
              v-role="'admin'"
            >
              <b-icon icon="plus-thick" size="is-small" />
              <span> {{ $t('navtop.create') }} </span>
            </button>
            <button
              class="button is-danger is-small"
              type="button"
              v-if="deleteAll"
              @click="isDeleteActive = true"
              v-role="'admin'"
            >
              <b-icon icon="trash-can" class="is-small" />
              <span> {{ $t('navtop.delete_selected') }} </span>
            </button>
          </nav-top-general>
        </template>
        <sales-table
          :dataTable="dataTable"
          :loading="loading"
          :paginated="paginated"
          @delete-all="onDeleteAll"
          @delete-item="onDeleteItem"
          @checked-rows="selectedRows"
        />
      </card-component>
      <modal-box
        :is-active="isModalActive"
        :trash-object-name="trashObjectName"
        @confirm="trashConfirm"
        @cancel="trashCancel"
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
import HeroBar from '@/components/HeroBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import NavTopMenu from '@/components/Content/NavTopMenu'
import ModalBox from '@/components/ModalBox'
import NewModal from '@/components/Content/NewModal.vue'
import NavTopGeneral from '~/components/Content/NavTopGeneral.vue'
import SalesTable from '@/components/Content/Sales/SalesTable.vue'

export default {
  name: 'Sales',
  head() {
    return {
      title: `${this.$t('nav.sales')} — ${this.$t('messages.title')}`,
    }
  },
  components: {
    HeroBar,
    CardComponent,
    NavTopMenu,
    ModalBox,
    NewModal,
    NavTopGeneral,
    SalesTable,
  },
  data() {
    return {
      deleteAll: false,
      dataTable: [],
      perPage: 10,
      paginated: false,
      loading: false,
      isLoading: false,
      trashObject: null,
      isDeleteActive: false,
      isModalActive: false,
      parseCsv: null,
      selected: null,
    }
  },
  computed: {
    trashObjectName() {
      if (this.trashObject) {
        return this.trashObject.name
      }
    },
    warehouseID() {
      return this.$store.state.companies.company_id
    },
  },
  mounted() {
    this.loadAsyncData()
  },
  methods: {
    selectedRows(val) {
      this.selected = val
    },

    async loadAsyncData() {
      this.loading = true
      await this.$axios
        .get(`/sales`, {
          params: {
            _limit: -1,
            'warehouse.id': this.warehouseID,
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
    onDeleteAll(val) {
      this.deleteAll = val
    },
    // Update methdos
    async updateProduct(id) {
      console.log('updatee')
    },

    // end update methods

    // delete functions
    onDeleteItem(val) {
      this.trashObject = val
      this.isModalActive = true
    },

    async trashConfirm() {
      this.loading = true
      await this.$axios
        .delete(`/sales/${this.trashObject.id}`, {
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
      const payload = this.deleteAll.map((x) => x.id)
      await this.$axios
        .post('/sales/deleteAll', payload, {
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
  },
}
</script>

<style>
</style>