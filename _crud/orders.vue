<template></template>
<script>
export default {
  computed: {
    crudData() {
      return {
        entityName: config("main.qcommerce.entityNames.order"),
        apiRoute: 'apiRoutes.qcommerce.orders',
        permission: 'icommerce.orders',
        extraFormFields: 'Icommerce.crud-fields.orders',
        create: false,
        read: {
          columns: [
            {
              name: 'id',
              label: this.$tr('isite.cms.form.id'),
              field: 'id',
              to: (item) => ({
                name: 'qcommerce.shipping.orders.show',
                params: { id: item.id },
              }),
            },
            {
              name: 'customer',
              label: this.$tr('isite.cms.form.name'),
              field: 'customer',
              format: val => val ? val.fullName : '-',
              align: 'left'
            },
            {
              name: 'warehouse',
              label: this.$tr('icommerce.cms.label.warehouse'),
              field: 'warehouse',
              format: val => val ? val.title : '-',
              align: 'left',
              vIf: this.$getSetting('icommerce::warehouseFunctionality') == '1' ? true : false
            },
            {
              name: 'total',
              label: this.$tr('icommerce.cms.form.total'),
              field: 'total',
              format: val => val ? `$${this.$trn(val)}` : ''
            },
            {name: 'statusName', label: this.$tr('isite.cms.form.status'), field: 'statusName'},
            //{name: 'paymentCity', label: this.$tr('icommerce.cms.form.city'), field: 'paymentCity'},
            //{name: 'paymentCountry', label: this.$tr('icommerce.cms.form.country'), field: 'paymentCountry'},
            {name: 'shippingMethod', label: this.$tr('icommerce.cms.form.shippingMethod'), field: 'shippingMethod'},
            { name: 'paymentMethod', label: this.$tr('icommerce.cms.paymentInformation'), field: 'paymentMethod' },
            {
              name: 'created_at',
              label: this.$tr('isite.cms.form.createdAt'),
              field: 'createdAt',
              align: 'right',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'updated_at',
              label: this.$tr('isite.cms.form.updatedAt'),
              field: 'updatedAt',
              align: 'right',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'right'},
          ].filter(item => item.vIf ?? true),
          requestParams: {
            include: 'warehouse',
            filter: {
              order: {
                field: 'id',
                way: 'desc',
              },
            },
          },
          actions: [
            {
              name: 'show',
              icon: 'far fa-eye',
              label: this.$tr('isite.cms.label.show'),
              route: 'qcommerce.shipping.orders.show'
            },
            {
              name: 'buyAgain',
              icon: 'fal fa-box-dollar',
              label: this.$tr('icommerce.cms.label.buyAgain'),
              format: (row, act) => {
                if(!row.buyAgainUrl) return {vIf: false}
                return {
                  props: {
                    ...act.props,
                    href: row.buyAgainUrl,
                    target: '_blank'
                  }
                }
              },
            }
          ],
          filters: {
            status: {
              value: null,
              type: 'select',
              props: {
                label: `${this.$tr('isite.cms.form.status')}:`,
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qcommerce.orderStatus'
              }
            },
            warehouseId: {
              value: null,
              type: 'select',
              props: {
                label: `${this.$tr('icommerce.cms.label.warehouse')}:`,
                clearable: true,
                vIf: this.$getSetting('icommerce::warehouseFunctionality') == '1' ? true : false
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qcommerce.warehouses'
              }
            },
            paymentCode: {
              value: null,
              type: 'select',
              props: {
                label: `${this.$tr('icommerce.cms.paymentInformation')}:`,
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qcommerce.paymentMethods'
              }
            },
            shippingCode: {
              value: null,
              type: 'select',
              props: {
                label: `${this.$tr('icommerce.cms.form.shippingMethod')}:`,
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qcommerce.shippingMethods'
              }
            }
          }
        },
        update: {
          to: 'qcommerce.shipping.orders.show'
        },
        delete: false,
        formLeft: {},
      }
    }
  }
}
</script>
