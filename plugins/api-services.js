import {
  trolifyOAuth,
  trolifyClient } from '~/utils/axiosInstance'

export default ({ store }, inject) => {
  trolifyClient.interceptors.request.use((config) => {
    const tokenType = store.state.auth.token_type
    const accessToken = store.state.auth.access_token
    config.headers.Authorization = `${tokenType} ${accessToken}`
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  trolifyClient.interceptors.response.use((response) => {
    return response
  }, async (error) => {
    if (error.response.status === 401 && error.response.data.message === 'Token has expired') {
      try {
        await store.dispatch('auth/authenticate')
        const tokenType = store.state.auth.token_type
        const accessToken = store.state.auth.access_token
        error.config.headers.Authorization = `${tokenType} ${accessToken}`
        return trolifyClient.request(error.config)
      } catch (err) {
        // store.dispatch('auth/logout', 'token_expired')
        console.log('WHOOPS')
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  })

  // Authenticate
  inject('authenticate', async (data) => {
    try {
      return await trolifyOAuth.post('/access_token', { data })
    } catch (err) {
      return Promise.reject(err)
    }
  })

  // GET Products
  inject('getProducts', async ({ page, keyword }) => {
    try {
      return await trolifyClient.get('/products/', { params: { page, keyword } })
    } catch (err) {
      return Promise.reject(err)
    }
  })

  // GET Product
  inject('getProduct', async (productId) => {
    try {
      return await trolifyClient.get(`/products/${productId}`)
    } catch (err) {
      return Promise.reject(err)
    }
  })
}
