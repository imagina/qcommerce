<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          entityName: config("main.qcommerce.entityNames.itemTypes"),
          apiRoute: 'apiRoutes.qcommerce.itemTypes',
          permission: 'icommerce.itemtypes',
          extraFormFields: 'Icommerce.crud-fields.itemTypes',
          create: {
            title: this.$tr('icommerce.cms.newItemType'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', align: 'left'},
              {name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'left'},
              {
                name: 'createdAt', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'right'},
            ],
            requestParams: {},
            filters: {},
          },
          update: {
            title: this.$tr('icommerce.cms.updateItemType'),
          },
          delete: true,
          formLeft: {
            title: {
              isTranslatable: true,
              value: '',
              type: 'input',
              props : {
                label: `${this.$tr('isite.cms.form.title')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
          },
        }
      }
    }
  }
</script>
