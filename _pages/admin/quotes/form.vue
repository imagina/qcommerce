<template>
  <div id="quotesFormPage">
    <!--Content-->
    <div id="quoteFormContent" class="relative-position">
      <!--Quote-->
      <div class="row q-col-gutter-md">
        <!--Data-->
        <div class="col-4">
          <!--Customer data-->
          <div class="box box-auto-height q-mb-md">
            <!--Title-->
            <div class="row items-center">
              <div class="col box-title">{{ $tr('isite.cms.label.customer') }}</div>
              <div class="col text-right">
                <q-btn icon="fas fa-pen" @click="modalCustomer = true" color="green" round unelevated
                       class="btn-small"/>
              </div>
            </div>
            <q-separator class="q-my-sm"/>
            <!--Data-->
            <div v-for="(field, keyField) in form" :key="keyField" class="row">
              <label class="text-grey q-mr-sm">{{ keyField }}:</label> {{ form[keyField] }}
            </div>
            <!--Form-->
            <master-modal v-model="modalCustomer" :title="$tr('isite.cms.label.customer')">
              <dynamic-form v-model="form" :form-id="settings.formId" hide-title hide-progress-bar
                            @submit="modalCustomer = false" default-col-class="col-12"/>
            </master-modal>
          </div>
          <!--Quote data-->
          <div v-if="cartData && cartData.products.length">
            <!--Quote-->
            <div class="box box-auto-height q-mb-md">
              <!--Title-->
              <div class="row items-center">
                <div class="col box-title">{{ $tr('isite.cms.label.quote') }} | #{{ cartData.id }}</div>
              </div>
              <!--Products-->
              <div v-for="(itemQuote, itemQuoteKey) in cartData.products" :key="itemQuoteKey">
                <q-separator class="q-my-sm"/>
                <div class="row items-center">
                  <!--Name-->
                  <div class="col-7 text-caption text-blue-grey" style="line-height: 1">{{
                      itemQuote.product.name
                    }}
                  </div>
                  <!--Right content-->
                  <div class="col-5 text-right">
                    <!--price-->
                    ${{ $trn(itemQuote.total) }}
                    <!--Actions-->
                    <btn-menu class="q-ml-md" :actions="itemQuoteActions(itemQuote)"/>
                  </div>
                </div>
              </div>
            </div>
            <!--Summary-->
            <div class="box box-auto-height q-mb-md">
              <!--Title-->
              <div class="row items-center">
                <div class="col box-title">{{ $tr('isite.cms.label.summary') }}</div>
              </div>
              <q-separator class="q-my-sm"/>
              <!--Prices-->
              <div class="row">
                <!--Quantity-->
                <div class="col-6 text-blue-grey">{{ $tr('isite.cms.label.quantity') }}:</div>
                <div class="col-6 text-right">{{ cartData.products.length }}</div>
                <!--Total-->
                <div class="col-6 text-blue-grey">Total:</div>
                <div class="col-6 text-right">${{ $trn((parseInt(cartData.total)) || 0) }}</div>
              </div>
              <q-separator class="q-my-sm"/>
              <!--Actions-->
              <div id="actionsSummary" class="text-right">
                <q-btn :label="$tr('isite.cms.label.send')" color="green" rounded unelevated @click="sendQuote"/>
              </div>
            </div>
          </div>
          <!--Empty quote-->
          <div v-else class="box box-auto-height text-center">
            <div class="q-mb-sm">{{ $tr('icommerce.cms.message.addProductToQuote') }}</div>
            <q-icon name="fas fa-arrow-alt-circle-right" color="cyan" size="40px"/>
          </div>
        </div>
        <!--Select Products-->
        <div class="col-8">
          <crud v-bind="crudProductsProps"/>
        </div>
      </div>
      <!--Select product Config-->
      <select-product-config ref="selectProductConfig"/>
      <!--Inner Loading-->
      <inner-loading :visible="loading"/>
    </div>
  </div>
</template>
<script>
//Components
import selectProductConfig from 'modules/qcommerce/_components/selectProductConfig'
import { eventBus } from 'src/plugins/utils'

