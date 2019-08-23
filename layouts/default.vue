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
    }
  }
</script>
