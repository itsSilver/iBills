<template>
  <div class="table-main">
    <b-table
      :loading="loading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      :data="dataTransfers"
      class="products-table"
    >
      <b-table-column
        :label="$t('table.operation-type')"
        field="type"
        v-slot="props"
      >
        <span v-if="props.row.type === 'load'">
          {{ $t('content.type-load') }}
        </span>
        <span v-else>
          {{ $t('content.type-unload') }}
        </span>
      </b-table-column>
      <b-table-column :label="$t('table.code')" field="code" v-slot="props">
        {{ props.row.product.code }}
      </b-table-column>
      <b-table-column
        :label="$t('table.barcode')"
        field="barcode"
        v-slot="props"
      >
        {{ props.row.product.barcode }}
      </b-table-column>
      <b-table-column :label="$t('table.name')" field="name" v-slot="props">
        {{ props.row.product.name }}
      </b-table-column>
      <b-table-column
        :label="$t('table.quantity')"
        field="category"
        v-slot="props"
      >
        <span
          class="tag"
          :class="props.row.type === 'load' ? 'is-success' : 'is-danger'"
        >
          <b-icon
            :icon="props.row.type === 'load' ? 'plus' : 'minus'"
            size="is-small"
          >
          </b-icon>
          {{ props.row.qty }} {{ props.row.product.unit.abbv }}
        </span>
      </b-table-column>
      <b-table-column
        :label="$t('table.warehouse')"
        field="warehouse"
        v-slot="props"
      >
        {{ props.row.warehouse }}
      </b-table-column>
      <b-table-column
        :label="$t('table.location')"
        field="location"
        v-slot="props"
      >
        {{ props.row.location }}
      </b-table-column>
      <b-table-column :label="$t('table.date')" field="date" v-slot="props">
        {{ filterDate(props.row.created_at) }}
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
  name: 'LocationTransfer',
  data() {
    return {
      total: 0,
      page: 1,
      perPage: 10,

      dataTransfers: [],
      loading: false,
      paginated: false,
    }
  },

  mounted() {
    this.getTransfers()
  },

  methods: {
    async getTransfers() {
      this.loading = true
      const id = this.$route.params.id
      await this.$axios
        .get(`/locations/transfer/${id}`, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.loading = false
          this.dataTransfers = res.data

          if (this.dataTransfers.length > this.perPage) {
            this.paginated = true
          }
        })
    },

    formatPrice(value) {
      return `${value} €`
    },

    filterDate(val) {
      val = dayjs(val)
      val = dayjs(val).format(`${this.$config.dateFormat}`)
      return val
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