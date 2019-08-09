<template>
  <nav
    class="navbar has-shadow is-spaced"
    role="navigation"
    aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link
          to="/"
          class="navbar-item logo">
          <img src="~assets/images/logo.png" alt="">
        </nuxt-link>

        <a
          role="button"
          class="navbar-burger burger"
          :class="{ 'is-active' : toggleMobileMenu }"
          aria-label="menu"
          :aria-expanded="toggleMobileMenu ? 'true' : 'false'"
          @click="toggleMobileMenu = !toggleMobileMenu">
          <span
            v-for="span in 3"
            :key="span"
            aria-hidden="false" />
        </a>
      </div>

      <div
        :class="{ 'is-active' : toggleMobileMenu }"
        class="navbar-menu">
        <div class="navbar-end">
          <div class="group-links is-flex">
            <nuxt-link
              v-for="nav in navigation"
              :key="nav.name"
              class="navbar-item"
              :to="nav.path">
              {{ nav.name }}
            </nuxt-link>
          </div>

          <div class="icon-group is-flex">
            <nuxt-link
              v-for="icon in icons"
              :key="icon.name"
              class="navbar-item"
              :class="{ 'is-cart' : icon.meta === 'is-cart' }"
              :aria-label="icon.name"
              :to="icon.path">
              <span
                class="icon"
                :class="{ 'is-bag' : icon.meta === 'is-cart' }">
                <i
                  :class="icon.class"
                  class="fa" />

                <span
                  v-if="icon.meta === 'is-cart'"
                  class="cart-quantity">
                  0
                </span>
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',

  data () {
    return {
      navigation: [
        {
          name: 'Home',
          path: '/'
        },
        {
          name: 'Pages',
          path: '/pages'
        },
        {
          name: 'Shop',
          path: '/shop'
        }
      ],
      icons: [
        {
          name: 'Wishlist',
          path: '/wishlist',
          class: 'fa-heart',
          meta: null
        },
        {
          name: 'Cart',
          path: '/cart',
          class: 'fa-shopping-bag',
          meta: 'is-cart'
        },
        {
          name: 'Search',
          path: '/search',
          class: 'fa-search'
        }
      ],
      toggleMobileMenu: false
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
          width: rem(80px);
          height: rem(80px);
          max-height: 100%;

        }
      }
    }
  }

  .icon-group {
    .fa {
      font-size: rem(18px);
    }

    .is-bag {
      position: relative;
    }

    .cart-quantity {
      border-radius: 50%;
      background: $primary;
      width: rem(15px);
      height: rem(15px);
      color: $white;
      font-size: rem(11px);
      font-family: $family-secondary;
      display: flex;
      justify-content: center;
      position: absolute;
      right: rem(-2px);
      bottom: rem(-2px);
    }
  }
</style>
