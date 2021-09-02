<template>
  <StreamBarcodeReader
    @decode="onDecode"
    @loaded="onLoaded"
    v-if="open"
  ></StreamBarcodeReader>
</template>

<script>
export default {
  name: 'BarcodeScaner',

  methods: {
    onDecode(val) {
      console.log('decoded', val)
    },
    onLoaded(val) {
      console.log('onLoaded', val)
    },
  },
  props: ['open'],
}
</script>

<style>
</style>