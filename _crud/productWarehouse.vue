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
        entityName: config("main.qcommerce.entityNames.productWarehouse"),
        apiRoute: 'apiRoutes.qcommerce.productWarehouse',
        permission: 'icommerce.productwarehouses',
        extraFormFields: 'Icommerce.crud-fields.productWarehouse',
        create: {
          title: this.$tr('icommerce.cms.form.generalWarehouse'),
        },
        read: {
          help: {
            title: this.$tr('icommerce.cms.form.generalWarehouse'),
            icon: 'fa-light fa-warehouse',
            description: this.$tr('icommerce.cms.form.generalWarehouseHelp')
          },
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {
              name: 'product',
              label: this.$tr('isite.cms.form.product'),
              field: 'product',
              align: 'left',
              format: val => val.name || ''
            },
            {
              name: 'warehouse',
              label: this.$tr('icommerce.cms.label.warehouse'),
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
            include: 'product,warehouse',
            filter: {},
          },
          filters: {
            warehouseId: {
              value: null,
              type: 'select',
              props: {
                label: `${this.$tr('icommerce.cms.label.warehouse')}`,
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qcommerce.warehouses'
              }
            }
          }
        },
        update: {
          title: this.$tr('icommerce.cms.updateWarehouse'),
          requestParams: {include: 'warehouse'}
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          userId: {value: this.$store.state.quserAuth.userId},
          productId: {
            value: null,
            type: 'select',
            required: true,
            props: {
              label: `${this.$tr('isite.cms.form.product')}*`
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qcommerce.products',
              select: {label: 'name', id: 'id'}
            }
          },
          warehouseId: {
            value: null,
            type: 'select',
            required: true,
            props: {
              label: `${this.$tr('icommerce.cms.label.warehouse')}*`
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
