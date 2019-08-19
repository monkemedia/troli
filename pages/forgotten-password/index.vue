<template>
  <div id="login">
    <div class="banner" />

    <section id="register" class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="title">
              Forgotten Password
            </h1>
            <hr>
            <p>Enter your email address below and we'll send you a link to reset your password.</p>
          </div>
        </div>
        <div class="columns is-variable is-8">
          <div class="column is-5">
            <form @submit.prevent="submitEmail">
              <div v-if="!success" class="field">
                <label class="label">Email address <sup>*</sup></label>
                <div class="control">
                  <input
                    v-model="form.email"
                    class="input"
                    date-name="username"
                    type="text">
                </div>
              </div>
              <div v-if="!success" class="field">
                <div class="control">
                  <button
                    :class="{ 'is-loading' : isLoading }"
                    class="button is-large is-black"
                    type="submit">
                    send reset password email
                  </button>
                </div>
              </div>

              <div v-if="success" class="notification is-success">
                Please check your email and click on the provided link to reset your password.
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ForgottenPassword',

  data () {
    return {
      form: {
        email: ''
      },
      isLoading: false,
      success: false
    }
  },

  methods: {
    async submitEmail () {
      this.isLoading = true

      try {
        await this.$axios.$post('/api/v1/forgotten-password', this.form)
        this.isLoading = false
        this.success = true
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
