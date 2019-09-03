<template>
  <header>
    <topbar data-qa="topbar navigation" />
    <nav
      class="navbar has-shadow"
      role="navigation"
      aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <nuxt-link
            :to="localePath('home')"
            class="navbar-item logo"
            data-qa="logo">
            <img src="~assets/images/logo.png" alt="">
          </nuxt-link>

          <burger-button
            data-qa="mobile burger button"
            @toggle="toggleMobileMenuHandler" />
        </div>

        <div
          :class="{ 'is-active' : toggleMobileMenu }"
          class="navbar-menu">
          <div class="navbar-end">
            <div
              class="group-links is-flex"
              data-qa="main navigation">
              <nuxt-link
                class="navbar-item"
                :to="localePath('home')">
                {{ $t('navigation.home') }}
              </nuxt-link>

              <nuxt-link
                class="navbar-item"
                :to="localePath('pages')">
                {{ $t('navigation.pages') }}
              </nuxt-link>

              <nuxt-link
                class="navbar-item"
                :to="localePath('shop')">
                {{ $t('navigation.shop') }}
              </nuxt-link>
            </div>

            <icon-menu data-qa="icon menu" />
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import Topbar from '~/components/Topbar'
  import BurgerButton from '~/components/BurgerButton'
  import IconMenu from '~/components/IconMenu'

  export default {
    name: 'Navbar',

    components: {
      Topbar,
      BurgerButton,
      IconMenu
    },

    data () {
      return {
        toggleMobileMenu: false
      }
    },

    methods: {
      toggleMobileMenuHandler (toggle) {
        this.toggleMobileMenu = toggle
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~sass-rem';
  @import '~sass-mq';
  @import '~assets/scss/utilities/variables';

  .navbar-brand {
    .navbar-item {
      img {
        height: rem(40px);
      }

      @include mq($from: $desktop) {
        padding: 0;
        margin: 0;

        img {
          width: rem(50px);
          height: rem(50px);
          max-height: 100%;

        }
      }
    }
  }

  .group-links {
    @include mq($from: $desktop) {
      padding-top: rem(3px);
    }
  }
</style>
