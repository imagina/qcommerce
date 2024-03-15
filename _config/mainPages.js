export default {
  //Price List Page
  priceList: {
    permission: null,
    activated: true,
    path: '/store/public/price-list',
    name: 'qcommerce.public.shipping.priceList.index',
    page: () => import('src/modules/qcommerce/_pages/panel/priceList/index'),
    layout: () => import('layouts/blankLogo'),
    title: 'icommerce.cms.sidebar.adminPriceLists',
    icon: 'fa-light fa-list',
    authenticated: false,
    subHeader: {
      refresh: true
    }
  },
}
