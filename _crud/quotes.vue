<template></template>

<script>
export default {
  data() {
    return {
      crudId: this.$uid()
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        //entityName: config("main.qcommerce.entityNames.productCategory"),
        apiRoute: 'apiRoutes.qcommerce.orders',
        permission: 'icommerce.quotes',
        //extraFormFields: 'Icommerce.crud-fields.productCategories',
        create: {
          to: {name: 'qcommerce.admin.quotes.create'}
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', align: 'left'},
            {
              name: 'customer', label: this.$tr('isite.cms.form.name'), align: 'left',
              format: (val, row) => `${row.firstName} ${row.lastName}`
            },
            {
              name: 'total',
              label: this.$tr('icommerce.cms.form.total'),
              field: 'total',
              align: 'left',
              format: val => val ? `$${this.$trn(val)}` : ''
            },
            {name: 'statusName', label: this.$tr('isite.cms.form.status'), field: 'statusName',align: 'left'},
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'right',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'updated_at', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'right',
              format: val => val ? this.$trd(val) : '-',
            }
          ],
          requestParams: {
            filter: {type: 'quote'}
          }
        },
        update: false,
        delete: false
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  }
}
</script>