export default {
  beforeUnmount() {
    eventBus.off('qcommerce.quote.addProduct')
  },
  props: {},
  components: {selectProductConfig},
  watch: {},
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  data() {
    return {
      loading: false,
      modalCustomer: false,
      form: {},
      cartData: false
    }
  },
  computed: {
    //Return settings to use
    settings() {
      return {
        formId: this.$getSetting('icommerce::icommerceCartQuoteForm')
      }
    },
    //Crud Products Custom Data
    crudProductsProps() {
      return {
        crudData: import('modules/qcommerce/_crud/products'),
        title: this.$trp('isite.cms.label.product'),
        customData: {
          create: false,
          read: {
            showAs: 'grid',
            allowToggleView: false,
            grid: {
              //colClass: 'col-12 col-sm-6 col-lg-3 col-xl-2',
              component: () => import('modules/qcommerce/_components/admin/quotes/productCard')
            },
            filters: {
              status: {value: '1'},
              stockStatus: {value: 1},
              soonToSoldOut: {value: false},
              withDiscount: {value: false},
              categories: {
                value: null,
                type: 'treeSelect',
                props: {
                  label: `${this.$tr('isite.cms.form.category')}:`,
                  clearable: true,
                },
                loadOptions: {
                  apiRoute: 'apiRoutes.qcommerce.categories'
                }
              },
              manufacturers: {
                value: null,
                type: 'select',
                props: {
                  label: `${this.$tr('icommerce.cms.form.manufacturer')}:`,
                  clearable: true,
                },
                loadOptions: {
                  apiRoute: 'apiRoutes.qcommerce.manufacturers',
                  select: {label: 'name', id: 'id'}
                }
              }
            }
          },
          update: false,
          delete: false
        }
      }
    }
  },
  methods: {
    async init() {
      //Validate customer data
      if (!Object.keys(this.form).length) this.modalCustomer = true
      //Manage add products
      this.manageAddProduct()
      //Get cart
      this.getCart()
    },
    //get cart
    getCart() {
      return new Promise((resolve, reject) => {
        this.loading = true
        //Request params
        let requestData = {userId: this.$store.state.quserAuth.userId}
        //Request
        this.$crud.create('apiRoutes.qcommerce.carts', requestData).then(response => {
          this.cartData = response.data
          this.loading = false
        }).catch(error => {
          this.loading = false
          reject(error)
        })
      })
    },
    //Manage Add product
    manageAddProduct() {
      eventBus.on('qcommerce.quote.addProduct', product => {
        this.$refs.selectProductConfig.load({
          productId: product.id,
          actionLabel: this.$tr('isite.cms.label.add'),
          callBack: (productData) => this.addProduct(productData)
        })
      })
    },
    //Instance product quote actions
    itemQuoteActions(itemQuote) {
      return [
        {
          icon: 'fas fa-pen',
          color: 'red',
          label: `${this.$tr('isite.cms.label.show')} / ${this.$tr('isite.cms.label.edit')}`,
          action: () => {
            this.$refs.selectProductConfig.load({
              productId: itemQuote.product.id,
              selectedOptions: itemQuote.productOptionValues.map(item => item.id),
              callBack: (productData) => {
                this.loading = true
                //Request data
                let requestData = {
                  cartId: this.cartData.id,
                  productId: productData.product.id,
                  quantity: 1,
                  productOptionValues: productData.options,
                  isCall: true
                }
                //Request
                this.$crud.update('apiRoutes.qcommerce.cartProducts', itemQuote.id, requestData).then(response => {
                  this.$alert.info({message: this.$tr('isite.cms.message.recordUpdated')})
                  this.getCart()
                }).catch(error => {
                  this.$alert.error({message: this.$tr('isite.cms.message.recordNoUpdated')})
                  this.loading = false
                })
              }
            })
          }
        },
        //Delete cart product
        {
          icon: 'fas fa-trash-alt',
          color: 'red',
          label: this.$tr('isite.cms.label.delete'),
          action: () => {
            this.loading = true
            this.$crud.delete('apiRoutes.qcommerce.cartProducts', itemQuote.id).then(response => {
              this.$alert.info({message: this.$tr('isite.cms.message.recordDeleted')})
              this.getCart()
            }).catch(error => {
              this.$alert.error({message: this.$tr('isite.cms.message.recordNoDeleted')})
              this.loading = false
            })
          }
        }
      ]
    },
    //Add product to cart
    addProduct(data) {
      return new Promise((resolve, reject) => {
        this.loading = true
        //Request data
        let requestData = {
          cartId: this.cartData.id,
          productId: data.product.id,
          quantity: 1,
          productOptionValues: data.options,
          isCall: true
        }
        //Request
        this.$crud.create('apiRoutes.qcommerce.cartProducts', requestData).then(response => {
          this.$alert.info({message: `${this.$tr('isite.cms.message.recordCreated')}`})
          this.getCart()
          resolve(response.data)
        }).catch(error => {
          this.$alert.error({message: `${this.$tr('isite.cms.message.recordNoCreated')}`})
          this.loading = false
          reject(error)
        })
      })
    },
    //Send quote
    sendQuote() {
      return new Promise((resolve, reject) => {
        //Validate Email
        if (!this.form.email) {
          this.modalCustomer = true
          return resolve(false)
        }
        //Loading
        this.loading = true
        //Request data
        let requestData = {
          cartId: this.cartData.id,
          type: 'quote',
          firstName: this.form.first_name || '',
          lastName: this.form.last_name || '',
          email: this.form.email || '',
          telephone: this.form.telephone || '',
          options: {quoteForm: this.form}
        }
        //Request
        this.$crud.create('apiRoutes.qcommerce.orders', requestData).then(response => {
          this.$alert.info({message: `${this.$tr('isite.cms.message.recordCreated')}`})
          this.$router.push({name: 'qcommerce.admin.quotes.index'})
        }).catch(error => {
          this.$alert.error({message: `${this.$tr('isite.cms.message.recordNoCreated')}`})
          this.loading = false
        })
      })
    }
  }
}
</script>
<style lang="scss">
#quotesFormPage {
  .q-tab-panels {
    background: transparent;
  }
}
</style>
