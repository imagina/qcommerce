export default {
  orders: {
    permission: 'icommerce.orders.manage',
    activated: true,
    path: '/store/orders',
    name: 'qcommerce.panel.shipping.orders.index',
    crud: import('@imagina/qcommerce/_crud/orders'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master'),
    title: 'icommerce.cms.sidebar.panelOrders',
    icon: 'fa-light fa-receipt',
    authenticated: true,
    subHeader: {
      refresh: true,
    }
  },
  order: {
    permission: 'icommerce.orders.index',
    activated: true,
    path: '/store/orders/:id',
    name: 'qcommerce.shipping.orders.show',
    page: () => import('@imagina/qcommerce/_pages/admin/order/show'),
    layout: () => import('@imagina/qsite/_layouts/master'),
    title: 'icommerce.cms.sidebar.orderIndex',
    icon: 'fa-light fa-receipt',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qcommerce.orders']
    }
  },
  priceList: {
    permission: 'icommercepricelist.pricelists.index',
    activated: true,
    path: '/store/price-list',
    name: 'qcommerce.panel.shipping.priceList.index',
    page: () => import('@imagina/qcommerce/_pages/panel/priceList/index'),
    layout: () => import('@imagina/qsite/_layouts/master'),
    title: 'icommerce.cms.sidebar.adminPriceLists',
    icon: 'fa-light fa-list',
    authenticated: true,
    subHeader: {
      refresh: true
    }
  },
}
