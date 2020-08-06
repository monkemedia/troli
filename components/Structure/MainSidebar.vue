<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <nuxt-link
        :to="{ name: 'index' }"
        class="navbar-item">
        <img src="/trolify-logo.png" alt="Trolify">
      </nuxt-link>
    </div>
    <div class="sidebar-menu menu">
      <p class="sidebar-menu-label menu-label">
        General
      </p>
      <ul class="sidebar-menu-list menu-list">
        <li>
          <nuxt-link to="/products">
            Products
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/categories">
            Categories
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/customers">
            Customers
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/orders">
            Orders
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/coupons">
            Coupon Codes
          </nuxt-link>
        </li>
      </ul>
      <p class="sidebar-menu-label menu-label">
        Store Settings
      </p>
      <ul class="sidebar-menu-list menu-list">
        <li>
          <nuxt-link to="/store/profile">
            Store Profile
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/settings/shipping">
            Shipping
          </nuxt-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
  @import '~sass-rem';
  @import '~assets/scss/utilities/variables';

  $border-color: $grey-200;

  .sidebar {
    background-color: $white;
    box-shadow: 0 0 2rem 0 rgba(136,152,170,.15);
    border-right: 1px solid $black05;
  }

  .sidebar-logo {
    padding: rem(20px) rem(10px);
    display: flex;
    justify-content: center;

    img {
      max-height: 26px;
    }
  }

  .sidebar-menu {
    margin: rem(20px) 0;
    height: calc(100vh - 65px);
    overflow: auto;
  }

  .sidebar-menu-label {
    padding-left: rem(20px);
    padding-right: rem(20px);
  }

  .sidebar-menu-list {
    a {
      margin-left: rem(5px);
      margin-right: rem(5px);
      padding-left: rem(20px);
      padding-right: rem(20px);

      &.nuxt-link-active {
        background: $aliceBlue;
      }
    }
  }
</style>
