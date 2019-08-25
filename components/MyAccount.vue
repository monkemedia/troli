<template>
  <div
    id="myAccountDropdown"
    :class="{ 'is-active' : isActive }"
    data-qa="my account dropdown"
    @mouseover="isActive = true"
    @mouseleave="isActive = false">
    <button class="navbar-item my-account-button">
      <span class="icon">
        <i class="fa fa-user" />
      </span>
    </button>
    <div id="myaccount-dropdown">
      <div class="dropdown">
        <header
          v-if="isAuthenticated"
          class="dropdown__header"
          data-qa="my account dropdown authenticated header">
          <span>{{ $t('my_account_dropdown.hi') }} {{ customerDetails.name }}</span>
          <a
            href=""
            class="sign-out"
            @click.prevent="signOutHandler">
            {{ $t('my_account_dropdown.sign_out') }}
          </a>
        </header>
        <header
          v-else
          class="dropdown__header"
          data-qa="my account dropdown deauthenticated header">
          <span>
            <nuxt-link to="/login">
              {{ $t('my_account_dropdown.sign_in') }}
            </nuxt-link>
            <span class="divider">|</span>
            <nuxt-link to="/register">
              {{ $t('my_account_dropdown.register') }}
            </nuxt-link>
          </span>
        </header>
        <ul class="dropdown__list">
          <li>
            <nuxt-link
              v-for="(item, index) in items"
              :key="index"
              :to="item.path">
              <span class="icon">
                <i :class="item.classes" />
              </span>
              <span class="dropdown__list__name">
                {{ item.name }}
              </span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'MyAccount',

    data () {
      return {
        isActive: false,
        items: [
          {
            name: this.$t('my_account_dropdown.links.my_account'),
            path: '/',
            classes: 'fas fa-user'
          },
          {
            name: this.$t('my_account_dropdown.links.my_orders'),
            path: '/',
            classes: 'fas fa-clipboard-list'
          }
        ]
      }
    },

    computed: {
      ...mapGetters({
        customerDetails: 'customer/getDetails',
        isAuthenticated: 'customer/isAuthenticated'
      })
    },

    methods: {
      signOutHandler () {
        this.$store.dispatch('auth/signOut')
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
        z-index: 1;
      }
    }
  }

  #myaccount-dropdown {
    margin-bottom: 10px;
    overflow: hidden;
    position: absolute;
    left: rem(-50px);
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

      a {
        &:hover {
          color: $primary;
        }
      }

      .divider {
        margin: 0 rem(10px);
      }
    }

    &__list {
      padding: 0 rem(15px);

      li {
        a {
          padding: rem(15px);
          width: 100%;
          display: flex;
          color: $grey;
          font-size: rem(15px);
          cursor: pointer;
          align-items: center;
          border-bottom: 1px solid $grey-light;

          &:hover {
            color: $primary;
          }

          .icon {
            margin-right: rem(10px);
          }

          .dropdown__list__name {
            line-height: 1;
          }
        }
      }
    }
  }
</style>
