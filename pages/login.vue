<template>
  <div id="login">
    <div class="banner" />

    <section id="register" class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="title">
              My account login
            </h1>
            <hr>
          </div>
        </div>
        <div class="columns is-variable is-8">
          <div class="column is-5">
            <form @submit.prevent="login">
              <h2 class="subtitle">
                Returning customer
              </h2>
              <p>If you are a registered user, please enter your email and password.</p>
              <div class="field">
                <label class="label">Username or email address <sup>*</sup></label>
                <div class="control">
                  <input
                    v-model="form.email"
                    class="input"
                    date-name="username"
                    type="text">
                </div>
              </div>
              <div class="field">
                <label class="label">Password <sup>*</sup></label>
                <div class="control">
                  <input
                    v-model="form.password"
                    class="input"
                    date-name="password"
                    type="password">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button
                    :class="{ 'is-loading' : isLoading }"
                    class="button is-large is-black"
                    date-name="login-button"
                    type="submit">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="column is-5">
            <div class="create-account">
              <h2 class="subtitle">
                New customers
              </h2>
              <p>
                Don’t have an account? Let’s create one now.
              </p>
              <button class="button is-large is-black">
                Create account now
              </button>
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

</style>
