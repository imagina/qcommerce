<template></template>
<script>
export default {
  data() {
    return {
      crudId: this.$uid(),
      loadOptionsPriceList: [],
      selectedProduct: null,
      priceProductList: 0
    };
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config('main.qcommerce.entityNames.productList'),
        apiRoute: 'apiRoutes.qcommerce.productLists',
        permission: 'icommercepricelist.pricelists',
        create: {
          title: this.$tr('icommercepricelist.cms.form.newProductList')
        },
        read: {
          columns: [
            { name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', align: 'left' },
            {
              name: 'name',
              label: this.$tr('isite.cms.form.name'),
              field: 'priceList',
              align: 'left',
              format: val => val.name
            },
            {
              name: 'criteria', label: this.$tr('isite.cms.form.type'), field: 'priceList', align: 'left',
              format: val => this.$tr('icommerce.cms.options.' + val.criteria)
            },
            {
              name: 'operationPrefix',
              label: this.$tr('icommerce.cms.form.operationPrefix'),
              field: 'priceList',
              align: 'left',
              format: val => val.operationPrefix === '+' ? this.$tr('icommerce.cms.options.add') : this.$tr('icommerce.cms.options.subtract')
            },
            {
              name: 'price', label: this.$tr('icommerce.cms.form.value'), field: 'price', align: 'left',
              format: val => parseFloat(val) ? this.$trn(parseFloat(val)) : '-'
            },
            {
              name: 'createdAt', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-'
            },
            {
              name: 'updatedAt', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'left',
              format: val => val ? this.$trd(val) : '-'
            },
            { name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'right' }
          ],
          requestParams: { include: 'product,priceList' }
        },
        update: {
          title: this.$tr('icommercepricelist.cms.form.updateProductList'),
          requestParams: { include: 'product,priceList' }
        },
        delete: true,
        formLeft: {
          id: { value: '' },
          productId: {
            value: null,
            type: 'crud',
            props: {
              crudType: 'select',
              crudData: import('modules/qcommerce/_crud/products'),
              customData: {
                read: {
                  requestParams: {refresh: true}
                }
              },
              crudProps: {
                label: `${this.$tr('isite.cms.form.product')}*`,
                rules: [
                  val => !!val || this.$tr('isite.cms.message.fieldRequired')
                ],

              },
              config: {
                filterByQuery: true,
                options:{
                  label:"name", 
                  value: "id"
                },
              },
              
            },
          },
          priceListId: {
            type: 'select',
            required: true,
            loadOptions: {
              apiRoute: 'apiRoutes.qcommerce.priceLists',
              select: { label: 'name', id: 'id' },
              loadedOptions: (data) => this.loadOptionsPriceList = data
            },
            props: {
              label: this.$tr('isite.cms.form.name')
            }
          },
          criteria: {
            type: 'select',
            fakeFieldName: 'priceList',
            props: {
              label: this.$tr('isite.cms.form.type'),
              options: [
                { label: this.$tr('icommerce.cms.options.fixed'), value: 'fixed' },
                { label: this.$tr('icommerce.cms.options.percentage'), value: 'percentage' }
              ],
              readonly: true
            }
          },
          operationPrefix: {
            type: 'select',
            fakeFieldName: 'priceList',
            props: {
              label: this.$tr('icommerce.cms.form.operationPrefix'),
              options: [
                { label: this.$tr('icommerce.cms.options.subtract'), value: '-' },
                { label: this.$tr('icommerce.cms.options.add'), value: '+' }
              ],
              readonly: true
            }
          },
          price: {
            value: '',
            type: 'input',
            required: true,
            props: {
              label: `${this.$tr('icommerce.cms.form.value')}*`,
              type: 'number',
              readonly: this.crudInfo.priceList?.criteria == 'percentage',
              vIf: this.crudInfo.priceList?.criteria !== 'percentage',
            }
          }
        },
        handleFormUpdates: (formData, changedFields, formType) => {
          return new Promise(resolve => {
            
            if (changedFields.length === 1 && changedFields.includes('priceListId')) {
              const priceListInfo = this.loadOptionsPriceList.find(priceList => priceList.id == formData.priceListId);
              
              if (priceListInfo) {
                formData = {
                  ...formData,
                  priceList: {
                    ...formData.priceList,
                    criteria: priceListInfo.criteria,
                    operationPrefix: priceListInfo.operationPrefix
                  },
                  price: priceListInfo.criteria === 'percentage' ? 0 : this.priceProductList 
                };
              }
            } else if (changedFields.length > 1 && changedFields.includes('price')) this.priceProductList = formData.price;  

            resolve(formData);
          });
        }
      };
    },
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {};
    }
  },
};
</script>
