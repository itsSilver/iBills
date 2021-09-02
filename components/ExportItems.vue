<template>
  <b-dropdown aria-role="list" position="is-bottom-left">
    <template #trigger>
      <b-button
        :label="$t('navtop.export')"
        type="is-blue"
        icon-left="export"
        size="is-small"
      />
    </template>
    <b-dropdown-item aria-role="listitem" @click="exportProductsCsv">
      <div class="media">
        <b-icon class="media-left" icon="file-delimited"></b-icon>
        <div class="media-content">
          {{ $t('navtop.csv') }}
        </div>
      </div>
    </b-dropdown-item>
    <b-dropdown-item aria-role="listitem" @click="exportProductsPdf">
      <div class="media">
        <b-icon class="media-left" icon="file-pdf"></b-icon>
        <div class="media-content">
          {{ $t('navtop.pdf') }}
        </div>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  name: 'ExportItems',
  data() {
    return {
      parseCsv: null,
      selected: [],
      unparsedResults: null,
      downloadPDF: null,
    }
  },
  watch: {
    unparsedResults(current) {
      if (current) {
        console.log(current)
      }
    },
  },

  methods: {
    exportProductsCsv() {
      this.unparsedResults = this.$papa.unparse(this.rows, {
        delimiter: ',',
      })
      this.$papa.download(this.unparsedResults, 'sosaa')
    },
    exportProductsPdf() {
      console.log('downlaod')
    },
  },
  props: ['title', 'rows'],
}
</script>
