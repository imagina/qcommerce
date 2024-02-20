import eCommerceService from 'modules/qcommerce/_services/index'
import { eventBus } from 'src/plugins/utils'

export const GET_ORDERS_PENDING = ({ commit, state, dispatch }, Vue) => {
  return new Promise(async (resolve, reject) => {
    let params = { refresh: true, params: { filter: { status: 13 } } }
    eCommerceService.crud.index('apiRoutes.qcommerce.orders', params).then(response => {
      commit('SET_ORDERS_PENDING', response.data)
      eventBus.emit('new-order')
      eventBus.root.$emit('orders-updated')
      resolve(true)
    }).catch(error => {
      console.error('[GET ORDERS ACTION]', error)
      reject(error)
    })
  })
}
