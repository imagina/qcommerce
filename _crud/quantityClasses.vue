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
        entityName: config("main.qcommerce.entityNames.quantityClasses"),
        apiRoute: 'apiRoutes.qcommerce.quantityClasses',
        permission: 'icommerce.quantityclasses',
        create: {
          title: this.$tr('icommerce.cms.sidebar.newQuantityClasses'),
        },
        computed: {
          isValid() {
            return this.model.length <= 1
          }
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'title', label: this.$tr('isite.cms.form.name'), field: 'title', align: 'left'},
            {
              name: 'unit', label: this.$tr('icommerce.cms.form.unit'), field: 'unit', style: 'width: 50px',
              align: 'left',
            },
            {name: 'value', label: this.$tr('isite.cms.label.value'), field: 'value', align: 'right'},

            {
              name: 'default', label: this.$tr('isite.cms.form.default'),
              field: 'default', align: 'right',
              format: val => (val == 1) ? this.$tr('isite.cms.label.yes') : this.$tr('isite.cms.label.no')
            },
            //Action
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {},
          filters: {},
          actions: []
        },
        update: {
          title: this.$tr('icommerce.cms.sidebar.updateQuantityClasses'),
          requestParams: {}
        },
        delete: true,
        //Form
        formLeft: {
          id: {value: ''},
          title: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.name')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired'),
              ],
            },
          },
          unit: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.label.code')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          value: {
            value: '',
            type: 'input',
            props: {
              type: 'number',
              label: `${this.$tr('isite.cms.label.value')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
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
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          default: {
            value: 0,
            type: 'select',
            isTranslatable: false,
            props: {
              label: `${this.$tr('isite.cms.form.default')}*`,
              options: [
                {label: this.$tr('isite.cms.label.yes'), value: 1},
                {label: this.$tr('isite.cms.label.no'), value: 0}
              ],
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          }
        }
      }
    }
  }
}
</script>
