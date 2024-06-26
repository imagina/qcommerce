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
        entityName: config("main.qcommerce.entityNames.currencies"),
        apiRoute: 'apiRoutes.qcommerce.currencies',
        permission: 'icommerce.currencies',
        extraFormFields: 'Icommerce.crud-fields.currencies',
        create: {
          title: this.$tr('icommerce.cms.sidebar.newCurrencies'),
        },
        computed: {
          isValid() {
            return this.model.length <= 1
          }
        },
        read: {
          columns: [
            {name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'},
            {name: 'name', label: this.$tr('isite.cms.form.name'), field: 'name', align: 'left'},
            {
              name: 'code', label: this.$tr('isite.cms.label.code'), field: 'code', style: 'width: 50px',
              align: 'left',
            },
            {
              name: 'symbol_left', label: this.$tr('icommerce.cms.form.symbolLeft'), field: 'symbolLeft',
              align: 'left', maxLength: 1
            },
            {
              name: 'symbol_right', label: this.$tr('icommerce.cms.form.symbolRight'), field: 'symbolRight',
              align: 'left', maxLength: 1
            },
            {name: 'status', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'left'},
            {
              name: 'decimals', label: this.$tr('icommerce.cms.form.decimals'), field: 'decimals',
              align: 'right'
            },
            {name: 'value', label: this.$tr('isite.cms.label.value'), field: 'value', align: 'right'},
            {
              name: 'default_currency', label: this.$tr('isite.cms.form.default'),
              field: 'defaultCurrency', align: 'right',
              format: val => (val == 1) ? this.$tr('isite.cms.label.yes') : this.$tr('isite.cms.label.no')
            },
            {
              name: 'decimal_separator',
              label: this.$tr('icommerce.cms.form.decimalSeparator'),
              field: 'decimalSeparator',
              align: 'left',
              maxLength: 1
            },
            {
              name: 'thousands_separator',
              label: this.$tr('icommerce.cms.form.thousandsSeparator'),
              field: 'thousandsSeparator',
              align: 'left',
              maxLength: 1
            },
            //Action
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          requestParams: {},
          filters: {},
          actions: []
        },
        update: {
          title: this.$tr('icommerce.cms.sidebar.updateCurrency'),
          requestParams: {}
        },
        delete: true,
        //Form
        formLeft: {
          id: {value: ''},
          userId: {value: this.$store.state.quserAuth.userId},
          name: {
            value: '',
            type: 'input',
            isTranslatable: true,
            props: {
              label: `${this.$tr('isite.cms.form.name')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired'),
              ],
            },
          },
          code: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('isite.cms.label.code')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired'),
                val => !val || val.length >= 3 || this.$tr('isite.cms.message.fieldMinLeng', {num: 3})
              ],
            },
          },
          symbolLeft: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('icommerce.cms.form.symbolLeft')}*`
            },
          },
          symbolRight: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('icommerce.cms.form.symbolRight')}*`
            },
          },
          decimalSeparator: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('icommerce.cms.form.decimalSeparator')}*`
            },
          },
          thousandsSeparator: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('icommerce.cms.form.thousandsSeparator')}*`
            },
          },
          decimals: {
            value: '',
            type: 'input',
            props: {
              type: 'number',
              label: `${this.$tr('icommerce.cms.form.decimals')}*`,
              rules: [
                val => !val || val.length == 1 || this.$tr('isite.cms.message.fieldMaxLeng', {num: 1})
              ],
            },
          },
          value: {
            value: '',
            type: 'input',
            props: {
              type: 'number',
              label: `${this.$tr('isite.cms.label.value')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
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
          defaultCurrency: {
            value: 0,
            type: 'select',
            isTranslatable: false,
            props: {
              label: `${this.$tr('isite.cms.form.default')}*`,
              options: [
                {label: this.$tr('isite.cms.label.yes'), value: 1},
                {label: this.$tr('isite.cms.label.no'), value: 0}
              ],
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          language: {
            type: 'select',
            props: {
              label: this.$tr('isite.cms.label.language')
            },
            loadOptions: {
              delayed: () => {
                return new Promise(resolve => {
                  //get core locales
                  const locales = this.$getSetting('core::locales')
                  const requestParams = {
                    refresh: true,
                    params: {filter: {settingGroupName: 'availableLocales'}}
                  }
                  //Request locales
                  this.$crud.index('apiRoutes.qsite.siteSettings', requestParams).then(response => {
                    //Map the locales as a select
                    const availableLocales = response.data.map(locale => ({
                      label: locale.name,
                      value: locale.iso,
                      id: locale.iso,
                    }))//.filter(locale => locales.includes(locale.iso))
                    resolve(availableLocales)
                  }).catch(error => {
                    this.$apiResponse.handleError(error, () => {
                      resolve([])
                    })
                  })
                })
              }
            }
          }
        }
      }
    }
  }
}
</script>
