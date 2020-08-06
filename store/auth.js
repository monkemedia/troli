const state = () => ({
  access_token: null,
  token_type: null
})

const mutations = {
  SET_ACCESS_TOKEN (state, data) {
    state.access_token = data
  },

  SET_TOKEN_TYPE (state, data) {
    state.token_type = data
  }
}

const actions = {
  init ({ commit }) {
    const accessToken = this.$cookies.get('access_token')
    const tokenType = this.$cookies.get('token_type')

    commit('SET_ACCESS_TOKEN', accessToken)
    commit('SET_TOKEN_TYPE', tokenType)
  },

  setOAuth ({ commit }, data) {
    commit('SET_ACCESS_TOKEN', data.token_type)
    commit('SET_TOKEN_TYPE', data.token_type)

    this.$cookies.set('access_token', data.access_token)
    this.$cookies.set('token_type', data.token_type)

    if (process.client) {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('token_type', data.token_type)
    }
  },

  async authenticate ({ dispatch }, data) {
    const fetchAccessToken = await this.$authenticate({
      client_id: process.env.CLIENT_ID,
      grant_type: 'implicit'
    })

    dispatch('setOAuth', {
      access_token: fetchAccessToken.data.access_token,
      token_type: fetchAccessToken.data.token_type
    })
  }
}

export default {
  state,
  mutations,
  actions
}
