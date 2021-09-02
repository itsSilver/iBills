<template>
  <div class="table-main">
    <b-table
      :loading="loading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="expiration"
      :data="dataTable"
      class="products-table"
    >
      <b-table-column :label="$t('table.quantity')" field="qty" v-slot="props">
        {{ props.row.qty }}
      </b-table-column>
      <b-table-column :label="$t('table.price')" field="price" v-slot="props">
        <client-only>
          <currency-input
            :value="props.row.price"
            class="custom-input is-small"
            disabled
            field="price"
          />
        </client-only>
      </b-table-column>
      <b-table-column
        :label="$t('table.tax_code')"
        field="tax"
        sortable
        v-slot="props"
      >
        {{ props.row.tax }}
      </b-table-column>

      <b-table-column :label="$t('table.total')" field="total" v-slot="props">
        <client-only>
          <currency-input
            :value="props.row.total"
            class="custom-input is-small"
            disabled
            field="total"
          />
        </client-only>
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
        <span v-if="props.row.expiration" class="tag date-expirations">
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
  name: 'ProductLocations',
  data() {
    return {
      total: 0,
      page: 1,
      perPage: 10,
      checkboxPosition: 'left',
      checkedRows: [],
      dataTable: [],
      loading: false,
      paginated: false,
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
  mounted() {
    this.getProducts().then(() => {
      this.filterExpiration()
    })
  },

  methods: {
    async getProducts() {
      this.loading = true
      await this.$axios
        .get('/loaddetails/byproduct', {
          params: {
            'product.id': this.$route.params.id,
          },
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.loading = false
          this.dataTable = res.data
          this.$emit('total-cost', res.data.totalCost)
          this.$emit('total-sale', res.data.totalSale)
          if (this.dataTable.length > this.perPage) {
            this.paginated = true
          }
        })
    },
    viewProduct(id) {
      this.$router.push(this.localePath(`/products/${id}`))
    },

    formatPrice(value) {
      return `${value} €`
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