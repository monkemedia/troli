import Vuex from 'vuex'
import auth from './modules/customer.js'
import locales from './modules/locales.js'

export default () => {
  return new Vuex.Store({
    modules: {
      auth,
      locales
    },
    actions: {
      async nuxtServerInit ({ dispatch }, context) {
        // await dispatch('auth/initCustomerToken', context.req)
        // await dispatch('auth/initCustomerDetails', context.req)
      }
    }
  })
}
