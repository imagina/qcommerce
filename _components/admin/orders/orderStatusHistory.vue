<template>
  <div id="orderStatusHistoryComponent">
    <q-table
      :rows="items"
      :columns="columns"
      :pagination="{
        rowsPerPage: 0
      }" hide-bottom
      class="no-shadow">
    </q-table>
  </div>
</template>
<script>
  export default {
    props: {
      items: {
        default: () => {
          return []
        }
      }
    },
    components: {},
    watch: {},
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {
        columns: [
          {name: 'title', label: this.$tr('isite.cms.form.status'), field: row => row.status.title, align: 'left'},
          {name: 'comment', label: this.$tr('isite.cms.form.comment'), field: row => row.comment || '-', align: 'left'},
          {
            name: 'created_at',
            label: this.$trp('isite.cms.form.createdAt'),
            field: 'created_at',
            format: val => val ? this.$d(this.$moment(val, "YYYY-MM-DD HH:mm").toDate(), 'long') : "-",
            align: 'left'
          },
        ]
      }
    },
    methods: {}
  }
</script>
<style lang="scss">
</style>
