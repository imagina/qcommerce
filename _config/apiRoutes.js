const moduleName = 'icommerce';
const moduleVersion = 'v3';
const urlBase = `/${moduleName}/${moduleVersion}`
const urlBase2 = `/${moduleName}pricelist/${moduleVersion}`
const urlStripe = `/icommercestripe/v1`

export default {
  urlBase: urlBase,
  version: moduleVersion,
  products: `${urlBase}/products`,
  productOptions: `${urlBase}/product-option`,
  productOptionOrder: `${urlBase}/product-option/order`,
  productOptionValues: `${urlBase}/product-option-values`,
  options: `${urlBase}/options`,
  optionTypes: `${urlBase}/option-types`,
  optionValues: `${urlBase}/option-values`,
  optionValuesOrdener: `${urlBase}/option-values/order`,
  categories: `${urlBase}/categories`,
  carts: `${urlBase}/carts`,
  cartProducts: `${urlBase}/cart-products`,
  paymentMethods: `${urlBase}/payment-methods`,
  shippingMethods: `${urlBase}/shipping-methods`,
  orders: `${urlBase}/orders`,
  orderStatus: `${urlBase}/order-statuses`,
  orderStatusHistory: `${urlBase}/order-status-history`,
  coupons: `${urlBase}/coupons`,
  stores: `${urlBase}/stores`,
  manufacturers: `${urlBase}/manufacturers`,
  taxClasses: `${urlBase}/tax-classes`,
  taxRates: `${urlBase}/tax-rates`,
  productDiscounts: `${urlBase}/product-discounts`,
  itemTypes: `${urlBase}/item-types`,
  priceLists: `${urlBase2}/price-lists`,
  weightClasses: `${urlBase}/weight-classes`,
  lengthClasses: `${urlBase}/length-classes`,
  volumeClasses: `${urlBase}/volume-classes`,
  quantityClasses: `${urlBase}/quantity-classes`,
  currencies: `${urlBase}/currencies`,
  ratings: `rateable/v1/ratings`,
  warehouses: `${urlBase}/warehouses`,
  productWarehouse: `${urlBase}/product-warehouse`,
  productOptionValueWarehouse: `${urlBase}/product-option-value-warehouse`,
  stripe: {
    connect: `${urlStripe}/payout/connect`,
    accountUser: `${urlStripe}/payout/connect/account/user`
  },
  productLists: `${urlBase2}/product-lists`,
}
