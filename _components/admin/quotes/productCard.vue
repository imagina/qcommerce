<template>
  <div id="tagetProductQuoteComponent" @click="eventBus.emit('qcommerce.quote.addProduct', row)">
    <q-card class="box box-auto-height">
      <!--Product image-->
      <img :src="row?.mediaFiles?.mainimage.mediumThumb" v-if="false">
      <!--Product Data-->
      <q-card-section class="q-py-sm">
        <!--Category-->
        <div class="ellipsis text-grey-8" :title="row.category.title">{{ row.category.title }}</div>
        <!--Name-->
        <div class="text-title ellipsis-2 q-mb-sm" :title="row.name" style="line-height: 1.2; min-height:32px">
          {{ row.name }}
        </div>
        <!--Price-->
        <b class="text-subtitle2 text-blue-grey">${{ $trn(row.price) }}</b>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { eventBus } from 'src/plugins/utils'

export default {
  props: {
    row: {default: false},
    permitAction: {default: false},
    fieldActions: {default: false}
  },
  components: {},
  watch: {},
  mounted() {
    this.$nextTick(function () {
    })
  },
  data() {
    return {
      loading: false,
      data: [],
      eventBus
    }
  },
  computed: {},
  methods: {
    init() {
    }
  }
}
</script>
<style lang="scss">
#tagetProductQuoteComponent {
  cursor: pointer;

  .box {
    padding: 0;
  }
}
</style>
