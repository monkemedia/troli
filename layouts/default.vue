<template>
  <div id="app">
    <navbar />
    <nuxt />
  </div>
</template>

<script>
  import Navbar from '~/components/Navbar.vue'

  export default {
    components: {
      Navbar
    },

    head () {
      return {
        htmlAttrs: {
          lang: this.$i18n.locale,
          'data-qa': 'html'
        }
      }
    }
  }
</script>
