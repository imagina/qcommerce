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
          entityName: config("main.qcommerce.entityNames.taxClass"),
          apiRoute: 'apiRoutes.qcommerce.taxClasses',
          permission: 'icommerce.taxclasses',
          extraFormFields: 'Icommerce.crud-fields.taxClasses',
          create: {
            title: this.$tr('icommerce.cms.newTaxClass'),
            to: {name: 'qcommerce.admin.taxClasses.create'}
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('isite.cms.form.name'), field: 'name', align: 'left'},
              {
                name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
            ],
            //requestParams: {include: 'parent'}
          },
          update: {
            title: this.$tr('icommerce.cms.updateTaxClass'),
            to: 'qcommerce.admin.taxClasses.edit'
            //requestParams: {include: 'parent'}
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            storeId: {value: 1},
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
            description: {
              value: '',
              type: 'html',
              isTranslatable: true,
              props : {
                label: `${this.$tr('isite.cms.form.description')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
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
