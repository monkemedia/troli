import Cookie from 'js-cookie'

const state = () => ({
  token: null,
  id: null,
  details: null
})

const mutations = {
  SET_TOKEN (store, data) {
    store.token = data
  },

  SET_ID (store, data) {
    store.id = data
  },

  SET_DETAILS (store, data) {
    store.details = data
  },

  CLEAR_TOKEN (store) {
    store.token = null
  },

  CLEAR_ID (store) {
    store.id = null
  },

  CLEAR_DETAILS (store) {
    store.details = null
  }
}

const actions = {
  initCustomerToken ({ dispatch, commit }, req) {
    let token
    let customerId

    if (req) {
      if (req.headers && !req.headers.cookie) {
        return
      }
      const customerTokenCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('customer_token='))

      const customerIdCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('customer_id='))

      if (!customerTokenCookie || !customerIdCookie) {
        return
      }

      token = customerTokenCookie.substring(customerTokenCookie.indexOf('=') + 1) // Using this method as tokens contain more than 1 equals (=) sign
      customerId = customerIdCookie.substring(customerIdCookie.indexOf('=') + 1)
    } else {
      token = localStorage.getItem('customer_token')
      customerId = localStorage.getItem('customer_id')
    }
    if (!token) {
      dispatch('signout')
      return
    }

    commit('SET_TOKEN', token)
    commit('SET_ID', customerId)
  },

  initCustomerDetails ({ dispatch, commit }, req) {
    let details

    if (req) {
      if (req.headers && !req.headers.cookie) {
        return
      }
      const customerDetailsCookie = req.headers.cookie
        .split(';')
        .find(c => c.trim().startsWith('customer_details='))

      if (!customerDetailsCookie) {
        return
      }

      details = customerDetailsCookie.substring(customerDetailsCookie.indexOf('=') + 1) // Using this method as detailss contain more than 1 equals (=) sign
      details = decodeURIComponent(details)
      details = JSON.parse(details)
    } else {
      details = localStorage.getItem('customer_details')
    }

    //  console.log('MONKEY', JSON.parse(details))

    commit('SET_DETAILS', details)
  },

  setCustomerToken ({ commit }, data) {
    commit('SET_TOKEN', data.token)
    commit('SET_ID', data.id)

    Cookie.set('customer_token', data.token)
    Cookie.set('customer_id', data.id)

    if (process.client) {
      localStorage.setItem('customer_token', data.token)
      localStorage.setItem('customer_id', data.id)
    }
  },

  setCustomerDetails ({ commit }, data) {
    commit('SET_DETAILS', data.data)

    Cookie.set('customer_details', data.data)

    if (process.client) {
      localStorage.setItem('customer_details', JSON.stringify(data.data))
    }
  },

  async login ({ dispatch }, data) {
    const customerToken = await this.$moltin.customerToken(data)
    const customerDetails = await this.$moltin.getCustomer(customerToken.data.customer_id)

    dispatch('setCustomerToken', {
      token: customerToken.data.token,
      id: customerToken.data.customer_id
    })

    dispatch('setCustomerDetails', customerDetails)
  },

  // register ({ dispatch }, data) {
  //   // If vendor equals true, we create a shop for them
  //   return dispatch('shop/createShop', data, { root: true })
  //     .then((shopId) => {
  //       return api.auth.register({ ...data, shop_id: shopId.data.shop._id })
  //     })
  // },

  signOut ({ dispatch, commit }, req) {
    commit('CLEAR_TOKEN')
    commit('CLEAR_ID')
    commit('CLEAR_DETAILS')

    Cookie.remove('customer_token')
    Cookie.remove('customer_id')
    Cookie.remove('customer_details')

    if (process.client) {
      localStorage.removeItem('customer_token')
      localStorage.removeItem('customer_id')
      localStorage.removeItem('customer_details')
    }
  }
}

const getters = {
  isAuthenticated (state) {
    return !!state.token
  },

  getToken (state) {
    return state.token
  },

  getId (state) {
    return state.id
  },

  getDetails (state) {
    return state.details
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
