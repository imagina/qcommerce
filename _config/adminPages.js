export default {
  //Product List
  products: {
    permission: 'icommerce.products.manage',
    activated: true,
    path: '/ecommerce/products',
    name: 'qcommerce.admin.products.index',
    crud: import('modules/qcommerce/_crud/products'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminProducts',
    icon: 'fa-light fa-boxes-stacked',
    authenticated: true,
    subHeader: {refresh: true}
  },
  //Product Create
  productCreate: {
    permission: 'icommerce.products.create',
    activated: true,
    path: '/ecommerce/products/create',
    name: 'qcommerce.admin.products.create',
    page: () => import('modules/qcommerce/_pages/admin/products/form'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminProductCreate',
    icon: 'fa-light fa-boxes-stacked',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qcommerce.products'],
      recommendations: {
        name: 'commerceProduct'
      }
    }
  },
  //Product Update
  productEdit: {
    permission: 'icommerce.products.edit',
    activated: true,
    path: '/ecommerce/products/:id',
    name: 'qcommerce.admin.products.edit',
    page: () => import('modules/qcommerce/_pages/admin/products/form'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminProductEdit',
    icon: 'fa-light fa-boxes-stacked',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qcommerce.products'],
      recommendations: {
        name: 'commerceProduct'
      }
    }
  },
  //Categories list
  categories: {
    permission: 'icommerce.categories.manage',
    activated: true,
    path: '/ecommerce/product-categories',
    name: 'qcommerce.admin.categories',
    crud: import('modules/qcommerce/_crud/productCategories'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminCategories',
    icon: 'fa-light fa-layer-group',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qcommerce.products']
    }
  },
  //Product options
  options: {
    permission: 'icommerce.options.manage',
    activated: true,
    path: '/ecommerce/product-options',
    name: 'qcommerce.admin.options',
    crud: import('modules/qcommerce/_crud/productOptions'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminOptions',
    icon: 'fa-light fa-diagram-subtask',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qcommerce.products']
    }
  },
  optionsEdit: {
    permission: 'icommerce.options.edit',
    activated: true,
    path: '/ecommerce/product-options/:id',
    name: 'qcommerce.admin.options.edit',
    page: () => import('modules/qcommerce/_pages/admin/option/show'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminOptionsEdit',
    icon: 'fa-light fa-diagram-subtask',
    authenticated: true,
    subHeader: {
      breadcrumb: ['qcommerce.options']
    }
  },
  //Product options values
  optionValues: {
    permission: 'icommerce.optionvalues.index',
    activated: true,
    path: '/ecommerce/product-options-values',
    name: 'qcommerce.admin.options.values',
    page: () => import('modules/qcommerce/_pages/admin/optionValues/index'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminValues',
    icon: 'fas fa-stream',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qcommerce.products', 'qcommerce.options']
    }
  },
  optionValuesCreate: {
    permission: 'icommerce.optionvalues.create',
    activated: true,
    path: '/ecommerce/product-options/values/:optionId',
    name: 'qcommerce.admin.optionValues.create',
    page: () => import('modules/qcommerce/_pages/admin/optionValues/form'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminValuesCreate',
    icon: 'fas fa-stream',
    authenticated: true,
  },
  optionValuesUpdate: {
    permission: 'icommerce.optionvalues.update',
    activated: true,
    path: '/ecommerce/product-options/:optionId/value/:id',
    name: 'qcommerce.admin.optionValues.update',
    page: () => import('modules/qcommerce/_pages/admin/optionValues/form'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminValuesEdit',
    icon: 'fas fa-stream',
    authenticated: true,
  },
  // Payment Methods
  paymentMethods: {
    permission: 'icommerce.payment-methods.manage',
    activated: true,
    path: '/payment-methods',
    name: 'qcommerce.admin.payment.methods',
    crud: import('modules/qcommerce/_crud/paymentMethods'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminPaymentMethods',
    icon: 'fa-light fa-money-check-dollar-pen',
    authenticated: true,
    subHeader: {
      refresh: true,
    }
  },
  // Shipping Methods
  shippingMethods: {
    permission: 'icommerce.shipping-methods.manage',
    activated: true,
    path: '/shipping-methods',
    name: 'qcommerce.admin.shipping.methods',
    crud: import('modules/qcommerce/_crud/shippingMethods'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminShippingMethods',
    icon: 'fa-light fa-truck-fast',
    authenticated: true,
    subHeader: {
      refresh: true
    }
  },
  orders: {
    permission: 'icommerce.orders.manage',
    activated: true,
    path: '/orders',
    name: 'qcommerce.admin.shipping.orders.index',
    crud: import('modules/qcommerce/_crud/orders'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminOrders',
    icon: 'fa-light fa-receipt',
    authenticated: true,
    subHeader: {
      refresh: true,
    }
  },
  order: {
    permission: 'icommerce.orders.index',
    activated: true,
    path: '/order/:id',
    name: 'qcommerce.shipping.orders.show',
    page: () => import('modules/qcommerce/_pages/admin/order/show'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.orderIndex',
    icon: 'fa-light fa-receipt',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qcommerce.orders']
    }
  },
  orderStatuses: {
    permission: 'icommerce.orderstatuses.manage',
    activated: true,
    path: '/order-statuses/',
    name: 'qcommerce.shipping.orderStatuses',
    crud: import('modules/qcommerce/_crud/orderStatuses'),
    page: () => import('modules/qcrud/_pages/admin/crudPage.vue'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminOrderStatuses',
    icon: 'fa-light fa-receipt',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qcommerce.orders']
    }
  },
  //Stores list
  stores: {
    permission: 'icommerce.stores.index',
    activated: true,
    path: '/ecommerce/stores',
    name: 'qcommerce.admin.stores',
    page: () => import('modules/qcommerce/_pages/admin/store/index'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminStores',
    icon: 'fas fa-store',
    authenticated: true,
    subHeader: {
      refresh: true,
    }
  },
  //Manufacturers list
  manufacturers: {
    permission: 'icommerce.manufacturers.manage',
    activated: true,
    path: '/ecommerce/manufacturers',
    name: 'qcommerce.admin.manufacturers',
    crud: import('modules/qcommerce/_crud/manufacturers'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminManufacturers',
    icon: 'fa-light fa-industry-windows',
    authenticated: true,
    subHeader: {refresh: true}
  },
  //Tax Class list
  taxClasses: {
    permission: 'icommerce.taxclasses.manage',
    activated: true,
    path: '/ecommerce/tax-classes',
    name: 'qcommerce.admin.taxClasses',
    crud: import('modules/qcommerce/_crud/taxClasses'),
    page: () => import('modules/qcrud/_pages/admin/crudPage.vue'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminTaxes',
    icon: 'fa-light fa-percentage',
    authenticated: true,
    subHeader: {
      refresh: true,
    }
  },
  //Tax Class create
  taxClassCreate: {
    permission: 'icommerce.taxclasses.create',
    activated: true,
    path: '/ecommerce/tax-classes/create',
    name: 'qcommerce.admin.taxClasses.create',
    page: () => import('modules/qcommerce/_pages/admin/taxClass/form'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminTaxClassesCreate',
    icon: 'fa-light fa-percentage',
    authenticated: true,
  },
  //Tax Class edit
  taxClassEdit: {
    permission: 'icommerce.taxclasses.edit',
    activated: true,
    path: '/ecommerce/tax-classes/:id',
    name: 'qcommerce.admin.taxClasses.edit',
    page: () => import('modules/qcommerce/_pages/admin/taxClass/form'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminTaxClassesEdit',
    icon: 'fa-light fa-percentage',
    authenticated: true,
    subHeader: {
      refresh: true,
    }
  },
  //Tax Rate list
  taxRates: {
    permission: 'icommerce.taxrates.manage',
    activated: true,
    path: '/ecommerce/tax-rates',
    name: 'qcommerce.admin.taxRates',
    page: () => import('modules/qcommerce/_pages/admin/taxRate/index'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminTaxRates',
    icon: 'fa-light fa-percentage',
    authenticated: true,
    subHeader: {
      refresh: true,
    }
  },
  coupons: {
    permission: 'icommerce.coupons.manage',
    activated: true,
    path: '/coupons',
    name: 'qcommerce.admin.coupons.index',
    crud: import("modules/qcommerce/_crud/coupons"),
    page: () => import('modules/qcrud/_pages/admin/crudPage.vue'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminCoupons',
    icon: 'fa-light fa-ticket',
    authenticated: true,
    subHeader: {
      refresh: true,
    }
  },
  couponsCreate: {
    permission: 'icommerce.coupons.create',
    activated: true,
    path: '/coupons/create',
    name: 'qcommerce.admin.coupons.create',
    page: () => import('modules/qcommerce/_pages/admin/coupons/form'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.createCoupons',
    icon: 'fa-light fa-ticket',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qcommerce.coupons']
    }
  },
  couponsEdit: {
    permission: 'icommerce.coupons.edit',
    activated: true,
    path: '/coupons/:id',
    name: 'qcommerce.admin.coupons.edit',
    page: () => import('modules/qcommerce/_pages/admin/coupons/form'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.editCoupons',
    icon: 'fa-light fa-ticket',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qcommerce.coupons']
    }
  },
  priceLists: {
    permission: 'icommercepricelist.pricelists.manage',
    activated: true,
    path: '/priceLists',
    name: 'qcommerce.admin.priceLists.index',
    crud: import('modules/qcommerce/_crud/priceLists'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommercepricelist.cms.sidebar.priceLists',
    icon: 'fa-light fa-list',
    authenticated: true,
    subHeader: {refresh: true}
  },
  itemTypes: {
    permission: 'icommerce.itemtypes.manage',
    activated: true,
    path: '/itemTypes',
    name: 'qcommerce.admin.itemTypes.index',
    crud: import('modules/qcommerce/_crud/itemTypes'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminItemTypes',
    icon: 'fas fa-list',
    authenticated: true,
    subHeader: {refresh: true}
  },
  //Product List
  currency: {
    permission: 'icommerce.currencies.manage',
    activated: true,
    path: '/ecommerce/currencies',
    name: 'qcommerce.admin.currencies.index',
    crud: import('modules/qcommerce/_crud/currencies'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.currencies',
    icon: 'fa-light fa-circle-dollar-to-slot',
    authenticated: true,
    subHeader: {refresh: true}
  },
  //Quantity Classes
  quantityClasses: {
    permission: 'icommerce.quantityclasses.manage',
    activated: true,
    path: '/ecommerce/quantity-classes',
    name: 'qcommerce.admin.quantityClasses.index',
    crud: import('modules/qcommerce/_crud/quantityClasses'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.quantityClasses',
    icon: 'fa-light fa-grip-dots',
    authenticated: true,
    subHeader: {refresh: true}
  },
  //Weight Classes
  weightClasses: {
    permission: 'icommerce.weightclasses.manage',
    activated: true,
    path: '/ecommerce/weight-classes',
    name: 'qcommerce.admin.weightClasses.index',
    crud: import('modules/qcommerce/_crud/weightClasses'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.weightClasses',
    icon: 'fa-light fa-weight-scale',
    authenticated: true,
    subHeader: {refresh: true}
  },
  //Length Classes
  lengthClasses: {
    permission: 'icommerce.lengthclasses.manage',
    activated: true,
    path: '/ecommerce/length-classes',
    name: 'qcommerce.admin.lengthClasses.index',
    crud: import('modules/qcommerce/_crud/lengthClasses'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.lengthClasses',
    icon: 'fa-light fa-ruler-combined',
    authenticated: true,
    subHeader: {refresh: true}
  },
  //Volume Classes
  volumeClasses: {
    permission: 'icommerce.volumeclasses.manage',
    activated: true,
    path: '/ecommerce/volume-classes',
    name: 'qcommerce.admin.volumeClasses.index',
    crud: import('modules/qcommerce/_crud/volumeClasses'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.volumeClasses',
    icon: 'fa-light fa-jug-bottle',
    authenticated: true,
    subHeader: {refresh: true}
  },
  //Quotes
  quotes: {
    permission: 'icommerce.quotes.manage',
    activated: true,
    path: '/icommerce/quotes',
    name: 'qcommerce.admin.quotes.index',
    crud: import('modules/qcommerce/_crud/quotes'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminQuotes',
    icon: 'fa-light fa-file-invoice-dollar',
    authenticated: true,
    subHeader: {refresh: true}
  },
  //Create Quote
  quoteCreate: {
    permission: 'icommerce.quotes.create',
    activated: true,
    path: '/icommerce/quotes/create',
    name: 'qcommerce.admin.quotes.create',
    page: () => import('modules/qcommerce/_pages/admin/quotes/form'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminQuoteCreate',
    icon: 'fa-light fa-file-invoice-dollar',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qcommerce.quotes']
    }
  },
  //Warehouses
  warehouses: {
    permission: 'icommerce.volumeclasses.manage',
    activated: true,
    path: '/ecommerce/warehouses',
    name: 'warehouses',
    crud: import('modules/qcommerce/_crud/warehouses'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.warehouses',
    icon: 'fa-light fa-warehouse',
    authenticated: true,
    subHeader: {refresh: true}
  },
  productLists: {
    permission: 'icommercepricelist.productlist.manage',
    activated: true,
    path: '/productLists',
    name: 'qcommerce.admin.productLists.index',
    crud: import('modules/qcommerce/_crud/productList'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommercepricelist.cms.sidebar.productList',
    icon: 'fa-light fa-hand-holding-usd',
    authenticated: true,
    subHeader: { refresh: true }
  },
  productWarehouse: {
    permission: 'icommerce.productwarehouses.manage',
    activated: true,
    path: '/productWarehouse',
    name: 'qcommerce.admin.productWarehouses.index',
    crud: import('modules/qcommerce/_crud/productWarehouse'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'icommerce.cms.sidebar.adminProductWarehouse',
    icon: 'fa-light fa-warehouse-full',
    authenticated: true,
    subHeader: { refresh: true }
  },
}
