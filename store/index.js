import Vuex from 'vuex'
import auth from './modules/customer.js'

export default () => {
  return new Vuex.Store({
    modules: {
      auth
    },
    actions: {
      async nuxtServerInit ({ dispatch }, context) {
        await dispatch('auth/initCustomerToken', context.req)
        await dispatch('auth/initCustomerDetails', context.req)
      }
    }
  })
}
