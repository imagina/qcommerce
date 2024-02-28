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
              {name: 'criteria', label: this.$tr('isite.cms.form.type'), field: 'criteria', align: 'left', format: val => this.$tr('icommerce.cms.options.'+val)},
              {name: 'status', label: this.$tr('icommerce.cms.form.status'), field: 'status', align: 'left'},
              {name: 'value', label: this.$tr('icommerce.cms.form.value'), field: 'value', align: 'left', format: val => this.$trn(val)},
              {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'right'},
            ],
            requestParams: {},
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
            criteria:{
              type: 'select',
              props:{
                label: this.$tr('isite.cms.form.type'),
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
              type: 'select',
              props:{
                label: this.$tr('icommerce.cms.form.operationPrefix'),
                options:[
                  {label: this.$tr('icommerce.cms.options.subtract'), value: '-'},
                  {label: this.$tr('icommerce.cms.options.add'), value: '+'},
                ],
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
          },
          formRight: {
            status: {
              value: '1',
              type: 'select',
              props: {
                label: `${this.$tr('isite.cms.form.status')}:`,
                clearable: true,
                options: [
                  {label: this.$tr('isite.cms.label.enabled'), value: 1},
                  {label: this.$tr('isite.cms.label.disabled'), value: 0}
                ],
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
            },
            value: {
              value: '',
              type: 'input',
              props : {
                label: `${this.$tr('icommerce.cms.form.value')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
                type: 'number',
              }
            },
            relatedId: {
              value: '0',
              type: 'select',
              loadOptions: {
                apiRoute: 'apiRoutes.quser.departments',
                select: {label: 'title', id: 'id'}
              },
              props: {
                label: `${this.$tr('isite.cms.label.department')}:`,
                clearable : true,
                options:[
                  {label: this.$trp('isite.cms.label.all'), value: 0, id: 0}
                ]
              }
            },
            relatedEntity:{
              value: 'Modules\\Iprofile\\Entities\\Department'
            }
          }
        }
      }
    }
  }
</script>
