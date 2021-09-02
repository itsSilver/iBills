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
      <b-table-column :label="$t('table.code')" field="code" v-slot="props">
        {{ props.row.code }}
      </b-table-column>
      <b-table-column
        :label="$t('table.barcode')"
        field="barcode"
        v-slot="props"
      >
        {{ props.row.barcode }}
      </b-table-column>
      <b-table-column :label="$t('table.name')" field="name" v-slot="props">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column :label="$t('table.quantity')" field="qty" v-slot="props">
        {{ props.row.qty }}
      </b-table-column>
      <b-table-column :label="$t('table.price')" field="price" v-slot="props">
        {{ formatPrice(props.row.price) }} {{ currency }}
      </b-table-column>
      <b-table-column :label="$t('table.total')" field="total" v-slot="props">
        {{ formatPrice(props.row.total) }} {{ currency }}
      </b-table-column>
      <b-table-column
        :label="$t('table.warehouse')"
        field="warehouse"
        v-slot="props"
      >
        <span
          v-if="props.row.warehouse"
          class="cursor-pointer custom-span"
          @click="
            $router.push(localePath(`/warehouses/${props.row.warehouse.id}`))
          "
        >
          <b-icon icon="magnify" size="is-small"> </b-icon>
          {{ props.row.warehouse.name }}
        </span>
      </b-table-column>
      <b-table-column
        :label="$t('table.location')"
        field="location"
        v-slot="props"
      >
        <span
          v-if="props.row.location"
          class="cursor-pointer custom-span"
          @click="
            $router.push(localePath(`/locations/${props.row.location.id}`))
          "
        >
          <b-icon icon="magnify" size="is-small"> </b-icon>
          {{ props.row.location.name }}
        </span>
      </b-table-column>

      <b-table-column
        :label="$t('table.supplier')"
        field="supplier"
        v-slot="props"
      >
        <span
          v-if="props.row.supplier"
          class="cursor-pointer custom-span"
          @click="
            $router.push(localePath(`/suppliers/${props.row.supplier.id}`))
          "
        >
          <b-icon icon="magnify" size="is-small"> </b-icon>
          {{ props.row.supplier.name }}
        </span>
      </b-table-column>

      <b-table-column
        :label="$t('table.expiration')"
        field="expiration"
        v-slot="props"
        class="is-leftt"
      >
        <span
          v-if="props.row.expiration"
          class="tag date-expirations display-left"
        >
          {{ filterDate(props.row.expiration) }}
        </span>
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
  name: 'AlarmExpire',
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
    this.getAlarms().then(() => {
      this.filterExpiration()
    })
  },
  computed: {
    currency() {
      return this.$store.state.currency
    },
  },
  methods: {
    formatPrice(val) {
      return parseFloat(val).toFixed(2)
    },
    async getAlarms() {
      this.loading = true

      let dateSearch = new Date()
      dateSearch.setDate(dateSearch.getDate() + 30)
      dateSearch = dayjs(dateSearch).format('YYYY-MM-DD')
      await this.$axios
        .get('/loaddetails/alarms', {
          params: {
            _limit: -1,
            expiration_lte: dateSearch,
          },
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

    filterDate(val) {
      val = dayjs(val)
      val = dayjs(val).format(`${this.$config.dateFormat}`)
      return val
    },
    filterExpiration() {
      var selectAll = document.querySelectorAll('.date-expirations')
      selectAll.forEach((e) => {
        let val = e.innerText
        val = dayjs(val)
        let dateNow = new Date()
        let dateMonth = new Date(dateNow)
        dateMonth.setDate(dateMonth.getDate() + 30)
        dateNow = dayjs(dateNow)
        dateMonth = dayjs(dateMonth)
        if (val.isBefore(dateNow)) {
          e.classList.add('is-danger')
        } else if (val.isAfter(dateNow) && val.isBefore(dateMonth)) {
          e.classList.add('is-warning')
        } else if (val.isAfter(dateMonth)) {
          e.classList.add('is-success')
        }
      })
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
.custom-span {
  text-transform: capitalize;
}
tr th:last-child div {
  text-align: left !important;
  justify-content: start !important;
  padding-right: 15px;
}
</style>