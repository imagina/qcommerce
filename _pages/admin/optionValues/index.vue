<template>
  <div id="pageId" class="q-layout-page layout-padding">
    <!---Component CRUD-->
    <crud :crud-data="import('modules/qcommerce/_crud/productOptionValues')" />
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
