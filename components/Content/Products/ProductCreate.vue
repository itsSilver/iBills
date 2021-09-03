<template>
  <div class="px-4 py-4">
    <form @submit.prevent="submit">
      <div class="columns">
        <div class="column">
          <b-field :label="$t('table.name')">
            <b-input
              v-model="form.name"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.name')}`,
                })
              "
              name="name"
              size="is-small"
              required
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.code')">
            <b-input
              v-model="form.code"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.code')}`,
                })
              "
              name="code"
              size="is-small"
              required
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.barcode')">
            <b-input
              v-model="form.barcode"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.barcode')}`,
                })
              "
              name="barcode"
              size="is-small"
              type="number"
            />
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field :label="$t('table.cost')">
            <client-only>
              <currency-input
                v-model="form.cost"
                class="input is-small"
                required
                :placeholder="
                  $t('messages.placeholder', {
                    name: `${$t('table.cost')}`,
                  })
                "
                name="cost"
              />
            </client-only>
          </b-field>
        </div>
        <div class="column">
          <b-field
            :label="$t('table.cost-tolerance')"
            :message="`${$t('table.optional')} : ${$t(
              'product.price-tolerance.message'
            )}`"
          >
            <client-only>
              <currency-input
                v-model="form.cost_tolerance"
                ref="cost_tolerance"
                class="input is-small"
                :placeholder="
                  $t('messages.placeholder', {
                    name: `${$t('table.cost-tolerance')}`,
                  })
                "
                name="cost_tolerance"
              />
            </client-only>
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.sale')">
            <client-only>
              <currency-input
                v-model="form.sale"
                class="input is-small"
                :placeholder="
                  $t('messages.placeholder', {
                    name: `${$t('table.sale')}`,
                  })
                "
                name="sale"
              />
            </client-only>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field
            :label="$t('table.min-qty')"
            :message="`${$t('table.optional')} : ${$t(
              'product.min-qty.message'
            )}`"
          >
            <b-input
              v-model="form.min_qty"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.min-qty')}`,
                })
              "
              name="min_qty"
              size="is-small"
            />
          </b-field>
        </div>
        <div class="column">
          <b-field
            :label="$t('table.max-qty')"
            :message="`${$t('table.optional')} : ${$t(
              'product.max-qty.message'
            )}`"
          >
            <b-input
              v-model="form.max_qty"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.max-qty')}`,
                })
              "
              name="max_qty"
              size="is-small"
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.qty_package')">
            <b-input
              v-model="form.qty_package"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.qty_package')}`,
                })
              "
              name="qty_package"
              size="is-small"
            />
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field :label="$t('table.category')">
            <client-only>
              <treeselect
                :options="categoryOptions"
                :placeholder="
                  $t('messages.placeholder', {
                    name: `${$t('table.category')}`,
                  })
                "
                v-model="categoryID"
                :normalizer="normalizer"
                required
                class="is-small"
              />
            </client-only>
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.unit')">
            <b-autocomplete
              v-model="selectedUnit"
              open-on-focus
              ref="autocompleteUnit"
              :loading="loadingUnit"
              :data="unitData"
              @typing="filteredUnit"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.unit')}`,
                })
              "
              field="name"
              @select="onSelectUnit"
              @focus="onFocusUnit"
              size="is-small"
            >
              <template slot-scope="props">
                <div class="media">
                  <div class="media-content">
                    <p>
                      <b>{{ props.option.name }}</b>
                      <br />

                      {{ $t('table.abbv') }}:
                      <b>{{ props.option.abbv }}</b>
                    </p>
                  </div>
                </div>
              </template>

              <template #empty
                >{{ $t('messages.no_results') }} {{ selectedUnit }}</template
              >
            </b-autocomplete>
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.vat')">
            <b-select
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.vat')}`,
                })
              "
              v-model="vatID"
              name="vat"
              expanded
              size="is-small"
            >
              <option
                v-for="vat in vatRateOptions"
                :key="vat.id"
                :value="vat.id"
              >
                {{ vat.tax_code }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field :label="$t('table.supplier')">
            <b-autocomplete
              v-model="selectedSupplier"
              open-on-focus
              ref="autocompleteSupplier"
              :loading="loadingSupplier"
              :data="supplierData"
              @typing="filteredSupplier"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.supplier')}`,
                })
              "
              field="name"
              @select="onSelectSupplier"
              @focus="onFocusSupplier"
              size="is-small"
            >
              <template slot-scope="props">
                <div class="media">
                  <div class="media-content">
                    <p>
                      <b>{{ props.option.name }}</b>
                      <br />

                      {{ $t('table.phone_number') }}:
                      <b>{{ props.option.phone_mobile }}</b>
                    </p>
                  </div>
                </div>
              </template>
              <template #header> </template>
              <template #empty
                >{{ $t('messages.no_results') }}
                {{ selectedSupplier }}</template
              >
            </b-autocomplete>
          </b-field>
        </div>

        <div class="column">
          <b-field :label="$t('table.type')">
            <b-select
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.type')}`,
                })
              "
              v-model="productType"
              name="type"
              expanded
              required
              size="is-small"
            >
              <option
                v-for="(type, index) in productTypeOptions"
                :key="index"
                :value="type"
                class="text-capitalize"
              >
                {{ type }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field :label="$t('table.note')">
            <b-input
              v-model="form.note"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.note')}`,
                })
              "
              name="note"
              type="textarea"
              size="is-small"
            />
          </b-field>
        </div>
      </div>
      <hr />
      <b-field>
        <div class="control">
          <b-button native-type="submit" type="is-primary is-small">
            {{ $t('navtop.create') }}
          </b-button>
        </div>
      </b-field>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProductCreate',
  data() {
    return {
      form: {},
      unitData: [],
      supplierData: [],
      categoryOptions: [],
      vatRateOptions: [],
      productTypeOptions: ['warehouse', 'expenses'],
      productType: 'warehouse',
      categoryID: null,
      unitID: null,
      supplierID: null,
      vatID: null,
      selectedUnit: null,
      loadingUnit: false,
      openFocusUnit: false,
      selectedSupplier: null,
      loadingSupplier: false,
      openFocusSupplier: false,
    }
  },
  mounted() {
    this.getCategories()
    this.getVatRates()
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        this.$emit('form-data', val)
      },
    },
  },
  methods: {
    async submit() {
      if (this.form.cost_tolerance < this.form.cost) {
        this.$buefy.dialog.alert({
          title: 'Error',
          message: `${this.$t('errors.cost-tolerance')}`,
          type: 'is-danger',
          hasIcon: true,
          icon: 'close-circle',
          ariaRole: 'alertdialog',
          ariaModal: true,
        })
        this.$refs.cost_tolerance.$el.focus()
        return
      }
      this.form.category = this.categoryID
      this.form.supplier = this.supplierID
      this.form.type = this.productType
      this.form.vat = this.vatID
      this.form.unit = this.unitID
      await this.$axios
        .post('/products', this.form, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          console.log('res', res.data)
          this.$buefy.snackbar.open({
            message: `${this.$t('messages.created', {
              name: resp.data.name,
            })}`,
            queue: false,
          })
        })
        .catch((err) => {
          console.log('err', err.data)
        })
    },

    onSelectUnit(val) {
      this.unitID = val
    },
    onSelectSupplier(val) {
      this.supplierID = val
    },
    async onFocusUnit() {
      this.loadingUnit = true
      await this.$axios
        .get('/units', {
          params: {
            _limit: -1,
          },
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.loadingUnit = false
          this.unitData = res.data
        })
    },
    async onFocusSupplier() {
      this.loadingSupplier = true
      await this.$axios
        .get('/suppliers', {
          params: {
            _limit: -1,
          },
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.loadingSupplier = false
          this.supplierData = res.data
        })
    },

    filteredUnit(val) {
      let filtered = this.unitData.filter((name) => {
        return (
          name.name.toString().toLowerCase().indexOf(val.toLowerCase()) >= 0
        )
      })

      if (val === '') {
        this.onFocusUnit()
      }
      this.unitData = filtered
      return this.unitData
    },

    filteredSupplier(val) {
      let filtered = this.supplierData.filter((name) => {
        return (
          name.name.toString().toLowerCase().indexOf(val.toLowerCase()) >= 0
        )
      })

      if (val === '') {
        this.onFocusSupplier()
      }
      this.supplierData = filtered
      return this.supplierData
    },
    normalizer(node) {
      return {
        id: node.id,
        label: node.name,
        children: node.children,
      }
    },
    async getCategories() {
      this.$axios
        .get('/categories/nested', {
          params: {
            _limit: -1,
          },
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.categoryOptions = res.data
        })
    },
    async getVatRates() {
      this.$axios
        .get('/vats', {
          params: {
            _limit: -1,
          },
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.vatRateOptions = res.data
        })
    },
  },
}
</script>

<style>
</style>