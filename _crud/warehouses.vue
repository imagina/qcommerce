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
          title: 'New warehouse',
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {
              name: 'title', label: 'Title', field: 'title', align: 'rigth', sortable: true
            },
            {
              name: 'description', label: 'Description', field: 'description', align: 'left',
            },
            {
              name: 'slug', label: 'slug', field: 'slug', align: 'left',
            },
            {
              name: 'lat', label: 'latidude', field: 'lat', align: 'left',
            },
            {
              name: 'lng', label: 'longitud', field: 'lng', align: 'left',
            },
            {
              name: 'address', label: 'address', field: 'address', align: 'left',
            },
            {
              name: 'status', label: 'status', field: 'status', align: 'left',
            },
            {
              name: 'default', label: 'default', field: 'default', align: 'left',
            },
            {
              name: 'country_id', label: 'country', field: 'countryId', align: 'left',              
            },
            {
              name: 'province_id', label: 'province', field: 'provinceId', align: 'left',              
            },
            {
              name: 'city_id', label: 'city', field: 'cityId', align: 'left',              
            },
            {
              name: 'polygon_id', label: 'polygon', field: 'polygonId', align: 'left',
              
            },
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          //requestParams: {include: 'qrs', filter: {order: {field: 'id', way: 'desc'}}},
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
          title: this.$tr('icommerce.cms.updateProduct'),
          //to: 'qcommerce.admin.products.edit'
        },
        delete: true,
        formLeft: {          
          title: {
            isTranslatable: true,
            value: '',
            type: 'input',
            props : {
              label: `${this.$tr('isite.cms.form.title')}`,
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
              label: 'address',
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
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
              label: `default`,
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
          map: {
            value: null,
            type: 'positionMarkerMap',
            required: true,            
            props: {
              label: `${this.$tr('isite.cms.label.search')}...`, 
            }
          },           
          lat: {
            value: '',
            type: 'input',
            props: {
              label: 'Latitude',
              vIf: this.crudInfo.typeForm === 'update',
              readonly: true
            }
          },
          lng: {
            value: '',
            type: 'input',
            props: {
              label: 'Longitude',
              vIf: this.crudInfo.typeForm === 'update',
              readonly: true
            }
          },          
          poligonId: {
            value: null,
            type: 'select',
            props: {
              label: 'Polygon Id',
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qlocations.polygons',
              select: {label: 'name', id: 'id'},
            }
          },
        },
        //apiRoutes.qlocations.polygons
        getDataForm(data, type) {
          if(!data.lat || !data.lng){
            console.warn('no location')
            return false 
          }
          return new Promise(resolve => {
            //replace name value
            data.lat = data.map?.lat
            data.lng = data.map?.lng
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

