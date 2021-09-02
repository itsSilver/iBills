<template>
  <div class="table-main">
    <b-table
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
        {{ props.row.product.code }}
      </b-table-column>
      <b-table-column
        :label="$t('table.barcode')"
        field="barcode"
        sortable
        v-slot="props"
      >
        {{ props.row.product.barcode }}
      </b-table-column>
      <b-table-column
        :label="$t('table.name')"
        field="name"
        sortable
        v-slot="props"
      >
        {{ props.row.product.name }}
      </b-table-column>

      <b-table-column :label="$t('table.cost')" field="cost" v-slot="props">
        <client-only>
          <currency-input
            :value="props.row.product.cost"
            class="custom-input is-small"
            disabled
            field="cost"
          />
        </client-only>
      </b-table-column>
      <b-table-column
        :label="$t('table.quantity')"
        field="category"
        sortable
        v-slot="props"
      >
        <span class="tag is-danger">
          {{ props.row.qty }}
        </span>
      </b-table-column>
      <b-table-column
        :label="$t('table.warehouse')"
        field="warehouse"
        sortable
        v-slot="props"
      >
        {{ props.row.warehouse }}
      </b-table-column>
      <b-table-column
        :label="$t('table.location')"
        field="location"
        sortable
        v-slot="props"
      >
        {{ props.row.location }}
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
            @click.prevent="viewProduct(props.row.product.id)"
          >
            <b-icon icon="eye" size="is-small" />
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
  name: 'AlarmLowStock',
  data() {
    return {
      total: 0,
      page: 1,
      perPage: 10,
      dataTable: [],
      loading: false,
      paginated: false,
    }
  },

  mounted() {
    this.getProducts()
  },

  methods: {
    async getProducts() {
      this.loading = true
      await this.$axios
        .get('/stocks/lowstock', {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.loading = false
          this.dataTable = res.data
          if (this.dataTable.length > this.perPage) {
            this.paginated = true
          }
        })
    },
    viewProduct(id) {
      this.$router.push(this.localePath(`/products/${id}`))
    },
  },
}
</script>

<style scoped>
.input-clean {
  max-width: 90px;
}
.custom-input.is-small {
  border: none;
  background: transparent;
  color: #333;
  font-weight: bold;
  max-width: 90px;
}
</style>