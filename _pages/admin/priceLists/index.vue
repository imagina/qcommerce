<template>
  <div id="pageId" class="q-layout-page layout-padding">
    <!---Component CRUD-->
    <crud :crud-data="import('modules/qcommerce/_crud/priceLists')" />
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped>

</style>
