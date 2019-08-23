<template>
  <button
    role="button"
    class="navbar-burger burger"
    :class="{ 'is-active' : toggleMobileMenu }"
    aria-label="menu"
    :aria-expanded="toggleMobileMenu ? 'true' : 'false'"
    data-qa="button"
    @click="toggle()">
    <span
      v-for="span in 3"
      :key="span"
      aria-hidden="false" />
  </button>
</template>

<script>
  export default {
    name: 'BurgerButton',

    data () {
      return {
        toggleMobileMenu: false
      }
    },

    methods: {
      toggle () {
        if (this.toggleMobileMenu) {
          this.toggleMobileMenu = false
          this.$emit('toggle', this.toggleMobileMenu = false)
        } else {
          this.toggleMobileMenu = true
          this.$emit('toggle', this.toggleMobileMenu = true)
        }
      }
    }
  }
</script>
