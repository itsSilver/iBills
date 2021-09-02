<template></template>

<script>
export default {
  data() {
    return {
      socket: '',
    }
  },
  async created() {
    // this.socket = this.$nuxtSocket({})
    // this.socket.emit('disconnect')

    await this.$auth.logout()
  },
}
</script>