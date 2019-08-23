<template>
  <div
    class="dropdown is-right"
    :class="{ 'is-active': isActive }"
    @mouseover="isActive = true"
    @mouseleave="isActive = false">
    <div class="dropdown-trigger">
      <button
        class="button button--flag"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        :class="{ 'is-active': isActive }">
        <figure class="flag">
          <img :src="getFlag">
        </figure>
        {{ locale }}
      </button>
    </div>
    <div
      id="dropdown-menu"
      class="dropdown-menu"
      role="menu">
      <div class="dropdown-content">
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="dropdown-item contains-flag"
          @click="switchLanguage(loc.code)">
          {{ loc.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'LangSelector',

    data () {
      return {
        isActive: false
      }
    },

    computed: {
      ...mapGetters({
        locale: 'locales/getLocale',
        locales: 'locales/getLocales'
      }),

      availableLocales () {
        return this.locales.filter((loc) => {
          return loc.code !== this.locale
        })
      },

      selectedLocale () {
        return this.locales.filter((obj) => {
          return obj.code === this.locale
        })[0]
      },

      getFlag () {
        return `/flags/${this.selectedLocale.code}.svg`
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

<style lang="scss" scoped>
  @import '~sass-rem';
  @import '~assets/scss/utilities/variables';

  .button--flag {
    background: transparent;
    font-size: rem(12px);
    color: $grey-dark;
    padding-right: rem(15px);

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      right: 0;
      width: 10px;
      height: 5px;
      transform: translateY(-50%);
      background: url('~assets/images/icons/carat-down-icon.svg')
    }

    &.is-active {
      &:after {
        transform: rotate(180deg);
        margin-top: rem(-3px);
      }
    }
  }

  .flag {
    width: rem(15px);
    height: rem(11px);
    margin-right: rem(5px);

    img {
      vertical-align: top;
    }
  }

  .dropdown {
    z-index: 40;
  }

  .dropdown-content {
    border-radius: 0;
  }

  .dropdown-item {
    background: transparent;
    border: 0;
    box-shadow: none;
    cursor: pointer;
  }
</style>
