<template>
  <div class="row gutter-x-sm relative-position" v-if="success">

    <div class="col-12">
      <locales v-model="locale" ref="localeComponent" :form="$refs.formContent"/>
    </div>

    <!--Form-->
    <q-form autocorrect="off" autocomplete="off" ref="formContent" class="full-width q-my-sm" v-if="locale.success"
            @submit="updateItem()" @validation-error="$alert.error($tr('isite.cms.message.formInvalid'))">
      <q-input outlined dense v-model="locale.formTemplate.description"
               :label="`${$tr('isite.cms.form.description')} (${locale.language})*`"
               :rules="[val => !!val || this.$tr('isite.cms.message.fieldRequired')]"/>

      <q-select :label="`${$tr('isite.cms.form.type')} (${locale.language})`"
                v-model="locale.formTemplate.type"
                :options="[
                  /*{label: 'Text', value: 'text'},
                  {label: 'Textarea', value: 'textarea'},*/
                  {label: 'Selección unica (Selector)', value: 'select'},
                  {label: 'Selección unica (Lista)', value: 'radio'},
                  {label: 'Selección multiple (Lista)', value: 'checkbox'},
                  /*{label: 'Image', value: 'image'},
                  {label: 'Color', value: 'color'},*/
                ]" outlined dense emit-value map-options/>
      <q-btn class="float-right" v-if="itemId" color="green" :loading="loading"
             icon="fas fa-save" :label="$tr('isite.cms.label.save')" type="submit" rounded/>
    </q-form>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>

  export default {
    components: {
    },
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
                this.$alert.error({message: this.$tr('isite.cms.message.errorRequest'), pos: 'bottom'})
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
            this.$alert.error({message: this.$tr('isite.cms.message.recordNoUpdated'), pos: 'bottom'})
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
