<template>
  <b-field class="file">
    <b-upload v-model="file" @input="onUpload" size="is-small">
      <a class="button is-primary is-small">
        <b-icon icon="upload" size="is-small" />
        <span>{{
          $t('navtop.import', { name: `${$t('nav.products')}` })
        }}</span>
      </a>
    </b-upload>
    <span v-if="file" class="file-name">{{ file.name }}</span>
  </b-field>
</template>

<script>
export default {
  name: 'ImportItems',
  data() {
    return {
      file: null,
      uploadPercent: 0,
      parsedResults: null,
    }
  },

  watch: {
    parsedResults(current) {
      if (current) {
        console.log('current', current)
      }
    },
  },
  methods: {
    async onUpload(val) {
      this.parsedResults = await this.$papa.parse(val, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          this.parsedResults = results.data
          console.log(this.parsedResults)
        },
      })
      // console.log('parsed', datas)
    },
    upload(file) {
      this.$emit('input', file)
      // Use this as an example for handling file uploads
      // let formData = new FormData()
      // formData.append('file', file)

      // axios
      //   .post(window.routeMediaStore, formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     },
      //     onUploadProgress: this.progressEvent
      //   })
      //   .then(r => {
      //
      //   })
      //   .catch(err => {
      //     this.$buefy.toast.open({
      //       message: `Error: ${err.message}`,
      //       type: 'is-danger'
      //     })
      //   })
    },
    progressEvent(progressEvent) {
      this.uploadPercent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
    },
  },
}
</script>
