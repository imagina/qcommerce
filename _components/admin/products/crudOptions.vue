<template>
  <div id="crudOptions" class="relative-position">
    <!--Form-->
    <div class="row q-col-gutter-sm">
      <!--Form Left-->
      <div class="col-12 col-md-4">
        <div class="border q-pa-sm">
          <!--Header-->
          <div class="q-mb-sm">
            <!--Title-->
            <div class="q-py-sm">{{ $tr('icommerce.cms.productOptions') }}</div>
          </div>
          <!--Message not option selected-->
          <div v-if="!productOptions.length" class="text-grey-8">
            {{ `${$tr('icommerce.cms.message.noOptions')}...` }}
          </div>
          <!--Options-->
          <recursive-options v-model="template.currentOption" :list-items="productOptions"
                             ref="optionList" @update:modelValue="setDataOption()" v-else
                             @add="addOption(template.currentOption)"
                             @delete="deleteOption(template.currentOption)"/>
          <!--Add new option-->
          <div class="text-right q-mt-md">
            <q-btn :label="$tr('isite.cms.label.add')" rounded outline color="green" @click="modal.show = true"/>
          </div>
        </div>
      </div>
      <!--Form Right-->
      <div class="col-12 col-md-8">
        <!--Message to select a option-->
        <div v-if="template.currentOption == null" class="q-pa-lg">
          <q-icon name="fas fa-exclamation-triangle" color="warning"></q-icon>
          {{ `${$tr('icommerce.cms.message.selectProduct')}...` }}
        </div>
        <!--Form-->
        <div v-else>
          <!--Option Name-->
          <div class="inline-block">
            <div class="input-title capitalize">{{ $tr('isite.cms.form.option') }}</div>
            <q-icon color="primary" name="fas fa-caret-right"></q-icon>
            {{ findOption(template.form.id).description }}
          </div>
          <!--Type-->
          <div class="inline-block q-ml-lg">
            <div class="input-title capitalize">{{ $tr('isite.cms.form.type') }}</div>
            <q-icon color="primary" name="fas fa-caret-right"></q-icon>
            {{ findOption(template.form.id).type }}
          </div>
          <!--Parent-->
          <div class="inline-block q-ml-lg" v-if="parseInt(template.form.parentId)">
            <div class="input-title">Parent</div>
            <q-icon color="primary" name="fas fa-caret-right"></q-icon>
            {{ findOption(template.form.parentId).description }}
          </div>
          <!--Required-->
          <div class="inline-block q-ml-lg">
            <div class="input-title capitalize">{{ $tr('isite.cms.form.required') }}</div>
            <q-toggle v-model="template.form.required" @update:modelValue="updateProductOption()"/>
          </div>
          <!--Form-->
          <div class="row q-col-gutter-sm q-mt-sm">
            <!--Option value parent-->
            <div class="col-12 col-md-4"
                 v-if="showFieldForm && parseInt(template.form.parentId) && template.parentValues.length">
              <div class="input-title">{{ `${$tr('icommerce.cms.form.parentOptionValue')} *` }}</div>
              <tree-select
                  v-model="template.form.parentOptionValueId"
                  :clearable="false"
                  :options="template.parentValues"
                  placeholder="Select opion value..."
                  @update:modelValue="updateProductOption()"
              />
            </div>
            <!--Option Value-->
            <div class="col-12 col-md-4" v-if="showFieldForm">
              <q-input v-model="template.form.value" :label="`${$tr('icommerce.cms.form.optionValue')} *`"
                       @blur="updateProductOption()"/>
            </div>
            <!--Option Values-->
            <div class="col-12 q-mt-md" v-if="!showFieldForm">
              <crud-option-values :product-option="template.form" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Loading-->
    <inner-loading :visible="loading"/>
    <!--Modal-->
    <q-dialog v-model="modal.show" class="backend-page">
      <q-card>
        <!--Header-->
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>
            <q-icon name="fa fa-folder" class="q-mr-sm"/>
            <label>Nueva opción de producto</label>
          </q-toolbar-title>
          <q-btn flat v-close-popup icon="fas fa-times"/>
        </q-toolbar>

        <!--Content-->
        <div class="relative-position q-pa-md">
          <!--Parent-->
          <div v-if="modal.parentOption" class="q-mb-md">
            <div class="input-title">Parent</div>
            <q-icon color="primary" name="fas fa-caret-right"></q-icon>
            {{ modal.parentOption.description }}
          </div>
          <!--Options-->
          <crud :crud-data="import('modules/qcommerce/_crud/productOptions')" v-model="modal.optionSelected"
                type="select" @created="getOptions" :crud-props="{label : `${$tr('isite.cms.form.option')} *`}"
                :config="{options : {label : 'description', value : 'id'}}"/>
          <!--btn dave option-->
          <div class="text-right q-mt-md">
            <q-btn :label="$tr('isite.cms.label.save')" color="green" rounded unelevated
                   @click="createProductOption()"/>
          </div>
          <!--Loading-->
          <inner-loading :visible="modal.loading"/>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
