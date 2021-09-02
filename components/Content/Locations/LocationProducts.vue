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

      <b-table-column :label="$t('table.cost')" field="cost" v-slot="props">
        <client-only>
          <currency-input
            :value="props.row.cost"
            class="custom-input is-small"
            disabled
            field="cost"
          />
        </client-only>
      </b-table-column>
      <b-table-column :label="$t('table.sale')" field="cost" v-slot="props">
        <client-only>
          <currency-input
            :value="props.row.sale"
            class="custom-input is-small"
            disabled
            field="sale"
          />
        </client-only>
      </b-table-column>
      <!-- <b-table-column
        :label="$t('table.tax_code')"
        field="tax_code"
        v-slot="props"
      >
        <span v-if="props.row.product.tax">
          {{ props.row.tax }}
        </span>
      </b-table-column>
      <b-table-column
        :label="$t('table.expiration')"
        field="expiration"
        v-slot="props"
      >
        <span v-if="props.row.expiration" class="tag date-expirations">
          {{ filterDate(props.row.expiration) }}
        </span>
      </b-table-column> -->

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
          <!-- <button
            class="button is-warning"
            type="button"
            @click.prevent="updateProduct(props.row.id)"
          >
            <b-icon icon="account-edit" />
          </button> -->
          <!-- <button
            class="button is-danger"
            type="button"
            @click.prevent="trashModal(props.row)"
          >
            <b-icon icon="trash-can" />
          </button> -->
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
  name: 'LocationProducts',
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
        .get('/products', {
          params: {
            location: this.$route.params.id,
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
</style>