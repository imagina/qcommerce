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
          entityName: config("main.qcommerce.entityNames.store"),
          apiRoute: 'apiRoutes.qcommerce.stores',
          extraFormFields: 'Icommerce.crud-fields.stores',
          //permission: 'icommerce.stores',
          create: {
            title: this.$tr('icommerce.cms.newStore'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('isite.cms.form.name'), field: 'name', align: 'left'},
              {name: 'address', label: this.$tr('isite.cms.form.address'), field: 'address', align: 'left'},
              {name: 'phone', label: this.$tr('isite.cms.form.phone'), field: 'phone', align: 'left'},
              {
                name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
            ],
            //requestParams: {include: 'parent'}
          },
          update: {
            title: this.$tr('icommerce.cms.updateStore'),
            //requestParams: {include: 'parent'}
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            userId: {value: this.$store.state.quserAuth.userId},
            name: {
              value: '',
              type: 'input',
              isTranslatable: false,
              props : {
                label: `${this.$tr('isite.cms.form.name')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
            address: {
              value: '',
              type: 'input',
              isTranslatable: false,
              props : {
                label: `${this.$tr('isite.cms.form.address')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
            phone: {
              value: '',
              type: 'input',
              isTranslatable: false,
              props : {
                  label: `${this.$tr('isite.cms.form.phone')}*`,
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
