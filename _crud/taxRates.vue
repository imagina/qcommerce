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
          entityName: config("main.qcommerce.entityNames.taxRate"),
          apiRoute: 'apiRoutes.qcommerce.taxRates',
          //permission: 'icommerce.manufacturers',
          extraFormFields: 'Icommerce.crud-fields.taxRates',
          create: {
            title: this.$tr('icommerce.cms.newTaxRate'),
            //to: {name: 'qcommerce.admin.taxRates.create'}
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('isite.cms.form.name'), field: 'name', align: 'left'},
              {name: 'rate', label: this.$tr('icommerce.cms.form.rate'), field: 'rate', align: 'left'},
              {
                name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
            ],
            //requestParams: {include: 'parent'}
          },
          update: {
            title: this.$tr('icommerce.cms.updateTaxRate'),
            //to: 'qcommerce.admin.taxRates.edit'
            //requestParams: {include: 'parent'}
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            storeId: {
              value: 1
            },
            customer: {
              value: 0
            },
            name: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props : {
                label: `${this.$tr('isite.cms.form.name')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
            rate: {
              value: '',
              type: 'input',
              isTranslatable: false,
              props : {
                label: `${this.$tr('icommerce.cms.form.rate')}*`,
                type: 'number',
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
            type: {
              value: '',
              type: 'select',
              isTranslatable: false,
              props : {
                label: `${this.$tr('isite.cms.form.type')}*`,
                options: [
                  {label: this.$tr('icommerce.cms.options.fixedValue'), value: '0'},
                  {label: this.$tr('icommerce.cms.options.percentage'), value: '1'},
                ],
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
            geozoneId: {
              value: '1',
              type: 'select',
              loadOptions: {
                  apiRoute: 'apiRoutes.qlocations.geozones',
                  select: {label: 'name', id: 'id'},
              },
              props: {
                  label: this.$tr('qlocations.layout.form.geozone'),
                  clearable: true,
              },
            },
          },
          /*formRight: {
            mediasSingle: {
              name: 'mediasSingle',
              value: {},
              type: 'media',
              props : {
                label: this.$tr('isite.cms.form.firstImage'),
                zone: 'mainimage',
                entity: "Modules\\Icommerce\\Entities\\Store",
                enitityId: null
              }
            },
          },*/
        }
      },
      //Crud info
      crudInfo() {
        return this.$store.state.qcrudComponent.component[this.crudId] || {}
      }
    }
  }
</script>
