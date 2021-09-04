<template>
  <div class="px-4 py-4">
    <form @submit.prevent="submit">
      <div class="columns">
        <div class="column">
          <b-field :label="$t('table.name')">
            <b-input
              v-model="prod.name"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.name')}`,
                })
              "
              name="name"
              required
              disabled
              size="is-small"
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.code')">
            <b-input
              v-model="prod.code"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.code')}`,
                })
              "
              name="code"
              required
              disabled
              size="is-small"
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.barcode')">
            <b-input
              v-model="prod.barcode"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.barcode')}`,
                })
              "
              name="barcode"
              required
              disabled
              size="is-small"
            />
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field :label="$t('table.cost')">
            <client-only>
              <currency-input
                :currency="currency"
                v-model="prod.cost"
                class="input"
                required
                :placeholder="
                  $t('messages.placeholder', {
                    name: `${$t('table.cost')}`,
                  })
                "
                disabled
                size="is-small"
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
                :currency="currency"
                v-model="prod.cost_tolerance"
                class="input"
                required
                :placeholder="
                  $t('messages.placeholder', {
                    name: `${$t('table.cost-tolerance')}`,
                  })
                "
                disabled
                size="is-small"
              />
            </client-only>
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.sale')">
            <client-only>
              <currency-input
                :currency="currency"
                v-model="prod.sale"
                class="input is-small"
                required
                :placeholder="
                  $t('messages.placeholder', {
                    name: `${$t('table.sale')}`,
                  })
                "
                disabled
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
              v-model="prod.min_qty"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.min-qty')}`,
                })
              "
              name="min_qty"
              size="is-small"
              disabled
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
              v-model="prod.max_qty"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.max-qty')}`,
                })
              "
              name="max_qty"
              size="is-small"
              disabled
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.qty_package')">
            <b-input
              v-model="prod.qty_package"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.qty_package')}`,
                })
              "
              name="qty_package"
              size="is-small"
              disabled
            />
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field :label="$t('table.category')">
            <b-input
              v-model="prod.category"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.category')}`,
                })
              "
              name="category"
              size="is-small"
              disabled
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.unit')">
            <b-input
              v-model="prod.unit"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.unit')}`,
                })
              "
              name="unit"
              size="is-small"
              disabled
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.vat')">
            <b-input
              v-model="prod.vat"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.vat')}`,
                })
              "
              name="vat"
              size="is-small"
              disabled
            />
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field :label="$t('table.supplier')">
            <b-input
              v-model="prod.supplier"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.supplier')}`,
                })
              "
              name="supplier"
              size="is-small"
              required
              disabled
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.location')">
            <b-input
              v-model="prod.location"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.location')}`,
                })
              "
              name="location"
              size="is-small"
              required
              disabled
            />
          </b-field>
        </div>
        <div class="column">
          <b-field :label="$t('table.type')">
            <b-input
              v-model="prod.type"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.type')}`,
                })
              "
              name="type"
              required
              size="is-small"
              disabled
            />
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-field :label="$t('table.note')">
            <b-input
              v-model="prod.note"
              :placeholder="
                $t('messages.placeholder', {
                  name: `${$t('table.note')}`,
                })
              "
              name="note"
              type="textarea"
              size="is-small"
              disabled
            />
          </b-field>
        </div>
      </div>
      <hr />
      <b-field>
        <!-- <div class="control">
          <b-button native-type="submit" type="is-primary"> Submit </b-button>
        </div> -->
      </b-field>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProductForm',
  props: ['product'],
  data() {
    return {
      prod: [],
    }
  },
  watch: {
    product: {
      immediate: true,
      handler(val) {
        this.prod = val
      },
    },
  },
  computed: {
    currency() {
      return this.$store.state.currency
    },
  },
  methods: {
    submit() {},
  },
}
</script>

<style>
</style>