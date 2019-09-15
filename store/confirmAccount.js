const state = () => ({
  status: null,
  message: null
})

const mutations = {
  SET_STATUS (state, data) {
    state.status = data
  },

  SET_MESSAGE (state, data) {
    state.message = data
  }
}

const getters = {
  getStatus (state) {
    return state.status
  },

  getMessage (state) {
    return state.message
  }
}

export default {
  state,
  getters,
  mutations
}
