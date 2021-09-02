<template>
  <card-component>
    <div class="level is-mobile cursor-pointer" @click="openLink">
      <div class="level-item">
        <div class="is-widget-label">
          <h3 class="subtitle is-spaced">
            {{ label }}
          </h3>
          <h1 class="title">
            <growing-number :value="number" :prefix="prefix" :suffix="suffix" />
          </h1>
        </div>
      </div>
      <div v-if="icon" class="level-item has-widget-icon">
        <div class="is-widget-icon">
          <b-icon :icon="icon" size="is-large" :type="type" />
        </div>
      </div>
    </div>
  </card-component>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import GrowingNumber from '@/components/GrowingNumber'
export default {
  name: 'CardWidget',
  components: { GrowingNumber, CardComponent },
  props: {
    icon: {
      type: String,
      default: null,
    },
    number: {
      type: Number,
      default: 0,
    },
    prefix: {
      type: String,
      default: null,
    },
    suffix: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    toLink: {
      type: String,
      default: null,
    },
  },
  methods: {
    openLink() {
      console.log('link', this.toLink)
      this.$router.push(this.localePath(this.toLink))
    },
  },
}
</script>
<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
