export default {
  //Price List Page
  priceList: {
    permission: null,
    activated: true,
    path: '/public/price-list',
    name: 'qcommerce.public.shipping.priceList.index',
    page: () => import('@imagina/qcommerce/_pages/panel/priceList/index'),
    layout: () => import('@imagina/qsite/_layouts/blankLogo'),
    title: 'icommerce.cms.sidebar.adminPriceLists',
    icon: 'fa-light fa-list',
    authenticated: false,
    subHeader: {
      refresh: true
    }
  },
}
