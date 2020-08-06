const state = () => ({
  items: []
})

const mutations = {
  SET_ITEMS (state, data) {
    state.status = data
  },

  CLEAR_ITEMS (state) {
    state.items = []
  }
}

const actions = {
  async getProducts ({ commit }, categoryId) {
    const products = await this.$getProductsByCategory(categoryId)

    commit('SET_ITEMS', products.data)

    return products
  }
}

export default {
  state,
  mutations,
  actions
}
