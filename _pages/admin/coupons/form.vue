<template>
  <div id="pageId" class="q-layout-page layout-padding">

    <div class="relative-position q-mb-lg backend-page">
      <div class="box">
        <q-form @submit="$route.params.id ? updateItem() : createItem()" ref="formContent"
                @validation-error="$alert.error($tr('isite.cms.message.formInvalid'))"
                class="row q-col-gutter-x-md" autocomplete="off">
          <!-- Left Form -->
          <div class="col-md-8">
            <!--Code-->
            <q-input v-model="form.code" type="text" outlined dense :label="$tr('icommerce.cms.form.code')"
                     :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]">
              <template v-slot:after>
                <q-btn @click="generateCoupon()" round size="sm" color="primary" icon="fas fa-qrcode">
                  <q-tooltip>Generate Code</q-tooltip>
                </q-btn>
              </template>
            </q-input>
            <q-select outlined dense bg-color="white" v-model="form.typeDiscount"
                      :label="`${$tr('icommerce.cms.form.typeDiscount')}*`" style="width: 100%;"
                      emit-value map-options :options="[
                        {label: this.$tr('icommerce.cms.options.fixedValue'), value: '0'},
                        {label: this.$tr('icommerce.cms.options.percentage'), value: '1'},
                      ]"
                      :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"
            />

            <q-input v-model="form.discount" type="number" outlined dense
                     :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"
                     :label="`${$tr('icommerce.cms.form.discount')} *`"/>

            <q-input v-model="form.quantityTotal" type="number" outlined dense
                     :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"
                     :label="`${$tr('icommerce.cms.form.quantityTotal')} *`"/>

            <q-input v-model="form.quantityTotalCustomer" type="number" outlined dense
                     :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"
                     :label="`${$tr('icommerce.cms.form.quantityTotalCustomer')} *`"/>

            <q-input v-model="form.minimumOrderAmount" type="number" outlined dense
                     :label="`${$tr('icommerce.cms.form.minimumOrderAmount')} *`" v-if="false"/>

            <q-select outlined dense bg-color="white" v-model="form.type"
                      :label="`${$tr('icommerce.cms.form.allOrder')}*`" style="width: 100%;"
                      emit-value map-options :options="[
                        {label: this.$tr('isite.cms.label.no'), value: '0'},
                        {label: this.$tr('isite.cms.label.yes'), value: '1'},
                      ]"
                      :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"
            />

            <div v-show="form.type=='0'">

              <q-select outlined dense v-model="form.products" use-input
                        emit-value map-options
                        input-debounce="800" :options="productList" @filter="getProducts"
                        :label="`${$trp('isite.cms.label.product')}`"
                        multiple use-chips
                        style="width: 100%"
                        :hint="`${$tr('icommerce.cms.form.productHint')}`"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      {{ $tr('isite.cms.message.searchNotFound') }}
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

              <dynamic-field :field="dynamicFields.categories" v-model="form.categories"/>

              <dynamic-field :field="dynamicFields.manufacturers" v-model="form.manufacturers"/>
            </div>

          </div>

          <!-- Right Form -->
          <div class="col-md-4 ">
            <q-select outlined dense bg-color="white" v-model="form.status"
                      :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"
                      :label="`${$tr('icommerce.cms.form.status')}*`" style="width: 100%;"
                      emit-value map-options :options="[
                        {label: this.$tr('isite.cms.label.enabled'), value: '1'},
                        {label: this.$tr('isite.cms.label.disabled'), value: '2'},
                      ]"/>

            <q-input dense mask="date" bg-color="white" v-model="form.dateStart" color="primary"
                     :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"
                     :label="`${$tr('icommerce.cms.form.dateStart')}*`"
                     outlined placeholder="YYYY/MM/DD">
              <template v-slot:append>
                <q-icon name="fas fa-calendar-day"/>
                <q-popup-proxy ref="qDateStart" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.dateStart" @update:modelValue="$refs.qDateStart.hide()"/>
                </q-popup-proxy>
              </template>
            </q-input>

            <q-input dense mask="date" bg-color="white" v-model="form.dateEnd" color="primary"
                     :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"
                     :label="`${$tr('icommerce.cms.form.dateEnd')}*`"
                     outlined placeholder="YYYY/MM/DD">
              <template v-slot:append>
                <q-icon name="fas fa-calendar-day"/>
                <q-popup-proxy ref="qDateEnd" transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.dateEnd" @update:modelValue="$refs.qDateEnd.hide()"/>
                </q-popup-proxy>
              </template>
            </q-input>

            <q-select outlined dense bg-color="white" v-model="form.shipping"
                      :label="`${$tr('icommerce.cms.form.freeShipping')}*`" style="width: 100%;"
                      emit-value map-options :options="[
                        {label: this.$tr('isite.cms.label.yes'), value: '1'},
                        {label: this.$tr('isite.cms.label.no'), value: '0'},
                      ]"
                      :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"
                      v-if="false"
            />


            <q-select outlined dense bg-color="white" v-model="form.logged"
                      :label="`${$tr('icommerce.cms.form.logged')}*`" style="width: 100%;"
                      emit-value map-options :options="[
                        {label: this.$tr('isite.cms.label.yes'), value: '1'},
                        {label: this.$tr('isite.cms.label.no'), value: '0'},
                      ]"
                      :rules="[val => !!val || $tr('isite.cms.message.fieldRequired')]"
            />

            <dynamic-field :field="dynamicFields.includeDepartments" v-model="form.includeDepartments"/>
            <dynamic-field :field="dynamicFields.excludeDepartments" v-model="form.excludeDepartments"/>
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
        <inner-loading :visible="loading"/>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from 'src/plugins/utils'
