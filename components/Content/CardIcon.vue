<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <div
            class="image is-64x64 p-2 custom-bg"
            :class="bgColor"
            :style="{ backgroundColor: bgColor }"
          >
            <slot />
          </div>
        </div>
        <div class="media-content">
          <p class="subtitle is-6">{{ title }}</p>
          <p class="title is-4">
            {{ totalValue }} <span v-if="symbol">{{ symbol }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardIcon',
  props: ['symbol', 'totalValue', 'title', 'bgColor'],
}
</script>

<style scoped>
.custom-bg {
  display: flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  border-radius: 4px;
}
.media {
  align-items: center !important;
}
</style>