<template>
  <div id="pageId" class="q-layout-page layout-padding">

    <div class="relative-position q-mb-lg backend-page" v-if="success">
      <div class="box">

        <div class="col-12">
          <locales v-model="locale" ref="localeComponent" :form="$refs.formContent"/>
        </div>

        <!--Form-->
        <q-form autocorrect="off" autocomplete="off" ref="formContent" class="full-width q-my-sm" v-if="locale.success"
                @submit="itemId?updateItem():createItem()" @validation-error="$alert.error($tr('isite.cms.message.formInvalid'))">
          <q-input outlined dense v-model="locale.formTemplate.name"
                   :label="`${$tr('isite.cms.form.name')} (${locale.language})*`"
                   :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"/>
          <div class="input-title">{{`${$tr('isite.cms.form.description')} (${locale.language})*`}}</div>
          <q-field borderless v-model="locale.formTemplate.description" :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]">
            <q-editor class="full-width" v-model="locale.formTemplate.description" />
          </q-field>
          <div class="row">
            <div class="col-12 text-right q-py-sm">
              <q-btn color="green" :loading="loading" @click="locale.formTemplate.rates.push(defaultRate)"
                     icon="fas fa-plus">
                <q-tooltip>
                  {{ $tr('icommerce.cms.newTaxRate') }}
                </q-tooltip>
              </q-btn>
            </div>
            <template v-for="(rate, i) in locale.formTemplate.rates" :key="i">
              <div v-if="locale.formTemplate.rates" class="col-12 q-py-xs">
                <div class="row q-col-gutter-sm">
                  <div class="col-4">
                    <!--<q-select outlined dense bg-color="white" v-model="rate.taxRateId"
                              :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"
                              :label="`${$tr('icommerce.cms.form.taxRate')}*`" style="width: 100%;"
                              emit-value map-options :options="optionsRate"
                    />-->
                    <!--Crud tax rate-->
                    <crud :crud-data="import('modules/qcommerce/_crud/taxRates')"
                          type="select" :crud-props="{label:`${$tr('icommerce.cms.form.taxRate')}*`}"
                          v-model="rate.taxRateId" :config="{options: {label: 'name', value: 'id'}}"
                    />
                  </div>
                  <div class="col-4">
                    <q-select outlined dense bg-color="white" v-model="rate.based"
                              :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"
                              :label="`${$tr('icommerce.cms.form.taxBased')}*`" style="width: 100%;"
                              emit-value map-options :options="optionsBased"
                    />
                  </div>
                  <div class="col-2 col-sm-3">
                    <q-input type="number" outlined dense v-model="rate.priority"
                             :label="`${$tr('icommerce.cms.form.priority')}`"
                             :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"/>
                  </div>
                  <div class="col-2 col-sm-1 text-right">
                    <q-btn color="red" :loading="loading" @click="deleteRateItem(i)"
                           icon="fas fa-trash" />
                  </div>
                </div>
              </div>
            </template>
          </div>
          <q-page-sticky
                  position="bottom-right"
                  :offset="[18, 18]">
            <!--Update button-->
            <q-btn v-if="$route.params.id" color="green" :loading="loading"
                   icon="fas fa-edit" :label="$tr('isite.cms.label.update')" type="submit"/>
            <!--Save button-->
            <q-btn v-else color="green" :loading="loading" icon="fas fa-edit"
                   :label="$tr('isite.cms.label.create')" type="submit"/>
          </q-page-sticky>
        </q-form>
      </div>
    </div>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
import { eventBus } from 'src/plugins/utils'
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
        eventBus.on('page.data.refresh', () => this.initForm())//Listen refresh event
      })
    },
    data() {
      return {
        locale: {},
        loading: false,
        success: false,
        itemId: false,
        optionsRate: [],
        optionsBased: [
          {
            value: '1',
            label: this.$tr('icommerce.cms.options.taxRateBased.shippingAddress'),
          },
          {
            value: '2',
            label: this.$tr('icommerce.cms.options.taxRateBased.paymentAddress'),
          },
          {
            value: '3',
            label: this.$tr('icommerce.cms.options.taxRateBased.storeAddress'),
          }
        ]
      }
    },
    computed: {
      dataLocale() {
        return {
          fields: {
            rates: []
          },
          fieldsTranslatable: {
            description: '',
            name: '',
          }
        }
      },
      defaultRate(){
        return {
          taxRateId: '',
          based: '2',
          priority: '0'
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
      async getData() {
        return new Promise((resolve, reject) => {
          const itemId = this.$clone(this.itemId)
          if (itemId) {
            let configName = 'apiRoutes.qcommerce.taxClasses'
            //Params
            let params = {
              refresh: true,
              params: {
                include: 'rates',
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
      deleteRateItem(i){
        this.locale.formTemplate.rates.splice(i,1)
      },
      orderDataItemToLocale(data) {
        let orderData = this.$clone(data)
        this.locale.form = this.$clone(orderData)
        setTimeout(()=>{
          this.locale.form.rates = orderData.rates
        },1000)
      },
      async updateItem() {
        if (await this.$refs.localeComponent.validateForm()) {
          this.loading = true
          let configName = 'apiRoutes.qcommerce.taxClasses'
          this.$crud.update(configName, this.itemId, this.getDataForm()).then(response => {
            this.$alert.success({message: `${this.$tr('isite.cms.message.recordUpdated')}`})
            this.$router.push({name: 'qcommerce.admin.taxClasses'})
            //this.initForm()
            this.loading = false
          }).catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('isite.cms.message.recordNoUpdated')})
          })
        }
      },
      async createItem() {
        if (await this.$refs.localeComponent.validateForm()) {
          this.loading = true
          let configName = 'apiRoutes.qcommerce.taxClasses'
          this.$crud.create(configName, this.getDataForm()).then(response => {
            this.$alert.success({message: `${this.$tr('isite.cms.message.recordCreated')}`})
            this.$router.push({name: 'qcommerce.admin.taxClasses'})
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
          if (valueItem == null || valueItem == undefined || valueItem.length === 0)
            delete response[item]
        }
        //response.selectable = JSON.stringify(response.selectable)
        return response
      },
    }
  }
</script>

<style scoped>

</style>
