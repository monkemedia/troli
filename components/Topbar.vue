<template>
  <div id="topbar">
    <div class="dropdown is-active">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <figure class="flag">
            <img :src="getFlag">
          </figure>
        </button>
      </div>
      <div
        id="dropdown-menu"
        class="dropdown-menu"
        role="menu">
        <div class="dropdown-content">
          <a
            v-for="loc in locales"
            :key="loc.code"
            href="#"
            class="dropdown-item contains-flag">
            {{ loc.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Topbar',

  computed: {
    locale () {
      return this.$store.getters['locales/getLocale']
    },

    locales () {
      return this.$store.getters['locales/getLocales']
    },

    selectedLocale () {
      return this.locales.filter((obj) => {
        return obj.code === this.locale
      })[0]
    },

    getFlag () {
      return `flags/${this.selectedLocale.code}.svg`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~sass-rem';
  @import '~assets/scss/utilities/variables';

  #topbar {
    background: $white;
  }

  .flag {
    width: rem(17px);
    height: rem(17px);
    overflow: hidden;
    border-radius: 50%;
  }

  .dropdown {
    z-index: 40;
  }
</style>
