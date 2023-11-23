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
        entityName: config("main.qcommerce.entityNames.product"),
        apiRoute: 'apiRoutes.qcommerce.products',
        permission: 'icommerce.products',
        extraFormFields: 'Icommerce.crud-fields.products',
        create: {
          title: this.$tr('icommerce.cms.newProduct'),
          //to: {name: 'qcommerce.admin.products.create'}
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {
              name: 'name',
              label: this.$tr('isite.cms.form.title'),
              field: 'name',
              style: 'width: 50px',
              align: 'rigth',
              sortable: true
            },
            {name: 'sku', label: this.$tr('isite.cms.form.sku'), field: 'sku', align: 'left'},
            {
              name: 'category', label: this.$tr('isite.cms.form.category'), field: 'category', align: 'left',
              format: val => (val && val.title) ? val.title : ''
            },
            {
              name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'left'
            },
            {
              name: 'quantity', label: this.$tr('isite.cms.form.stock'), field: 'quantity', align: 'left',
              format: val => !val ? this.$tr('isite.cms.label.soldOut') :
                  `${this.$tr('isite.cms.label.available')} (${(val <= 100) ? val : '100+'})`
            },
            {name: 'slug', label: this.$tr('isite.cms.form.slug'), field: 'slug', align: 'left'},
            {
              name: 'price', label: this.$tr('isite.cms.form.price'), field: 'formattedPrice', align: 'left',
              //format: val => this.$trn(val || 0)
            },
            {
              name: 'createdAt', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {include: 'category,qrs', filter: {order: {field: 'id', way: 'desc'}}},
          filters: {
            categories: {
              value: null,
              type: 'treeSelect',
              props: {
                label: `${this.$tr('isite.cms.form.category')}:`,
                clearable: true,
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qcommerce.categories'
              }
            },
            manufacturers: {
              value: null,
              type: 'select',
              props: {
                label: `${this.$tr('icommerce.cms.form.manufacturer')}:`,
                clearable: true,
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qcommerce.manufacturers',
                select: {label: 'name', id: 'id'}
              }
            },
            status: {
              value: null,
              type: 'select',
              props: {
                label: `${this.$tr('isite.cms.form.status')}:`,
                clearable: true,
                options: [
                  {label: this.$tr('isite.cms.label.enabled'), value: 1},
                  {label: this.$tr('isite.cms.label.disabled'), value: 0}
                ],
              },
            },
            stockStatus: {
              value: null,
              type: 'select',
              props: {
                label: `${this.$tr('isite.cms.form.stock')}:`,
                clearable: true,
                options: [
                  {label: this.$tr('isite.cms.label.available'), value: 1},
                  {label: this.$tr('isite.cms.label.soldOut'), value: 0}
                ],
              },
            },
            soonToSoldOut: {
              value: false,
              type: 'checkbox',
              props: {
                label: `${this.$tr('icommerce.cms.form.soonToSoldOut')}`
              },
            },
            withDiscount: {
              value: false,
              type: 'checkbox',
              props: {
                label: `${this.$tr('icommerce.cms.form.withDiscount')}`
              },
            },
          },
          actions: [
            {
              icon: 'fa-light fa-arrow-right-to-arc',
              color: 'info',
              tooltip: this.$tr('icommerce.cms.message.viewProduct'),
              action: (row) => {
                this.$helper.openExternalURL(row.url)
              }
            },
            {
              icon: 'fa-light fa-pen-to-square',
              color: 'info',
              tooltip: this.$tr('icommerce.cms.message.advanceEdit'),
              action: (item) => {
                this.$router.push({name: 'qcommerce.admin.products.edit', params: {id: item.id}})
              }
            }
          ]
        },
        update: {
          title: this.$tr('icommerce.cms.updateProduct'),
          //to: 'qcommerce.admin.products.edit'
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          banner: {
            type: 'banner',
            props: {
              color: 'info',
              icon: 'fas fa-exclamation-triangle',
              message: this.crudInfo.typeForm == 'create' ? this.$tr('isite.cms.message.createFormProduct') : this.$tr('isite.cms.message.editFormProduct'),
              actions: [
                {
                  props: {
                    label: this.$tr('icommerce.cms.message.advanceEdit')
                  },
                  action: () => {
                    if (this.crudInfo.typeForm === 'create') {
                      this.$router.push({name: 'qcommerce.admin.products.create'})
                    } else {
                      this.$router.push({name: 'qcommerce.admin.products.edit', params: {id: this.crudInfo.id}})
                    }
                  }
                }
              ]
            }
          },
          name: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.name')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          summary: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.summary')}*`,
              type: 'textarea',
              rows: "3",
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
          },
          status: {
            value: '1',
            type: 'select',
            props: {
              label: `${this.$tr('isite.cms.form.status')}:`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              options: [
                {label: this.$tr('isite.cms.label.enabled'), value: 1},
                {label: this.$tr('isite.cms.label.disabled'), value: 0}
              ],
            },
          },
          categoryId: {
            value: null,
            type: 'crud',
            props: {
              crudType: 'select',
              crudData: import('@imagina/qcommerce/_crud/productCategories'),
              customData: {
                read: {
                  requestParams: {include: 'parent', refresh: true}
                }
              },
              crudProps: {
                label: `${this.$tr('isite.cms.form.category')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],
              },
            },
          },
          price: {
            value: '0',
            type: 'input',
            props: {
              label: `${this.$tr('isite.cms.form.price')}`,
              type: 'number'
            }
          },
        },
        formRight: {
          mediasSingle: {
            type: 'media',
            props: {
              label: this.$tr('isite.cms.form.image'),
              zone: 'mainimage',
              entity: 'Modules\\Icommerce\\Entities\\Product',
              entityId: null
            }
          },
        },
        getDataForm: (data, type) => {
          return new Promise(resolve => {
            if (type == 'create') {
              const languages = this.$store.state?.qsiteApp?.selectedLocales
              //Set all languages with the same title
              for (const lang of languages) {
                data[lang].slug = this.$helper.getSlug(data[lang].name)
              }
            }
            resolve(data)
          })
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
