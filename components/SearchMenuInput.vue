<template>
  <b-autocomplete
    :data="data"
    :placeholder="`${$t('help.list.search')} ...`"
    v-model="name"
    :loading="isFetching"
    @typing="getAsyncData"
    @select="onSelect"
    clearable
    icon="magnify"
  >
    <template slot-scope="props">
      <div class="media">
        <div class="media-content">
          <b>{{ props.option.name }}</b>
          <br />
          <small>
            {{ $t('table.category') }}: <b>{{ props.option.category }}</b>
          </small>
        </div>
      </div>
    </template>

    <template #footer>
      <a @click="showAddProduct" class="add-new search-nav-item block">
        <b-icon icon="plus" size="is-small"> </b-icon>
        <span> {{ $t('messages.add-new') }}... </span>
      </a>
    </template>
    <template #empty>{{ $t('messages.no_results') }} {{ name }}</template>
  </b-autocomplete>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false,
      name: '',
    }
  },
  methods: {
    // You have to install and import debounce to use it,
    // it's not mandatory though.
    getAsyncData: debounce(function (name) {
      if (!name.length) {
        this.data = []
        return
      }
      this.isFetching = true
      this.$axios
        .get(
          `/products/lowData?_where[_or][0][name_contains]=${name}&_where[_or][1][barcode_contains]=${name}`,
          {
            params: {
              _limit: -1,
            },
            headers: {
              Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(({ data }) => {
          this.data = data
        })
        .catch((error) => {
          this.data = []
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    }, 500),
    showAddProduct() {
      this.$router.push(this.localePath(`/products/create?title=${this.name}`))
    },
    onSelect(val) {
      this.$router.push(this.localePath(`/products/${val.id}`))
    },
  },
}
</script>