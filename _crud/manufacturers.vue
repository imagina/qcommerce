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
          entityName: config("main.qcommerce.entityNames.manufacturer"),
          apiRoute: 'apiRoutes.qcommerce.manufacturers',
          permission: 'icommerce.manufacturers',
          extraFormFields: 'Icommerce.crud-fields.manufacturers',
          create: {
            title: this.$tr('icommerce.cms.newManufacturer'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('isite.cms.form.name'), field: 'name', align: 'left'},
              {
                name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status'
              },
              {
                name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
            ],
            //requestParams: {include: 'parent'}
          },
          update: {
            title: this.$tr('icommerce.cms.updateManufacturer'),
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
              }
            },
            slug: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props: {
                label: `${this.$tr('isite.cms.form.slug')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
            description: {
              value: '',
              type: 'html',
              isTranslatable: true,
              props: {
                label: `${this.$tr('isite.cms.form.description')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
            metaTitle: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props: {
                label: this.$tr('isite.cms.form.metaTitle'),
              }
            },
            metaDescription: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props: {
                label: this.$tr('isite.cms.form.metaDescription'),
              }
            },
          },
          formRight : {
            status: {
              value: '1',
              type: 'select',
              isTranslatable: false,
              props : {
                label: `${this.$tr('isite.cms.form.status')}*`,
                options : [
                  {label: this.$tr('isite.cms.label.enabled'), value: '1'},
                  {label: this.$tr('isite.cms.label.disabled'), value: '0'}
                ],
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              }
            },
            sortOrder: {
              value: '0',
              type: 'input',
              props: {
                label: this.$tr('icommerce.cms.form.sortOrder'),
                type: 'number'
              }
            },
            mediasSingle: {
              name: 'mediasSingle',
              testId: 'mediasSingle',
              value: {},
              type: 'media',
              props: {
                label: this.$tr('isite.cms.form.firstImage'),
                zone: 'mainimage',
                entity: "Modules\\Icommerce\\Entities\\Manufacturer",
                enitityId: null
              }
            },
            mediasSingle2: {
              name: 'mediasSingle',
              testId: 'mediasSingle2',
              value: {},
              type: 'media',
              props: {
                label: this.$tr('isite.cms.form.secondaryImage'),
                zone: 'secondaryimage',
                entity: "Modules\\Icommerce\\Entities\\Manufacturer",
                enitityId: null
              }
            },
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
