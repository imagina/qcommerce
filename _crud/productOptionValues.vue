<template></template>
<script>
  export default {
    data() {
      return {
        crudId: this.$uid()
      }
    },
    computed: {
      crudData () {
        return {
          crudId: this.crudId,
          entityName: config("main.qcommerce.entityNames.productOptionValue"),
          apiRoute: 'apiRoutes.qcommerce.optionValues',
          permission: 'icommerce.optionvalues',
          extraFormFields: 'Icommerce.crud-fields.productOptionsValues',
          create: {
            title: this.$tr('icommerce.cms.newOptionValue'),
          },
          read: {
            columns: [
              { name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px' },
              {
                name: 'description', label: this.$tr('isite.cms.form.description'),
                field: 'description', align: 'rigth'
              },
              {
                name: 'option', label: this.$tr('isite.cms.form.option'), field: 'option',
                format: val => val && val.description || '-', align: 'left'
              },
              {
                name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-'
              },
              { name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left' },
            ],
            requestParams: { include: 'option' },
            filters: {
              optionId: {
                value: '0',
                type: 'select',
                props : {
                  label: `${this.$tr('isite.cms.form.option')}:`,
                  options: [
                    { label: this.$tr('isite.cms.label.all'), value: '0' }
                  ],
                },
                loadOptions: {
                  apiRoute: 'apiRoutes.qcommerce.options',
                  select: { label: 'description', id: 'id' }
                }
              },
            }
          },
          update: {
            title: this.$tr('icommerce.cms.updateOptionValue'),
            requestParams: { include: '' }
          },
          delete: true,
          formLeft: {
            id: { value: '' },
            userId: { value: this.$store.state.quserAuth.userId },
            description: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props : {
                label: `${this.$tr('isite.cms.form.description')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
            sortOrder: {
              value: 0,
              type: 'input',
              isTranslatable: false,
              props : {
                type : 'number',
                label: this.$tr('isite.cms.form.sort'),
              }
            },
            type:{
              value: 1,
              type: 'select',
              required : true,
              fakeFieldName: 'options',
              props:{
                label: this.$tr('isite.cms.form.type'),
                options : [
                  {label: this.$tr('isite.cms.label.text'), value: 1},
                  {label: this.$tr('isite.cms.label.image'), value: 2},
                  {label: this.$tr('icommerce.cms.form.color'), value: 3},
                ]
              }
            },
            mediasSingle: {
              name: 'mediasSingle',
              value: {},
              type: 'media',
              fakeFieldName: 'options',
              props : {
                label: this.$tr('isite.cms.form.firstImage'),
                zone: 'mainimage',
                entity: 'Modules\Icommerce\Entities\OptionValue',
                enitityId: null,
                vIf: this.crudInfo?.options?.type == 2
              }
            },
            color : {
              type: 'inputColor',
              fakeFieldName: 'options',
              props: {
                label: this.$tr('icommerce.cms.form.color'),
                vIf: this.crudInfo?.options?.type == 3
              }
            }
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
