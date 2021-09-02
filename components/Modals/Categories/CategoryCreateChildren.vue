<template>
  <b-modal :active.sync="isActive" :width="720" scroll="keep">
    <div class="">
      <header class="modal-card-head">
        <p class="modal-card-title header-title">
          <b>{{ title }}</b>
        </p>
      </header>
      <section class="modal-card-body">
        <div>
          <form @submit.prevent="onCreate">
            <div class="columns">
              <div class="column">
                <b-field :label="$t('table.name')">
                  <b-input
                    v-model="createData.name"
                    icon="account"
                    placeholder="Name"
                    name="name"
                    size="is-small"
                    required
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field :label="$t('table.code')">
                  <b-input
                    v-model="createData.code"
                    icon="barcode"
                    size="is-small"
                    placeholder="Code"
                    name="code"
                  />
                </b-field>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <b-field :label="$t('table.note')">
                  <b-input
                    v-model="createData.note"
                    icon="note-edit"
                    size="is-small"
                    placeholder="Note"
                    name="note"
                    type="textarea"
                  />
                </b-field>
              </div>
            </div>
            <hr />

            <div class="is-flex footer-new-modal">
              <b-button class="button is-small" type="button" @click="cancel">
                {{ $t('navtop.cancel') }}
              </b-button>

              <button type="submit" class="button is-primary is-small">
                {{ $t('navtop.create') }}
              </button>
            </div>
            <b-loading v-model="isLoading"></b-loading>
          </form>
        </div>
      </section>
    </div>
  </b-modal>
</template>

<script>
import mapValues from 'lodash/mapValues'
export default {
  name: 'CategoryCreate',
  data() {
    return {
      isActive: false,
      isLoading: false,
      createData: {
        name: null,
        code: null,
        note: null,
      },
    }
  },
  watch: {
    isModalActive(newValue) {
      this.isActive = newValue
    },
    isActive(newValue) {
      if (!newValue) {
        this.cancel()
      }
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    confirm() {
      this.$emit('confirm')
    },

    async onCreate() {
      this.isLoading = true
      const parentId = this.$route.params.id
      const payload = {
        name: this.createData.name,
        code: this.createData.code,
        note: this.createData.note,
        parent: parentId,
      }
      await this.$axios
        .post(`/categories`, payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          this.cancel()
          this.$emit('category-created', resp.data)
          this.reset()
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          console.log('err', err)
        })
    },
    reset() {
      this.createData = mapValues(this.createData, (item) => {
        if (item && typeof item === 'object') {
          return []
        }
        return null
      })
    },
  },
  props: {
    isModalActive: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
  },
}
</script>

<style>
</style>