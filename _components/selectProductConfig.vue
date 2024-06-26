<template>
  <master-modal id="selectProductConfig" v-model="modal" :title="$tr('icommerce.cms.message.productSetup')"
                :loading="loading" :actions="modalActions">
    <!--Summary-->
    <div v-if="productData" class="box q-mb-md box-auto-height">
      <!--Title-->
      <div class="box-title text-lowercase">{{ productData.name }}</div>
      <q-separator class="q-my-sm"/>
      <!--Prices-->
      <div class="row">
        <!--Product price-->
        <div class="col-6 text-blue-grey">{{ $tr('isite.cms.label.price') }}:</div>
        <div class="col-6 text-right">${{ $trn(productData.price || 0) }}</div>
        <!--Options price-->
        <div class="col-6 text-blue-grey">{{ $trp('isite.cms.label.option') }}:</div>
        <div class="col-6 text-right">${{ $trn(priceOptions) }}</div>
        <!--Total-->
        <div class="col-6 text-blue-grey">Total:</div>
        <div class="col-6 text-right">${{ $trn((parseInt(productData.price) + parseInt(priceOptions)) || 0) }}</div>
      </div>
    </div>
    <!--Options-->
    <div v-if="productData" class="box">
      <!--Title-->
      <div class="box-title">{{ $trp('isite.cms.label.option') }}</div>
      <q-separator class="q-mt-sm"/>
      <!--List-->
      <q-list class="q-pa-none">
        <q-item v-for="(option, optionKey) in productData.optionValues" :key="optionKey" clickable v-ripple
                class="q-pl-none q-pr-sm">
          <!--Checkbox-->
          <q-item-section>
            <q-checkbox v-model="params.selectedOptions" :key="option.id" :val="option.id" :label="option.optionValue"/>
          </q-item-section>
          <!--Price-->
          <q-item-section side>
            ${{ $trn(option.price) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </master-modal>
</template>
<script>
export default {
  props: {},
  components: {},
  watch: {},
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data() {
    return {
      loading: false,
      modal: false,
      productData: false,
      params: {
        productId: false,
        selectedOptions: [],
        callBack: () => {
        }
      }
    }
  },
  computed: {
    //Actions to modal
    modalActions() {
      return [
        {
          props: {
            label: this.params.actionLabel || this.$tr('isite.cms.label.save'),
            color: 'green'
          },
          action: () => this.emitProductConfig()
        }
      ]
    },
    //Price product options
    priceOptions() {
      let response = 0

      //Get options data selected
      if (this.params.selectedOptions && this.params.selectedOptions.length) {
        this.productData.optionValues.forEach(item => {
          if (this.params.selectedOptions.includes(item.id)) response += item.price
        })
      }

      //Response
      return response
    }
  },
  methods: {
    init() {
      this.getData()
    },
    //Load product to select
    load(params) {
      this.params = this.$clone({...this.params, ...params})
      this.getData(true)
      this.modal = true
    },
    //Get data
    getData(refresh = false) {
      if (this.params.productId) {
        return new Promise((resolve, reject) => {
          this.loading = true
          //Requets params
          let requestParams = {
            refresh: refresh,
            params: {include: 'optionValues'}
          }
          //Request
          this.$crud.show('apiRoutes.qcommerce.products', this.params.productId, requestParams).then(response => {
            //Set product data
            this.productData = response.data

            //Select default product options
            if (this.productData && this.productData.optionValues) {
              this.productData.optionValues.forEach(option => {
                if (!option.price) this.params.selectedOptions.push(this.$clone(option.id))
              })
            }

            this.loading = false
          }).catch(error => {
            this.$apiResponse.handleError(error, () => {
              this.loading = false
            })
          })
        })
      }
    },
    //Reset component
    reset() {
      this.productData = false
      this.params = {
        productId: false,
        selectedOptions: [],
        callBack: () => {
        }
      }
    },
    //Emit data
    emitProductConfig() {
      //Emit product configured
      this.params.callBack({
        product: this.$clone(this.productData),
        options: !this.params.selectedOptions.length ? [] :
            this.productData.optionValues.filter(opt => this.params.selectedOptions.includes(opt.id))
      })
      //close modal
      this.reset()
      this.modal = false
    }
  }
}
</script>
<style lang="scss">
#selectProductConfig {
  .q-option-group {
    .q-checkbox__label {
      color: $blue-grey;
    }
  }
}
</style>
