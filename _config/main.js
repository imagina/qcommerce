export default {
  moduleName : 'icommerce',
  moduleTitle: 'icommerce.cms.sidebar.adminGroup',
  //Entities
  entityNames: {
    coupon: 'coupon',
    itemType: 'itemType',
    manufacturer: 'manufacturer',
    order: 'order',
    orderStatuses: 'orderStatuses',
    paymentMethod: 'paymentMethod',
    priceList: 'priceList',
    productCategory: 'productCategory',
    productDiscount: 'productDiscount',
    productOption: 'productOption',
    productOptionValue: 'productOptionValue',
    product: 'product',
    shippingMethod: 'shippingMethod',
    store: 'store',
    taxClass: 'taxClass',
    taxRate: 'taxRate',
    currencies: 'currencies',
    weightClasses: 'weightClasses',
    lengthClasses: 'lengthClasses',
    volumeClasses: 'volumeClasses',
    quantityClasses: 'quantityClasses',
    warehouses: 'warehouses',
    productWarehouse: 'productWarehouse',
    productList: 'productList'
  },
  //Quick Cards
  quickCards: [
    {
      active: true,
      permission: 'icommerce.orders.index',
      component: () => import('modules/qcommerce/_components/quick-cards/lastOrders')
    },
    {
      active: true,
      permission: 'icommerce.products.index',
      component: () => import('modules/qcommerce/_components/quick-cards/productsToSoldOut')
    }
  ]
}
