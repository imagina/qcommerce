<template></template>
<script>
export default {
  computed: {
    crudData() {
      return {
        entityName: config("main.qcommerce.entityNames.orderStatuses"),
        apiRoute: 'apiRoutes.qcommerce.orderStatus',
        permission: 'icommerce.orderstatuses',
        create: false,
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id'},            
            {name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'left',
              format: val => val ? val : '-',
            },
            {name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status'},
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'right',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'updated_at', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'right',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'right'},
          ],
          actions: [            
          ],
          filters: {            
          }
        },
        update: {
          title: this.$tr('icommerce.cms.updateOrderStatus')
        },
        delete: false,
        formLeft: {
          id: { value: '' },
          userId: { value: this.$store.state.quserAuth.userId },
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ]
            }
          },
          status: {
            value: '1',
            type: 'select',
            isTranslatable: false,
            props: {
              label: `${this.$tr('isite.cms.form.status')}*`,
              options: [
                {label: this.$tr('isite.cms.label.enabled'), value: '1'},
                {label: this.$tr('isite.cms.label.disabled'), value: '0'}
              ],
            }
          }
        }
      }
    }
  }
}
</script>
