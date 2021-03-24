export default {
  //Product List
  products: {
    permission: 'icommerce.products.manage',
    activated: true,
    path: '/ecommerce/products',
    name: 'qcommerce.admin.products.index',
    crud: import('@imagina/qcommerce/_crud/products'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminProducts',
    icon: 'fas fa-boxes',
    authenticated: true,
    subHeader: {refresh: true}
  },
  //Product Create
  productCreate: {
    permission: 'icommerce.products.create',
    activated: true,
    path: '/ecommerce/products/create',
    name: 'qcommerce.admin.products.create',
    page: () => import('@imagina/qcommerce/_pages/admin/products/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminProductCreate',
    icon: 'fas fa-boxes',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qcommerce.products']
    }
  },
  //Product Update
  productEdit: {
    permission: 'icommerce.products.edit',
    activated: true,
    path: '/ecommerce/products/:id',
    name: 'qcommerce.admin.products.edit',
    page: () => import('@imagina/qcommerce/_pages/admin/products/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminProductEdit',
    icon: 'fas fa-boxes',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qcommerce.products']
    }
  },
  //Categories list
  categories: {
    permission: 'icommerce.categories.manage',
    activated: true,
    path: '/ecommerce/product-categories',
    name: 'qcommerce.admin.categories',
    crud: import('@imagina/qcommerce/_crud/productCategories'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminCategories',
    icon: 'fas fa-layer-group',
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
    crud: import('@imagina/qcommerce/_crud/productOptions'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminOptions',
    icon: 'fas fa-cogs',
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
    page: () => import('@imagina/qcommerce/_pages/admin/option/show'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminOptionsEdit',
    icon: 'fas fa-cogs',
    authenticated: true,
  },
  //Product options values
  optionValues: {
    permission: 'icommerce.optionvalues.index',
    activated: true,
    path: '/ecommerce/product-options-values',
    name: 'qcommerce.admin.options.values',
    page: () => import('@imagina/qcommerce/_pages/admin/optionValues/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminValues',
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
    page: () => import('@imagina/qcommerce/_pages/admin/optionValues/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminValuesCreate',
    icon: 'fas fa-stream',
    authenticated: true,
  },
  optionValuesUpdate: {
    permission: 'icommerce.optionvalues.update',
    activated: true,
    path: '/ecommerce/product-options/:optionId/value/:id',
    name: 'qcommerce.admin.optionValues.update',
    page: () => import('@imagina/qcommerce/_pages/admin/optionValues/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminValuesEdit',
    icon: 'fas fa-stream',
    authenticated: true,
  },
  // Payment Methods
  paymentMethods: {
    permission: 'icommerce.payment-methods.manage',
    activated: true,
    path: '/payment-methods',
    name: 'qcommerce.admin.payment.methods',
    crud: import('@imagina/qcommerce/_crud/paymentMethods'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminPaymentMethods',
    icon: 'fas fa-money-bill-wave',
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
    crud: import('@imagina/qcommerce/_crud/shippingMethods'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminShippingMethods',
    icon: 'fas fa-shipping-fast',
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
    crud: import('@imagina/qcommerce/_crud/orders'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminOrders',
    icon: 'fas fa-box-open',
    authenticated: true,
    subHeader: {
      refresh: true,
    }
  },
  order: {
    permission: 'icommerce.orders.index',
    activated: true,
    path: '/order/:id',
    name: 'qcommerce.admin.shipping.orders.show',
    page: () => import('@imagina/qcommerce/_pages/admin/order/show'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.orderIndex',
    icon: 'fas fa-box-open',
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
    page: () => import('@imagina/qcommerce/_pages/admin/store/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminStores',
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
    crud: import('@imagina/qcommerce/_crud/manufacturers'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminManufacturers',
    icon: 'fas fa-industry',
    authenticated: true,
    subHeader: {refresh: true}
  },
  //Tax Class list
  taxClasses: {
    permission: 'icommerce.taxclasses.index',
    activated: true,
    path: '/ecommerce/tax-classes',
    name: 'qcommerce.admin.taxClasses',
    page: () => import('@imagina/qcommerce/_pages/admin/taxClass/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminTaxClasses',
    icon: 'fas fa-percentage',
    authenticated: true,
    subHeader: {
      refresh: true,
    }
  },
  //Tax Class create
  taxClassCreate: {
    permission: null,
    activated: true,
    path: '/ecommerce/tax-classes/create',
    name: 'qcommerce.admin.taxClasses.create',
    page: () => import('@imagina/qcommerce/_pages/admin/taxClass/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminTaxClassesCreate',
    icon: 'fas fa-percentage',
    authenticated: true,
  },
  //Tax Class edit
  taxClassEdit: {
    permission: null,
    activated: true,
    path: '/ecommerce/tax-classes/:id',
    name: 'qcommerce.admin.taxClasses.edit',
    page: () => import('@imagina/qcommerce/_pages/admin/taxClass/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminTaxClassesEdit',
    icon: 'fas fa-percentage',
    authenticated: true,
    subHeader: {
      refresh: true,
    }
  },
  //Tax Rate list
  taxRates: {
    permission: 'icommerce.taxrates.index',
    activated: true,
    path: '/ecommerce/tax-rates',
    name: 'qcommerce.admin.taxRates',
    page: () => import('@imagina/qcommerce/_pages/admin/taxRate/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminTaxRates',
    icon: 'fas fa-percentage',
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
    page: () => import('@imagina/qcommerce/_pages/admin/coupons/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminCoupons',
    icon: 'fas fa-ticket-alt',
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
    page: () => import('@imagina/qcommerce/_pages/admin/coupons/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.createCoupons',
    icon: 'fas fa-ticket-alt',
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
    page: () => import('@imagina/qcommerce/_pages/admin/coupons/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.editCoupons',
    icon: 'fas fa-ticket-alt',
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
    crud: import('@imagina/qcommerce/_crud/priceLists'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminPriceLists',
    icon: 'fas fa-dollar-sign',
    authenticated: true,
    subHeader: {refresh: true}
  },
  itemTypes: {
    permission: 'icommerce.itemtypes.manage',
    activated: true,
    path: '/itemTypes',
    name: 'qcommerce.admin.itemTypes.index',
    crud: import('@imagina/qcommerce/_crud/itemTypes'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qcommerce.sidebar.adminItemTypes',
    icon: 'fas fa-list',
    authenticated: true,
    subHeader: {refresh: true}
  },
}