export default {
  components: {},
  computed: {
    dynamicFields() {
      return {
        includeDepartments: {
          value: [0],
          type: 'select',
          loadOptions: {
            apiRoute: 'apiRoutes.quser.departments',
            select: {label: 'title', id: 'id'},
          },
          props: {
            clearable: true,
            multiple: true,
            label: `${this.$tr('icommerce.cms.form.customerGroup')}*`,
            options: [{
              label: 'All', value: 0
            }],
          }
        },
        excludeDepartments: {
          value: [],
          type: 'select',
          loadOptions: {
            apiRoute: 'apiRoutes.quser.departments',
            select: {label: 'title', id: 'id'},
          },
          props: {
            clearable: true,
            multiple: true,
            label: `${this.$tr('icommerce.cms.form.customerGroupExclude')}`,
          }
        },
        categories: {
          value: [],
          type: 'treeSelect',
          loadOptions: {
            apiRoute: 'apiRoutes.qcommerce.categories',
            select: {label: 'title', id: 'id'},
          },
          props: {
            clearable: true,
            multiple: true,
            label: `${this.$trp('isite.cms.label.category')}`,
          }
        },
        manufacturers: {
          value: [],
          type: 'select',
          loadOptions: {
            apiRoute: 'apiRoutes.qcommerce.manufacturers',
            select: {label: 'name', id: 'id'},
          },
          props: {
            clearable: true,
            multiple: true,
            useChips: true,
            label: `${this.$trp('icommerce.cms.form.manufacturer')}`,
          }
        },
      }
    }
  },
  data() {
    return {
      loading: false,
      types: [],
      productList: [],
      form: {
        id: '',
        code: '',
        discount: '',
        type: '1',
        typeDiscount: null,
        logged: '0',
        shipping: '0',
        minimumOrderAmount: '0',
        quantityProducts: '0',
        dateStart: '',
        dateEnd: '',
        quantityTotal: '',
        quantityTotalCustomer: '',
        status: 1,
        includeDepartments: [0],
        excludeDepartments: [],
        categories: [],
        products: [],
        manufacturers: [],
      },
    }
  },
  watch: {
    'form.type': function (val) {
      /*this.form.categoryId = null
      this.form.productId = null*/
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initForm()
      eventBus.on('page.data.refresh', () => this.initForm())
    })
  },
  methods: {
    initForm() {
      if (this.$route.params.id) this.getData()
    },
    getData() {
      this.loading = true
      let params = {
        refresh: true,
        params: {
          //include: 'categories,products,manufacturers'
          include: 'categories,products,manufacturers'
        }
      }
      this.$crud.show('apiRoutes.qcommerce.coupons', this.$route.params.id, params)
          .then(response => {
            let data = this.$clone(response.data)
            for (let x in data) {
              data[x] = Array.isArray(response.data[x]) ? response.data[x] : (response.data[x] != null ? response.data[x].toString() : null)
            }
            Object.assign(this.form, {...data})
            setTimeout(() => {
              if (this.form.products)
                if (this.form.products.length > 0)
                  this.getProductsFromBack()
              this.loading = false
            }, 1000)
          }).catch(error => {
            this.$apiResponse.handleError(error, () => {
              console.error(error)
              this.$alert.error({message: this.$tr('isite.cms.message.errorRequest'), pos: 'bottom'})
              this.loading = false
            })
      })
    },
    getProducts(val, update, abort) {
      //Validate length of val
      if (val.length < 2) return abort()

      let params = {params: {take: 100, filter: {search: val}}}
      //Request
      this.$crud.index('apiRoutes.qcommerce.products', params).then(response => {
        update(() => {
          let options = this.$array.select(response.data, {label: 'name', id: 'id'})
          this.productList = this.$clone(options)
        })
      }).catch(error => {
        this.$apiResponse.handleError(error, () => {
          update(() => {
            this.productList = []
          })
        })
      })
    },
    getProductsFromBack() {
      this.form.products = this.form.products.map(item => item.id)
      let params = {params: {take: 100, filter: {ids: this.form.products}}}
      //Request
      this.$crud.index('apiRoutes.qcommerce.products', params).then(response => {
        let options = this.$array.select(response.data, {label: 'name', id: 'id'})
        this.productList = this.$clone(options)
      }).catch(error => {
        this.$apiResponse.handleError(error, () => {
          this.productList = []
        })
      })
    },
    createItem() {
      this.loading = true
      this.$crud.create('apiRoutes.qcommerce.coupons', this.form)
          .then(response => {
            this.loading = false
            this.$router.push({name: 'qcommerce.admin.coupons.index'})
            this.$alert.success({message: `${this.$tr('isite.cms.message.recordCreated')} ID: ${response.data.id}`})
          })
          .catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('isite.cms.message.recordNoCreatde'), pos: 'bottom'})
          })
    },
    updateItem() {
      this.loading = true
      this.$crud.update('apiRoutes.qcommerce.coupons', this.form.id, this.form)
          .then(response => {
            this.loading = false
            this.$router.push({name: 'qcommerce.admin.coupons.index'})
            this.$alert.success({message: `${this.$tr('isite.cms.message.recordUpdated')}`})
            this.initForm()
          })
          .catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('isite.cms.message.recordNoUpdated'), pos: 'bottom'})
          })
    },
    generateCoupon() {
      this.form.code = this.makeCouponCode(20).toUpperCase()
    },
    makeCouponCode(length = 10) {
      let result = ''
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let charactersLength = characters.length
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result
    },
  }
}
</script>