//components
import recursiveOptions from 'modules/qcommerce/_components/admin/products/recursiveOptionsList'
import crudOptionValues from 'modules/qcommerce/_components/admin/products/crudOptionValues'

export default {
  props: {
    productId: {default: false}
  },
  components: {recursiveOptions, crudOptionValues},
  watch: {},
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data() {
    return {
      loading: false,
      loadingOptions: false,
      modal: {
        show: false,
        optionData: false,
        parentOption: 0,
        optionSelected: null,
        loading: false,
        formOption: false
      },
      productOptions: [],//Options
      productOptionsRoot: [],//Options
      productOptionValues: [],//Option values
      template: {
        optionSelected: null,
        parentOptions: [],
        currentOption: null,
        options: [],
        form: {},
        values: [],
        parentValues: []
      }
    }
  },
  computed: {
    showFieldForm() {
      let types = ['text', 'textarea']
      let response = types.indexOf(this.template.form.type)
      return (response == -1) ? false : true
    }
  },
  methods: {
    //Init template
    async init() {
      this.loading = true
      await this.getData()//Get data product
      this.getOptions()//Get options avaliable
      this.loading = false
    },
    //Get Data from product
    getData() {
      return new Promise((resolve, reject) => {
        this.loading = true
        let configName = 'apiRoutes.qcommerce.products'
        let params = {refresh: true, params: {include: 'productOptions', fields: 'id'}}
        this.$crud.show(configName, this.productId, params).then(response => {
          this.productOptions = this.$clone(this.arrayToTree(response.data.productOptions))//Set product Options
          this.productOptionsRoot = this.$clone(response.data.productOptions)//Set product Options

          // fix: backend does not provide required field when is false
          this.productOptionsRoot.forEach(item => {
            if(!item.hasOwnProperty('required')){
              item.required = false
            }
          })

          this.productOptionValues = this.$clone(response.data.optionValues)//Set product options values
          this.loading = false
          resolve(true)
        }).catch(error => {
          this.$apiResponse.handleError(error, () => {
            this.loading = false
            this.$alert.error({message: this.$tr('isite.cms.message.errorRequest')})
            reject(false)
          })
        })
      })
    },
    //Get option values
    getOptionValues(optionId, itemName = 'values') {
      this.loading = true
      let configName = 'apiRoutes.qcommerce.optionValues'
      let params = {params: {filter: {optionId: optionId}}}
      this.$crud.index(configName, params).then(response => {
        this.template[itemName] = []//Reset options of template
        response.data.forEach(item => {//Order response as select
          this.template[itemName].push({label: item.description, id: item.id})
        })
        this.loading = false
      }).catch(error => {
        this.$apiResponse.handleError(error, () => {
          this.$alert.error({message: this.$tr('isite.cms.message.errorRequest')})
          this.loading = false
        })
      })
    },
    //Add to list option no added
    addOption(optionId = false) {
      if (optionId) this.modal.parentOption = this.findOption(optionId)
      else this.modal.parentOption = 0
      this.modal.show = true
    },
    //Create Product option just with product and option ID
    createProductOption() {
      if (this.modal.optionSelected) {
        this.modal.loading = true
        let configName = 'apiRoutes.qcommerce.productOptions'
        let dataOption = {//Data to create option
          productId: this.productId,
          optionId: this.$clone(this.modal.optionSelected.toString()),
          parentId: this.modal.parentOption.id || 0,
          required: 0
        }

        //Request
        this.$crud.create(configName, dataOption).then(async response => {
          this.$alert.success({message: this.$tr('isite.cms.message.recordCreated')})
          await this.getData()//Get data again
          this.modal.optionSelected = null//Reset option of select options
          //Get last option create
          for (var item of this.productOptions) {
            let currentOption = this.$clone(this.template.currentOption)
            if (item.id >= currentOption) this.template.currentOption = item.id
          }
          this.setDataOption()//Set data option
          this.$refs.optionList.vRefresh()//Refresh List options
          this.modal.loading = false
          this.modal.show = false
        }).catch(error => {
          this.$alert.error({message: this.$tr('isite.cms.message.recordNoCreated')})
          this.modal.show = false
          this.modal.loading = false
          this.modal.optionSelected = null//Reset option of select options
        })
      }
    },
    //Update Product Option
    updateProductOption() {
      this.loading = true
      let configName = 'apiRoutes.qcommerce.productOptions'//Config Name
      let form = this.$clone(this.template.form)//Get form
      if (!form.parentId) form.parentId = 0//Set null as default parent
      if (!form.parentOptionValueId) form.parentOptionValueId = null//Set null as default parent option

      // fix: required toggle
      this.productOptionsRoot.find((element) => {
        if(element.id == this.template.currentOption){
          if(this.template.form?.required != undefined){
            element.required = this.template.form.required
          }
        }
      })
      //Request
      this.$crud.update(configName, form.id, form).then(response => {
        this.$alert.success({message: this.$tr('isite.cms.message.recordUpdated')})
        this.setDataOption()
        this.loading = false
      }).catch(error => {
        this.$alert.error({message: this.$tr('isite.cms.message.recordNoUpdated')})
        this.loading = false
      })
    },
    //Delete option
    deleteOption(optionId) {
      if (this.checkToDeleteOption(optionId)) {
        const option = this.findOption(optionId)
        //Dialog to comfirm delete
        this.$q.dialog({
          title: option.keyDescription,
          preventClose: true,
          message: this.$tr('isite.cms.message.deleteRecord'),
          color: 'red',
          ok: this.$tr('isite.cms.label.delete'),
          cancel: this.$tr('isite.cms.label.cancel'),
        }).onOk(response => {//If comfirn delete action
          this.loading = true
          let configName = 'apiRoutes.qcommerce.productOptions'
          //Request
          this.$crud.delete(configName, optionId, {params: {}}).then(async response => {
            this.template.currentOption = null//Set null current option
            this.$alert.success({message: this.$tr('isite.cms.message.recordDeleted')})
            await this.getData()//Get data
            this.$refs.optionList.vRefresh()//Refresh List options
            this.loading = false
          }).catch((error) => {
            this.$alert.error({message: this.$tr('isite.cms.message.recordNoDeleted')})
            this.loading = false
          })
        }).onCancel(response => {
        })
      }
    },
    //Check if option is not parent of other option
    checkToDeleteOption(optionId) {
      const currentOption = this.$clone(this.template.currentOption)//Get current option
      this.template.currentOption = optionId//Set as current this option
      if (currentOption != optionId) this.setDataOption()//Set data from this option
      const option = this.findOption(optionId, 'parentId')//Find option to check
      if (option)//If exist option, show message to fedbak
        this.$q.dialog({
          message: this.$tr('icommerce.cms.message.noDeleteOption', {name: option.keyDescription}),
          title: this.$tr('isite.cms.label.warning'),
          color: 'red',
        }).then(data => {
          return false//Response
        }).catch(data => {

        })
      else return true//Response
    },
    //Set data and values from product option seleected
    setDataOption() {
      const selectedOption = this.$clone(this.template.currentOption)
      const option = this.$clone(this.template.form)
      //Update product options
      if (option.id) {
        for (var key in this.productOptions) {
          if (this.productOptions[key].id == option.id)
            this.productOptions[key] = option
        }
      }
      //Set new option
      if (selectedOption) {
        this.setParentOptions()//Order select to parent
        const newOption = this.findOption(selectedOption)//Find new option
        this.template.form = this.$clone(newOption)//Update form template
        this.getOptionValues(newOption.optionId)//Get Values from option
        this.setParentValues()//Get parent values
      }
      this.$refs.optionList.vRefresh()//Refresh List options
      this.updateOrder()
    },
    //Order in select options to parent
    setParentOptions() {
      this.template.parentOptions = []//Reset parent Options
      const currentOption = this.$clone(this.template.currentOption)
      this.productOptions.forEach((item, key) => {
        if (item.id != currentOption)
          this.template.parentOptions.push({
            label: item.description, id: item.id
          })
      })
    },
    //set Parent Values
    setParentValues() {
      const parentId = this.$clone(this.template.form.parentId)
      if (parentId) {
        const option = this.findOption(parentId)//Find option
        this.template.form.parentOptionId = option.optionId//Set parent option ID
        this.getOptionValues(option.optionId, 'parentValues')//Get Values from parent option
      } else {//Set null parent option value
        this.template.form.parentOptionId = null
        this.template.parentValues = []
        this.template.form.parentOptionValueId = null
      }
    },
    //Search options to select
    getOptions() {
      this.loadingOptions = true
      let configName = 'apiRoutes.qcommerce.options'
      let params = {refresh: true, params: {}}//Params
      //Request
      this.$crud.index(configName, params).then(response => {
        let options = []
        response.data.forEach(item => {//Order options to tree select
          options.push({label: item.description, id: item.id})
        })
        this.template.options = this.$clone(options)
        this.loadingOptions = false
      }).catch(error => {
        this.$apiResponse.handleError(error, () => {
          this.$alert.error({message: this.$tr('isite.cms.message.errorRequest')})
          this.loading = false
        })
      })
    },
    //Find option by parameter
    findOption(value, field = 'id') {
      const options = this.$clone(this.productOptionsRoot)//Get all options
      let response = false //Default response
      let index = options.findIndex(item => item[field] == value)//Find if this option is parent
      if (index >= 0) {
        response = options[index]//Assign data to response
        //Create keyDescription
        response.keyDescription = (index + 1) + '.' + options[index].description
      }
      return response
    },
    updateOrder() {
      return false
      let newdata = []
      this.treeToArray(this.productOptions, newdata)
      this.loading = true
      this.$crud.create('apiRoutes.qcommerce.productOptionOrder', {options: newdata})
          .then(response => {
            this.loading = false
            this.$alert.success({message: `${this.$tr('isite.cms.message.recordUpdated')}`})
          })
          .catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('isite.cms.message.errorRequest'), pos: 'bottom'})
          })
    },
    arrayToTree(elements, parentId = 0) {
      return elements.filter(element => {
        if ((element.parentId || 0) == parentId) {
          return element['children'] = this.arrayToTree(elements, element.id)
        }
      })
    },
    treeToArray(items, response, parentId = null) {
      let elements = [...items]
      elements.forEach((element, index) => {
        element.position = index
        element.parentId = parentId
        response.push(element)
        if (element.children.length) this.treeToArray(element.children, response, element.id)
      })
    }
  }
}
</script>

<style lang="scss">
#crudOptions {
  .border {
    border: 1px solid $grey-4;
  }
}
</style>
