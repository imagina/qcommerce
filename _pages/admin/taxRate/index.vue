<template>
  <div id="pageId">
    <!---Component CRUD-->
    <crud :crud-data="import('modules/qcommerce/_crud/taxRates')" />
  </div>
</template>
<script>
  export default {
    props: {},
    components: {},
    watch: {},
    validations() {
      return {}
    },
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>
<style lang="scss">
</style>
