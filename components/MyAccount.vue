<template>
  <div
    id="myAccountDropdown"
    :class="{ 'is-active' : isActive }"
    @mouseover="isActive = true"
    @mouseleave="isActive = false">
    <button class="navbar-item my-account-button">
      <span class="icon">
        <i class="fa fa-user" />
      </span>
    </button>
    <div id="myaccount-dropdown">
      <div class="dropdown">
        <header class="dropdown__header">
          <span>Hi {{ customerDetails.name }}</span>
          <a href="" class="sign-out">Sign out</a>
        </header>
        <ul>
          <li>test</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyAccount',

  data () {
    return {
      isActive: true
    }
  },

  computed: {
    customerDetails () {
      return this.$store.getters['auth/getDetails']
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~assets/scss/utilities/variables';
  @import '~sass-rem';

  #myAccountDropdown {
    position: relative;

    &.is-active {
      .dropdown {
        transform: translateY(0);
      }

      .my-account-button {
        &:after {
          opacity: 1;
        }
      }
    }

    .my-account-button {
      background: transparent;
      border: 0;
      position: relative;

      &:after {
        content: '';
        width: 0;
        border-right: 15px solid transparent;
        border-left: 15px solid transparent;
        border-bottom: 11px solid $grey-light;
        position: absolute;
        bottom: 0;
        left: rem(4px);
        opacity: 0;
        transition: opacity .6s;
        transition-delay: .25s;
        z-index: 1;
      }
    }
  }

  #myaccount-dropdown {
    left: 0;
    margin-bottom: 10px;
    overflow: hidden;
    position: absolute;
    right: 0;
    width: 325px;
  }

  .dropdown {
    min-height: 255px;
    max-height: calc(100vh - 200px);
    background: $white;
    width: 100%;
    transform: translateY(calc(-100% - 5px));
    transition: transform .6s;
    flex-direction: column;

    &__header {
      display: flex;
      justify-content: space-between;
      padding: rem(15px);
      width: 100%;
      background: $grey-light;
      align-items: center;

      .sign-out {
        font-weight: 400;
        color: $grey;
        text-decoration: underline;
        cursor: pointer;
        font-size: rem(12px);
      }
    }
  }
</style>
