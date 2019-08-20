const state = () => ({
  locales: [
    {
      code: 'en',
      iso: 'en-GB',
      name: 'English'
    },
    {
      code: 'nl',
      iso: 'nl-NL',
      name: 'Netherlands'
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
  state,
  mutations,
  getters
}
