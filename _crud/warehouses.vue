<template>
</template>
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
        entityName: config("main.qcommerce.entityNames.warehouse"),
        apiRoute: 'apiRoutes.qcommerce.warehouses',
        permission: 'icommerce.products', //provicional
        create: {
          title: this.$tr('icommerce.cms.newWarehouse'),
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {
              name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth', sortable: true
            },
            {
              name: 'slug', label: this.$tr('isite.cms.form.slug'), field: 'slug', align: 'left',
            },
            {
              name: 'status', label: this.$tr('icommerce.cms.form.status'), field: 'status', align: 'left',
            },
            {
              name: 'default', label: 'default', field: 'default', align: 'left',
            },
            {
              name: 'address', label: this.$tr('isite.cms.form.address'), field: 'address', align: 'left',
            },
            {
              name: 'description', label: this.$tr('isite.cms.form.description'), field: 'description', align: 'left',
            },
            {
              name: 'country_id', label: this.$tr('ilocations.cms.form.country'), field: 'country', align: 'left',
              format: val => val ? val.name : ''
            },
            {
              name: 'province_id', label: this.$tr('ilocations.cms.form.province'), field: 'province', align: 'left',
              format: val => val ? val.name : ''
            },
            {
              name: 'city_id', label: this.$tr('ilocations.cms.form.city'), field: 'city', align: 'left',
              format: val => val ? val.name : ''
            },
            {
              name: 'createdAt', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {
              name: 'updated_at', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'left',
              format: val => val ? this.$trd(val) : '-',
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {include: 'country,province,city', filter: {order: {field: 'id', way: 'desc'}}},
          filters: {            
            countryId: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('ilocations.cms.form.country'),
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qlocations.countries',
                select: {label: 'name', id: 'id'},
              }
            },
            provinceId: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('ilocations.cms.form.province'),
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qlocations.provinces',
                select: {label: 'name', id: 'id'},
              }
            },
            cityId: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('isite.cms.form.city'),
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qlocations.cities',
                select: {label: 'name', id: 'id'},
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
          },
          actions: []
        },
        update: {
          title: this.$tr('icommerce.cms.updateWarehouse'),
        },
        delete: true,
        formLeft: {          
          title: {
            isTranslatable: true,
            value: '',
            type: 'input',
            props : {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              }
          },
          description: {
            isTranslatable: true,
            value: '',
            type: 'input',
            props : {
              label: `${this.$tr('isite.cms.form.description')}`,              
            }
          },
          slug: {
            value: '',
            isTranslatable: true,
            type: 'input',
            props: {
              label: `${this.$tr('isite.cms.form.slug')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },          
          address: {
            value: '',            
            type: 'input',            
            props: {
              label: `${this.$tr('isite.cms.form.address')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          map: {
            value: { lat: this.crudInfo.lat, },
            type: 'positionMarkerMap',
            help: { description: this.$tr('icommerce.cms.form.mapHelp')},
            required: true,
            isFakeField: true,
            props: {
              label: `${this.$tr('isite.cms.label.search')}...`,
              emitDefault: ( this.crudInfo.typeForm === 'create'),
            }
          },
          polygonId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('ilocations.cms.form.polygon'),
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qlocations.polygons',
              select: {label: 'name', id: 'id'},
            }
          },
        },
        formRight: { 
          countryId: {
            value: null,
            type: 'select',
            required: true,
            props: {
              label: `${this.$tr('isite.cms.label.country')}*`
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qlocations.countries',
              select: {label: 'name', id: 'id'},
              filterByQuery: true
            }
          },
          provinceId: {
            value: null,
            type: 'select',
            required: true,
            props: {
              label: `${this.$tr('ilocations.cms.form.province')}*`,
              readonly: (this.crudInfo.countryId ? false : true)
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qlocations.provinces',
              requestParams: {filter: {country_id: this.crudInfo.countryId}},
              select: {label: 'name', id: 'id'},
              filterByQuery: true
            }
          },
          cityId: {
            value: null,
            type: 'select',
            required: true,
            props: {
              label: `${this.$tr('isite.cms.form.city')}*`,
              readonly: (this.crudInfo.provinceId ? false : true)
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qlocations.cities',
              requestParams: {filter: {province_id: this.crudInfo.provinceId}},
              select: {label: 'name', id: 'id'},
              filterByQuery: true,
            }
          },
          status: {
            value: '0',
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
          default: {
            value: '0',
            type: 'select',
            props: {
              label: this.$tr('isite.cms.form.default'),
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
        },
        getDataForm(data, type) {
          return new Promise(resolve => {
            //replace name value
            if(data.options){
              data.lat = data.options.map?.lat
              data.lng = data.options.map?.lng
            }
             //Response
            resolve(data)
          })
        }        
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
}
</script>

