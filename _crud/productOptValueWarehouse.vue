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
        entityName: config("main.qcommerce.entityNames.productoptionvaluewarehouses"),
        apiRoute: 'apiRoutes.qcommerce.productOptionValueWarehouse',
        permission: 'icommerce.productoptionvaluewarehouses',
        extraFormFields: 'Icommerce.crud-fields.productoptionvaluewarehouses',
        create: {
          title: this.$tr('icommerce.cms.warehouse'),
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {
              name: 'option', label: this.$tr('isite.cms.form.option'), field: 'productOptionValue',
              format: val => val.option.description, align: 'left',
            },
            {
              name: 'value', label: this.$tr('icommerce.cms.form.optionValue'), field: 'productOptionValue',
              format: val => val.optionValue.description, align: 'left',
            },
            {
              name: 'warehouse',
              label: this.$tr('isite.cms.form.warehouse'),
              field: 'warehouse',
              align: 'left',
              format: val => val.title || ''
            },
            {name: 'quantity', label: this.$tr('isite.cms.form.quantity'), field: 'quantity', align: 'left'},
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {
            include: 'warehouse',
            filter: {},
          },
          filters: {}
        },
        update: {
          title: this.$tr('icommerce.cms.updateWarehouse'),
          requestParams: {include: 'warehouse'}
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          userId: {value: this.$store.state.quserAuth.userId},
          warehouseId: {
            value: null,
            type: 'select',
            required: true,
            props: {
              label: `${this.$tr('isite.cms.form.warehouse')}*`
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qcommerce.warehouses'
            }
          },
          quantity: {
            value: '',
            type: 'input',
            required: true,
            props: {
              label: `${this.$tr('isite.cms.form.quantity')}*`,
            }
          }
        }
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  }
}
</script>
