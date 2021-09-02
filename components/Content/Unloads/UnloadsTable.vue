<template>
  <div class="table-main">
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
      class="products-table"
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
        :label="$t('table.date')"
        field="date"
        sortable
        searchable
        v-slot="props"
      >
        {{ filterDate(props.row.date) }}
      </b-table-column>
      <b-table-column
        :label="$t('table.customer')"
        field="customer"
        searchable
        v-slot="props"
      >
        <span>
          {{ props.row.customer }}
        </span>
      </b-table-column>
      <b-table-column
        :label="$t('table.products')"
        field="products"
        v-slot="props"
      >
        <span>
          {{ props.row.products }}
        </span>
      </b-table-column>
      <b-table-column :label="$t('table.total')" field="total" v-slot="props">
        <client-only>
          <currency-input
            :value="props.row.total"
            class="input is-small total-input"
            name="total"
            disabled
          />
        </client-only>
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
            @click.prevent="viewProduct(props.row.id)"
          >
            <b-icon icon="eye" size="is-small" />
          </button>
          <button
            class="button is-warning is-small"
            type="button"
            @click.prevent="updateProduct(props.row.id)"
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
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'UnloadsTable',
  data() {
    return {
      total: 0,
      page: 1,
      perPage: 10,
      checkboxPosition: 'left',
      checkedRows: [],
    }
  },
  watch: {
    checkedRows: function (val) {
      if (val.length !== 0) {
        this.deleteAll = true
        this.$emit('delete-all', this.deleteAll)
        this.$emit('checked-rows', val)
      } else {
        this.deleteAll = false
        val = null
        this.$emit('checked-rows', val)
        this.$emit('delete-all', this.deleteAll)
      }
    },
  },
  methods: {
    viewProduct(id) {
      this.$router.push(this.localePath(`/unloads/${id}`))
    },
    updateProduct(id) {
      this.$router.push(this.localePath(`/unloads/${id}`))
    },
    trashModal(val) {
      this.$emit('delete-item', val)
    },
    formatPrice(value) {
      return `${value} €`
    },
    filterDate(val) {
      return dayjs(val).format(`${this.$config.dateFormat}`)
    },
  },

  props: ['dataTable', 'loading', 'paginated'],
}
</script>

<style scoped>
.input-clean {
  max-width: 90px;
}
.input.is-small.total-input {
  background-color: #ffe08a;
  border-color: transparent;
  color: rgba(0, 0, 0);
}
td input {
  max-width: 100px !important;
}
</style>