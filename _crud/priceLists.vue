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
          entityName: config("main.qcommerce.entityNames.priceList"),
          apiRoute: 'apiRoutes.qcommerce.priceLists',
          permission: 'icommercepricelist.pricelists',
          extraFormFields: 'Icommercepricelist.crud-fields.priceLists',
          create: {
            title: this.$tr('icommerce.cms.newPriceList'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', align: 'left'},
              {name: 'name', label: this.$tr('isite.cms.form.name'), field: 'name', align: 'left'},
              {name: 'status', label: this.$tr('icommerce.cms.form.status'), field: 'status', align: 'left'},
              {name: 'criteria', label: this.$tr('isite.cms.form.type'), field: 'criteria', align: 'left', format: val => this.$tr('icommerce.cms.options.'+val)},
              {
                name: 'operationPrefix', label: this.$tr('icommerce.cms.form.operationPrefix'), field: 'operationPrefix', align: 'left',
                format: val => val === '+' ? this.$tr('icommerce.cms.options.add') : this.$tr('icommerce.cms.options.subtract'),
              },
              {
                name: 'value', label: this.$tr('icommerce.cms.form.value'), field: row => row, align: 'left',
                format: val => val.criteria === "percentage" ? `${val.value}%` : `${this.$trn(val.value)}`
              },
              {
                name: 'related', label: this.$tr('isite.cms.label.department'), field: 'related', align: 'left',
                format: val => val ? val.title : this.$tr('isite.cms.label.all')
              },

              {
                name: 'createdAt', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {
                name: 'updatedAt', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'right'},
            ],
            requestParams: { include: 'related' },
            filters: {},
          },
          update: {
            title: this.$tr('icommerce.cms.updatePriceList'),
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            name: {
              isTranslatable: true,
              value: '',
              type: 'input',
              props : {
                label: `${this.$tr('isite.cms.form.name')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
            status: {
              value: '1',
              type: 'select',
              props: {
                label: `${this.$tr('isite.cms.form.status')}*`,
                options: [
                  {label: this.$tr('isite.cms.label.enabled'), value: 1},
                  {label: this.$tr('isite.cms.label.disabled'), value: 0}
                ],
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
            },
            criteria:{
              type: 'select',
              props:{
                label: `${this.$tr('isite.cms.form.type')}*`,
                options:[
                  {label: this.$tr('icommerce.cms.options.fixed'), value: 'fixed'},
                  {label: this.$tr('icommerce.cms.options.percentage'), value: 'percentage'},
                ],
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
            operationPrefix:{
              value: '-',
              type: 'select',
              props:{
                label: `${this.$tr('icommerce.cms.form.operationPrefix')}*`,
                options:[
                  {label: this.$tr('icommerce.cms.options.subtract'), value: '-'},
                  {label: this.$tr('icommerce.cms.options.add'), value: '+'},
                ],
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
                vIf: !!(this.crudInfo.criteria !== 'fixed')
              }
            },
            value: {
              value: '0',
              type: 'input',
              required: !(this.crudInfo.criteria !== 'fixed'),
              props : {
                label: `${this.$tr('icommerce.cms.form.value')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
                type: 'number',
                vIf: !!(this.crudInfo.criteria !== 'fixed')
              }
            },
            relatedId: {
              value: '0',
              type: 'select',
              required: true,
              loadOptions: {
                apiRoute: 'apiRoutes.quser.departments',
                select: {label: 'title', id: 'id'}
              },
              props: {
                label: `${this.$tr('isite.cms.label.department')}*`,
                options:[
                  {label: this.$trp('isite.cms.label.all'), value: 0, id: 0}
                ]
              }
            },
            relatedEntity:{
              value: 'Modules\\Iprofile\\Entities\\Department'
            }
          },
          handleFormUpdates: (formData, changedFields, formType) => {
            return new Promise(resolve => {

              if (changedFields.length === 1 && changedFields.includes('criteria')) {
                if (formData.criteria == 'fixed') {
                  formData.value = 0
                  formData.operationPrefix = '-'
                }
              }

              resolve(formData)
            })
          }
        }
      },
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    }
  }
</script>
