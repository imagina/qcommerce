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
        type : 'list-v',
        title: this.$tr('icommerce.cms.quickCard.productsToSoldOut'),
        icon: 'fas fa-cash-register',
        apiRoute: 'apiRoutes.qcommerce.products',
        requestParams: {
          filter: {soonToSoldOut: true},
          include : 'categories'
        },
        information: {
          image: {field: 'mediaFiles', format: val => val ? val?.mainimage.mediumThumb : null},
          text1: {
            field: 'categories',
            format: val => val ? val.map(item => {
              return item.title
            }).join(', ') : ''
          },
          text2: {field: 'name'},
          text3: {
            field: 'quantity',
            format: val => val ? `${this.$tr('isite.cms.label.quantity')}: ${val}` : ''
          },
        },
        actionTo: 'qcommerce.admin.products.index',
        itemAction: (item) => {
          this.$router.push({
            name: 'qcommerce.admin.products.edit',
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
