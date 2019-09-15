<template>
  <div
    id="loginPage"
    data-qa="login page">
    <div class="banner" />

    <notification-bar
      v-if="hasRegistered"
      :notification="hasRegistered" />

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="title">
              {{ $t('pages.login.title') }}
            </h1>
            <hr class="mb-0">
          </div>
        </div>
        <div class="columns is-variable is-8">
          <div class="column is-5">
            <login-form data-qa="login form" />
          </div>
          <div class="column is-5">
            <div class="create-account">
              <hr class="account-hr">
              <h2 class="subtitle">
                {{ $t('pages.login.new_customer.title') }}
              </h2>
              <p>
                {{ $t('pages.login.new_customer.paragraph') }}
              </p>
              <link-default
                to="register"
                :text="$t('pages.login.new_customer.button')"
                is-flip
                data-qa="create account now button" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import NotificationBar from '~/components/NotificationBar'
  import LoginForm from '~/components/LoginForm'

  export default {
    name: 'Login',

    components: {
      NotificationBar,
      LoginForm
    },

    computed: {
      ...mapGetters({
        status: 'confirmAccount/getStatus',
        message: 'confirmAccount/getMessage'
      }),

      hasRegistered () {
        return this.status ? {
          status: this.status,
          message: this.message
        } : null
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~sass-rem';
  @import '~sass-mq';
  @import '~assets/scss/utilities/variables';

  .account-hr {
    margin: rem(20px) 0 rem(60px);

    @include mq($from: tablet) {
      display: none;
    }
  }

</style>
