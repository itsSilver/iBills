<template>
  <b-modal
    :active.sync="mainDrawerActive"
    width="100%"
    scroll="keep"
    class="main-drawer-modal"
  >
    <div class="container">
      <div class="columns">
        <div class="column">
          <menu-main-single
            :title="$t('nav.dashboard')"
            toLink="/"
            @close-main-drawer="cancel"
          >
            <dashboard-icon />
          </menu-main-single>
        </div>
        <div class="column">
          <menu-main-single
            :title="$t('nav.warehouses')"
            toLink="warehouses"
            @close-main-drawer="cancel"
          >
            <warehouse-icon />
          </menu-main-single>
        </div>
        <div class="column">
          <menu-main-single
            :title="$t('nav.products')"
            toLink="products"
            @close-main-drawer="cancel"
          >
            <products-icon />
          </menu-main-single>
        </div>
        <div class="column">
          <menu-main-single
            :title="$t('nav.pos')"
            toLink="pos"
            @close-main-drawer="cancel"
          >
            <pos-logo />
          </menu-main-single>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <menu-main-single
            :title="$t('nav.accounting')"
            toLink="accounting"
            @close-main-drawer="cancel"
          >
            <accounting-icon />
          </menu-main-single>
        </div>
        <div class="column">
          <menu-main-single
            :title="$t('nav.reports')"
            toLink="reports"
            @close-main-drawer="cancel"
          >
            <reports-icon />
          </menu-main-single>
        </div>
        <div class="column">
          <menu-main-single
            :title="$t('nav.alarms')"
            toLink="alarms"
            @close-main-drawer="cancel"
          >
            <alarms-icon />
          </menu-main-single>
        </div>
        <div class="column">
          <menu-main-single
            :title="$t('nav.settings')"
            toLink="settings"
            @close-main-drawer="cancel"
          >
            <settings-icon />
          </menu-main-single>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
import MenuMainSingle from '@/components/Content/MenuMainSingle.vue'
import DashboardIcon from '../Logos/DashboardIcon.vue'
import WarehouseIcon from '../Logos/WarehouseIcon.vue'
import ProductsIcon from '../Logos/ProductsIcon.vue'
import PosLogo from '../Logos/PosLogo.vue'
import AccountingIcon from '../Logos/AccountingIcon.vue'
import ReportsIcon from '../Logos/ReportsIcon.vue'
import AlarmsIcon from '../Logos/AlarmsIcon.vue'
import SettingsIcon from '../Logos/SettingsIcon.vue'
export default {
  components: {
    MenuMainSingle,
    DashboardIcon,
    WarehouseIcon,
    ProductsIcon,
    PosLogo,
    AccountingIcon,
    ReportsIcon,
    AlarmsIcon,
    SettingsIcon,
  },
  data() {
    return {
      mainDrawerActive: false,
    }
  },
  watch: {
    isActiveDrawer(newValue) {
      this.mainDrawerActive = newValue
    },
    mainDrawerActive(newValue) {
      if (!newValue) {
        this.cancel()
      }
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
  },
  props: {
    isActiveDrawer: {
      type: Boolean,
      default: false,
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
}
</style>