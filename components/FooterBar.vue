<template>
  <footer class="footer c-fixed">
    <div class="footer-copyright">
      <b>&copy; {{ year }}, Online Blockchain</b> &mdash; All Copyrights
      Reserved
    </div>
  </footer>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'FooterBar',
  computed: {
    year() {
      return dayjs().year()
    },
  },
}
</script>
<style scoped>
.footer {
  background: #0d6fda;
  height: 100px;
  width: 100%;
  text-align: center;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
