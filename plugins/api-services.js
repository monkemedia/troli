import { trolifyClient } from '~/utils/axiosInstance'

export default ({ store }, inject) => {
  trolifyClient.interceptors.request.use((config) => {
    const token = store.state.auth.token
    config.headers.Authorization = `Bearer ${token}`
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  // trolifyClient.interceptors.response.use((response) => {
  //   return response
  // }, async (error) => {
  //   if (error.response.status === 401 && error.response.data.message === 'Token has expired') {
  //     try {
  //       await store.dispatch('auth/refreshToken')
  //       const token = store.state.auth.token
  //       error.config.headers.Authorization = `Bearer ${token}`
  //       return trolifyClient.request(error.config)
  //     } catch (err) {
  //       store.dispatch('auth/logout', 'token_expired')
  //       return Promise.reject(err)
  //     }
  //   }
  //   return Promise.reject(error)
  // })

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
