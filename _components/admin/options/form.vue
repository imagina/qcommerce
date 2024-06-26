<template>
  <div class="row gutter-x-sm relative-position" v-if="success">

    <div class="col-12">
      <locales v-model="locale" ref="localeComponent" :form="$refs.formContent"/>
    </div>

    <!--Form-->
    <q-form autocorrect="off" autocomplete="off" ref="formContent" class="full-width q-my-sm" v-if="locale.success"
            @submit="updateItem()" @validation-error="$alert.error($tr('isite.cms.message.formInvalid'))">
      <dynamic-field v-for="(field, fieldKey) in formFields" :key="fieldKey" :field="field"
                     v-model="locale.formTemplate[fieldKey]" :language="locale.language"/>

      <q-btn class="float-right" v-if="itemId" color="green" :loading="loading" unelevated no-caps
             :label="$tr('isite.cms.label.save')" type="submit" rounded/>
    </q-form>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>

export default {
  components: {},
  watch: {
    $route(to, from) {
      this.initForm()
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.initForm()
    })
  },
  data() {
    return {
      locale: {},
      loading: false,
      success: false,
      itemId: false,
    }
  },
  computed: {
    dataLocale() {
      return {
        fields: {
          type: null,
        },
        fieldsTranslatable: {
          description: '',
        }
      }
    },
    formFields() {
      return {
        description: {
          value: '',
          type: 'input',
          isTranslatable: true,
          props: {
            label: `${this.$tr('isite.cms.form.description')}*`,
            rules: [
              val => !!val || this.$tr('isite.cms.message.fieldRequired')
            ],
          }
        },
        type: {
          value: null,
          type: 'select',
          isTranslatable: false,
          props: {
            label: `${this.$tr('isite.cms.form.type')}*`,
            rules: [
              val => !!val || this.$tr('isite.cms.message.fieldRequired')
            ]
          },
          loadOptions: {
            apiRoute: "apiRoutes.qcommerce.optionTypes",
            select: {label: 'label', id: 'value'}
          }
        }
      }
    }
  },
  methods: {
    async initForm() {
      this.loading = true
      this.success = false
      this.locale = this.$clone(this.dataLocale)
      this.itemId = this.$route.params.id
      if (this.locale.success) this.$refs.localeComponent.vReset()
      await this.getData()
      this.success = true
      this.loading = false
    },
    getData() {
      return new Promise((resolve, reject) => {
        const itemId = this.$clone(this.itemId)
        if (itemId) {
          let configName = 'apiRoutes.qcommerce.options'
          //Params
          let params = {
            refresh: true,
            params: {
              filter: {allTranslations: true}
            }
          }
          //Request
          this.$crud.show(configName, itemId, params).then(response => {
            this.orderDataItemToLocale(response.data)
            resolve(true)//Resolve
          }).catch(error => {
            this.$apiResponse.handleError(error, () => {
              this.$alert.error({message: this.$tr('isite.cms.message.errorRequest')})
              this.loading = false
              reject(false)//Resolve
            })
          })
        } else {
          resolve(true)//Resolve
        }
      })
    },
    orderDataItemToLocale(data) {
      let orderData = this.$clone(data)
      this.locale.form = this.$clone(orderData)
    },
    async updateItem() {
      if (await this.$refs.localeComponent.validateForm()) {
        this.loading = true
        let configName = 'apiRoutes.qcommerce.options'
        this.$crud.update(configName, this.itemId, this.getDataForm()).then(response => {
          this.$alert.success({message: `${this.$tr('isite.cms.message.recordUpdated')}`})
          //this.initForm()
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$alert.error({message: this.$tr('isite.cms.message.recordNoUpdated')})
        })
      }
    },
    getDataForm() {
      let response = this.locale.form
      for (var item in response) {
        let valueItem = response[item]
        if (valueItem == null || valueItem == undefined)
          delete response[item]
      }
      response.selectable = JSON.stringify(response.selectable)
      return response
    },
  }
}
</script>

<style scoped>

</style>
