
export const actions = {
  async nuxtServerInit ({ dispatch }, context) {
    await dispatch('customer/initCustomerToken', context.req)
    await dispatch('customer/initCustomerDetails', context.req)
  }
}
