<template>
  <quick-card :params="quickCardParams"/>
</template>
<script>
//Component
import quickCard from 'modules/qsite/_components/master/quickCard'

export default {
  props: {},
  components: {quickCard},
  watch: {},
  mounted() {
    this.$nextTick(function () {
    })
  },
  data() {
    return {
      loading: false,
      posts: []
    }
  },
  computed: {
    quickCardParams() {
      return {
        type: 'list-v',
        title: this.$tr('icommerce.cms.quickCard.lastOrders'),
        icon: 'fas fa-cash-register',
        apiRoute: 'apiRoutes.qcommerce.orders',
        requestParams: {
          filter: {order: {way: 'desc'}}
        },
        information: {
          text1: {field: 'createdAt', format: val => this.$trd(val, {type: 'long'})},
          text2: {field: 'customer', format: val => val ? val.fullName : ''},
          text3: {format: val => val ? val.statusName : ''},
        },
        actionTo: 'qcommerce.admin.shipping.orders.index',
        itemAction: (item) => {
          this.$router.push({
            name: 'qcommerce.admin.shipping.orders.show',
            params: {id: item.id}
          })
        }
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss">
</style>
