<template>
  <div class="icon-group is-flex">
    <my-account />
    <nuxt-link
      v-for="icon in icons"
      :key="icon.name"
      class="navbar-item"
      :class="{ 'is-cart' : icon.meta === 'is-cart' }"
      :aria-label="icon.name"
      :to="icon.path"
      data-qa="icon">
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
</template>

<script>
  import MyAccount from '~/components/MyAccount'

  export default {
    name: 'IconMenu',

    components: {
      MyAccount
    },

    data () {
      return {
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
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~sass-rem';
  @import '~sass-mq';
  @import '~assets/scss/utilities/variables';

  .icon-group {
    .fa {
      font-size: rem(22px);
    }

    .navbar-item {
      height: 100%;
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
