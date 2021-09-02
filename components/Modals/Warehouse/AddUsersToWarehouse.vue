<template>
  <b-modal :active.sync="isNewModalActive" :width="720" scroll="keep">
    <div class="">
      <header class="modal-card-head">
        <p class="modal-card-title header-title">
          <b>{{ title }}</b>
        </p>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="saveUserMagazine()">
          <div class="columns">
            <div class="column">
              <b-field label="Please select an warehouse">
                <b-select
                  :placeholder="$t('nav.warehouses')"
                  icon="account"
                  v-model="warehouse_id"
                  expanded
                  required
                >
                  <option
                    v-for="option in allWarehouses"
                    :value="option.id"
                    :key="option.id"
                  >
                    {{ option.name }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Please select an user">
                <b-select
                  :placeholder="$t('nav.users')"
                  icon="account"
                  v-model="user_id"
                  expanded
                  required
                >
                  <option
                    v-for="option in allUsers"
                    :value="option.id"
                    :key="option.id"
                  >
                    {{ option.full_name }}
                  </option>
                </b-select>
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
        </form>
      </section>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'AddUsersToWarehouse',
  data() {
    return {
      isNewModalActive: false,
      allUsers: [],
      allWarehouses: [],
      user_id: null,
      warehouse_id: null,
    }
  },
  watch: {
    isActiveNew(newValue) {
      this.isNewModalActive = newValue
    },
    isNewModalActive(newValue) {
      if (!newValue) {
        this.cancel()
      }
    },
  },
  mounted() {
    this.getWarehouses().then(() => {
      this.getUsers()
    })
  },
  methods: {
    async saveUserMagazine() {
      const payload = {
        user: this.user_id,
      }
      await this.$axios
        .put(`/warehouses/${this.warehouse_id}`, payload, {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.cancel()
          this.$buefy.snackbar.open({
            message: `${this.$t('messages.updated', {
              name: res.data.name,
            })}`,
            queue: false,
          })
        })
    },
    cancel() {
      this.$emit('cancel')
    },
    // saveUserMagazine() {
    //   this.$emit('confirm')
    // },
    async getUsers() {
      this.$axios
        .get('/users', {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          let refined = res.data.map((x) => {
            const datas = {}
            datas.id = x.id
            datas.full_name = x.full_name
            return datas
          })
          this.allUsers = refined
        })
    },
    async getWarehouses() {
      this.$axios
        .get('/warehouses', {
          headers: {
            Authorization: `Bearer ${this.$auth.strategy.token.get()}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          this.allWarehouses = res.data
        })
    },
  },
  props: {
    isActiveNew: {
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

<style scoped>
.header-title {
  font-size: 1.25rem;
  text-align: center;
  text-transform: capitalize;
}
.modal-card-foot {
  display: flex;
  justify-content: space-between;
}
.modal-card-body {
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border-bottom: 1px solid #f1f2f2;
}
</style>