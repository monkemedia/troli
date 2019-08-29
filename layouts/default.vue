<template>
  <div id="app">
    <navbar />
    <nuxt />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Navbar from '~/components/Navbar.vue'

  export default {
    components: {
      Navbar
    },

    head () {
      return {
        htmlAttrs: {
          lang: this.locale
        }
      }
    },

    computed: {
      ...mapGetters({
        locale: 'locales/getLocale'
      })
    }
  }
</script>
