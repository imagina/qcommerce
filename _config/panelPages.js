export default {
  orders: {
    permission: 'icommerce.orders.manage',
    activated: true,
    path: '/store/orders',
    name: 'qcommerce.panel.shipping.orders.index',
    crud: import('modules/qcommerce/_crud/orders'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master'),
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
    page: () => import('modules/qcommerce/_pages/admin/order/show'),
    layout: () => import('layouts/master'),
    title: 'icommerce.cms.sidebar.orderIndex',
    icon: 'fa-light fa-receipt',
    authenticated: true,
    subHeader: {
      refresh: true,
      breadcrumb: ['qcommerce.orders']
    }
  },
}
