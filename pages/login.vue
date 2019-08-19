<template>
  <div id="login">
    <div class="banner" />

    <section id="register" class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="title">
              {{ $t('pages.login.title') }}
            </h1>
            <hr>
          </div>
        </div>
        <div class="columns is-variable is-8">
          <div class="column is-5">
            <form @submit.prevent="login">
              <h2 class="subtitle">
                {{ $t('pages.login.returning_customer.title') }}
              </h2>
              <p>{{ $t('pages.login.returning_customer.paragraph') }}</p>
              <div class="field">
                <label class="label">{{ $t('pages.login.returning_customer.label') }}<sup>*</sup></label>
                <div class="control">
                  <input
                    v-model="form.email"
                    class="input"
                    type="text">
                </div>
              </div>
              <div class="field">
                <label class="label">{{ $t('pages.login.returning_customer.password') }}<sup>*</sup></label>
                <div class="control">
                  <input
                    v-model="form.password"
                    class="input"
                    type="password">
                </div>
              </div>
              <div class="field">
                <div class="control buttons">
                  <button
                    :class="{ 'is-loading' : isLoading }"
                    class="button is-large is-black login-button"
                    type="submit">
                    {{ $t('pages.login.returning_customer.button') }}
                  </button>
                  <div class="forgotten-password">
                    <nuxt-link
                      to="/forgoteen-password"
                      class="is-link">
                      Forgotten password?
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </form>
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
              <nuxt-link to="/register" class="button is-large is-black">
                {{ $t('pages.login.new_customer.button') }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      isLoading: false
    }
  },

  methods: {
    async login () {
      this.isLoading = true

      try {
        await this.$store.dispatch('auth/login', this.form)
        this.isLoading = false
      } catch (err) {
        console.log(err)
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~sass-rem';
  @import '~sass-mq';
  @import '~assets/scss/utilities/variables';

  .login-button {
    margin-bottom: 0;
  }

  .forgotten-password {
    justify-content: center;
    padding: rem(20px);
    display: flex;
    width: 100%;

    @include mq($from: tablet) {
      width: auto;
    }

    a {
      font-size: rem(14px);
    }
  }

  .account-hr {
    margin: rem(20px) 0 rem(60px);

    @include mq($from: tablet) {
      display: none;
    }
  }

</style>
