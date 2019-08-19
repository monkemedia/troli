<template>
  <div id="login">
    <div class="banner" />

    <section id="register" class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="title">
              Reset password
            </h1>
            <hr>
          </div>
        </div>
        <div class="columns is-variable is-8">
          <div class="column is-5">
            <form @submit.prevent="submitPassword">
              <div v-if="!success" class="field">
                <label class="label">Password <sup>*</sup></label>
                <div class="control">
                  <input
                    v-model="form.password"
                    class="input"
                    type="password">
                </div>
              </div>
              <div v-if="!success" class="field">
                <label class="label">Confirm password <sup>*</sup></label>
                <div class="control">
                  <input
                    v-model="form.confirm_password"
                    class="input"
                    type="password">
                </div>
              </div>
              <div v-if="!success" class="field">
                <div class="control">
                  <button
                    :class="{ 'is-loading' : isLoading }"
                    class="button is-large is-black"
                    date-name="login-button"
                    type="submit">
                    Reset password
                  </button>
                </div>
              </div>

              <div v-if="success">
                <h2 class="subtitle">
                  Success password reset
                </h2>
                <p>You can now use your new password to log in to your account.</p>
                <nuxt-link to="/login" class="button is-black is-large">
                  Go to login page
                </nuxt-link>
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
        password: null,
        confirm_password: null
      },
      isLoading: false,
      success: true
    }
  },

  mounted () {
    console.log('this.$route', this.$route.params.token)
  },

  methods: {
    async submitPassword () {
      const token = this.$route.params.token

      if (!token) {
        alert('A token is required to reset your password.')
        return
      }

      this.isLoading = true

      try {
        await this.$axios.$post('/api/v1/forgotten-password/update-password', {
          ...this.form,
          token
        })
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
