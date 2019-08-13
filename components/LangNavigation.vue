<template>
  <div>
    <button
      v-for="loc in locales"
      :key="loc.code"
      @click="switchLanguage(loc.code)">
      {{ loc.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'LangNavigation',

  computed: {
    locales () {
      return this.$store.getters['locales/getLocales']
    },

    locale () {
      return this.$store.getters['locales/getLocale']
    }
  },

  methods: {
    switchLanguage (localeCode) {
      document.cookie = `locale=${localeCode}`
      location.reload()
    }
  }
}
</script>
