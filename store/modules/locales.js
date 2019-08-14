const state = () => ({
  locales: [
    {
      code: 'en',
      name: 'EN'
    },
    {
      code: 'nl',
      name: 'NL'
    }
  ],
  locale: 'en'
})

const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.find(el => el.code === locale)) {
      state.locale = locale
    }
  }
}

const getters = {
  getLocales (state) {
    return state.locales
  },

  getLocale (state) {
    return state.locale
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
