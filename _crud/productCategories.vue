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
          entityName: config("main.qcommerce.entityNames.productCategory"),
          apiRoute: 'apiRoutes.qcommerce.categories',
          permission: 'icommerce.categories',
          extraFormFields: 'Icommerce.crud-fields.productCategories',
          create: {
            title: this.$tr('icommerce.cms.newCategory'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('isite.cms.form.name'), field: 'title', align: 'rigth'},
              {name: 'slug', label: this.$tr('isite.cms.form.slug'), field: 'slug', align: 'left'},
              {
                name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status'
              },
              {
                name: 'parent', label: this.$tr('isite.cms.form.parent'), field: 'parent', align: 'left',
                format: val => val ? (val.title ? val.title : '-') : '-'
              },
              {
                name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
            ],
            requestParams: {
              include: 'parent',
              filter: {
                order: {
                  field: 'created_at',
                  way: 'desc',
                },
              },
            },
            filters : {
              parentId: {
                value: null,
                type: 'treeSelect',
                loadOptions: {
                  apiRoute: 'apiRoutes.qcommerce.categories',
                  select: {label: 'title', id: 'id'},
                },
                props: {
                  label: this.$tr('isite.cms.form.parent'),
                  clearable: true
                }
              },
            }
          },
          update: {
            title: this.$tr('icommerce.cms.updateCategory'),
            requestParams: {include: 'parent'}
          },
          delete: true,
          formLeft: {
            id: {value: ''},
            userId: {value: this.$store.state.quserAuth.userId},
            title: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props: {
                label: `${this.$tr('isite.cms.form.title')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
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
            h1Title: {
              value: '',
              type: 'input',
              isTranslatable: true,
              props: {
                label: `${this.$tr('isite.cms.form.h1')}`
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
          formRight: {
            masterRecord: {
              value: '0',
              isFakeField: true,
              type: 'select',
              props: {
                label: this.$tr('isite.cms.form.masterRecord'),
                options: [
                  {label: this.$tr('isite.cms.label.yes'), value: '1'},
                  {label: this.$tr('isite.cms.label.no'), value: '0'},
                ]
              }
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
            parentId: {
              value: '0',
              type: 'treeSelect',
              loadOptions: {
                apiRoute: 'apiRoutes.qcommerce.categories',
                select: {label: 'title', id: 'id'}
              },
              props: {
                label: this.$tr('isite.cms.form.parent'),
                clearable: false,
                options: [
                  {label: this.$tr('isite.cms.label.disabled'), id: '0'},
                ],
              }
            },
            showMenu: {
              value: false,
              type: 'checkbox',
              props: {
                label: this.$tr('icommerce.cms.form.showInMenu'),
              }
            },
            featured: {
              value: '0',
              type: 'checkbox',
              props: {
                label: this.$tr('icommerce.cms.form.featured'),
                trueValue: '1',
                falseValue: '0',
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
                entity: "Modules\\Icommerce\\Entities\\Category",
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
                entity: "Modules\\Icommerce\\Entities\\Category",
                enitityId: null
              }
            },
            view: {
              value: 1,
              isFakeField: true,
              type: 'select',
              props: {
                label: 'Vista de categoria',
                options: [
                  {label: 'Masonry', value: 0},
                  {label: 'Cuatro Columnas', value: 1},
                  {label: 'Tres Columnas', value: 2},
                  {label: 'Dos Columnas', value: 3},
                ]
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
