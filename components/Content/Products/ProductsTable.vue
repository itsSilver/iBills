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
        v-slot="props"
      >
        {{ props.row.code }}
      </b-table-column>
      <b-table-column
        :label="$t('table.barcode')"
        field="barcode"
        sortable
        v-slot="props"
      >
        {{ props.row.barcode }}
      </b-table-column>
      <b-table-column
        :label="$t('table.name')"
        field="name"
        sortable
        v-slot="props"
      >
        {{ props.row.name }}
      </b-table-column>
      <b-table-column
        :label="$t('table.category')"
        field="category"
        sortable
        v-slot="props"
      >
        {{ props.row.category }}
      </b-table-column>
      <b-table-column :label="$t('table.cost')" field="cost" v-slot="props">
        {{ formatPrice(props.row.cost) }}
      </b-table-column>
      <b-table-column :label="$t('table.sale')" field="cost" v-slot="props">
        {{ formatPrice(props.row.sale) }}
      </b-table-column>

      <b-table-column
        :label="$t('table.tax_code')"
        field="tax_code"
        v-slot="props"
      >
        <span v-if="props.row.vat">
          {{ props.row.vat }}
        </span>
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
export default {
  name: 'ProductsTable',
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
      this.$router.push(this.localePath(`/products/${id}`))
    },
    updateProduct(id) {
      this.$router.push(this.localePath(`/products/${id}`))
    },
    trashModal(val) {
      this.$emit('delete-item', val)
    },
    formatPrice(value) {
      return `${value} €`
    },
  },

  props: ['dataTable', 'loading', 'paginated'],
}
</script>

<style scoped>
.input-clean {
  max-width: 90px;
}
</style>