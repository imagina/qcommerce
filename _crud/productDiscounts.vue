<template></template>

<script>
export default {
  data() {
    return {
      crudId: this.$uid(),
      optionsCriteria: {
        'fixed': 'Fixed Value',
        'percentage': 'Percentage',
      },
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qcommerce.entityNames.productDiscount"),
        apiRoute: 'apiRoutes.qcommerce.productDiscounts',
        //permission: 'icommerce.manufacturers',
        extraFormFields: 'Icommerce.crud-fields.productDiscounts',
        create: {
          title: this.$tr('icommerce.cms.newProductDiscount'),
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'quantity', label: this.$tr('isite.cms.form.quantity'), field: 'quantity', align: 'left'},

            {
              name: 'discount', label: this.$tr('icommerce.cms.form.discount'), field: 'discount', align: 'left',
              format: (val, row) => val ? row.criteria == 'percentage' ? this.$n(val / 100, 'percent') : this.$trc(val) : '-',
            },

            {
              name: 'criteria', label: this.$tr('icommerce.cms.form.discountType'), field: 'criteria', align: 'left',
              format: val => val ? this.$tr('icommerce.cms.options.' + val) : '-',
            },
            {
              name: 'department',
              label: this.$tr('icommerce.cms.form.usersGroup'),
              field: 'department',
              align: 'left',
              format: val => val ? val.title : 'All',
            },

            {name: 'priority', label: this.$tr('icommerce.cms.form.priority'), field: 'priority', align: 'left'},
            {
              name: 'date_start', label: this.$tr('icommerce.cms.form.dateStart'), field: 'dateStart', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'date_end', label: this.$tr('icommerce.cms.form.dateEnd'), field: 'dateEnd', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },

            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'running', label: this.$tr('isite.cms.form.status'), field: 'running', align: 'left',
              format: val => val ? this.$tr('isite.cms.label.enabled') : this.$tr('isite.cms.label.disabled'),
            },
            {
              name: 'finished', label: this.$tr('isite.cms.label.finished'), field: 'finished', align: 'left',
              format: val => val ? this.$tr('isite.cms.label.yes') : this.$tr('isite.cms.label.no'),
            },
            {
              name: 'quantitySold',
              label: this.$tr('icommerce.cms.form.quantitySold'),
              field: 'quantitySold',
              align: 'left'
            },

            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          //requestParams: {include: 'department'}
        },
        update: {
          title: this.$tr('icommerce.cms.updateProductDiscount'),
          //to: 'qcommerce.admin.taxClasses.edit'
          //requestParams: {include: 'department'}
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          includeDepartments: {
            value: [0],
            type: 'select',
            loadOptions: {
              apiRoute: 'apiRoutes.quser.departments',
              select: {label: 'title', id: 'id'},
            },
            props: {
              clearable: true,
              multiple: true,
              label: `${this.$tr('icommerce.cms.form.customerGroup')}*`,
              options: [{
                label: 'All', value: 0
              }],
            }
          },
          excludeDepartments: {
            value: [],
            type: 'select',
            loadOptions: {
              apiRoute: 'apiRoutes.quser.departments',
              select: {label: 'title', id: 'id'},
            },
            props: {
              clearable: true,
              multiple: true,
              label: `${this.$tr('icommerce.cms.form.customerGroupExclude')}`,
            }
          },
          quantity: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('isite.cms.form.quantity')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              type: 'number',
            }
          },
          discount: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('icommerce.cms.form.discount')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              type: 'number',
            }
          },
          criteria: {
            value: '',
            type: 'select',
            props: {
              label: `${this.$tr('icommerce.cms.form.criteria')}*`,
              options: [
                {label: this.$tr('icommerce.cms.options.fixedValue'), value: 'fixed'},
                {label: this.$tr('icommerce.cms.options.percentage'), value: 'percentage'},
              ],
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
        },
        formRight: {
          dateStart: {
            value: '',
            type: 'date',
            props: {
              label: `${this.$tr('icommerce.cms.form.dateStart')}*`,
            }
          },
          dateEnd: {
            value: '',
            type: 'date',
            props: {
              label: `${this.$tr('icommerce.cms.form.dateEnd')}*`,
            }
          },

          priority: {
            value: 0,
            type: 'input',
            props: {
              label: `${this.$tr('icommerce.cms.form.priority')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired'),
                val => (val >= 0) || this.$tr('isite.cms.message.fieldMinValue', {num: 0})
              ],
              type: 'number',
            }
          },

        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  }
}
</script>
