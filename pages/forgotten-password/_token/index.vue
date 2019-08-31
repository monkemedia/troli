<template>
  <div id="login">
    <div class="banner" />

    <section id="register" class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="title">
              {{ $t('pages.reset_password.title') }}
            </h1>
            <hr class="mb-0">
          </div>
        </div>
        <div class="columns is-variable is-8">
          <div class="column is-5">
            <form @submit.prevent="submitPassword">
              <alert-notification
                v-if="alert"
                :alert="alert"
                data-qa="alert notification" />
              <div v-if="!success" class="field">
                <label class="label">{{ $t('pages.reset_password.password') }}<sup>*</sup></label>
                <div class="control">
                  <input
                    v-model="form.password"
                    class="input"
                    type="password"
                    data-qa="password box">
                </div>
              </div>
              <div v-if="!success" class="field">
                <label class="label">{{ $t('pages.reset_password.confirm_password') }}<sup>*</sup></label>
                <div class="control">
                  <input
                    v-model="form.confirm_password"
                    class="input"
                    type="password"
                    data-qa="confirm password box">
                </div>
              </div>
              <div v-if="!success" class="field">
                <div class="control">
                  <button
                    :class="{ 'is-loading' : isLoading }"
                    class="button is-large is-black"
                    date-name="login-button"
                    type="submit"
                    data-qa="reset password button">
                    {{ $t('pages.reset_password.button') }}
                  </button>
                </div>
              </div>

              <div
                v-if="success"
                data-qa="success message">
                <h2 class="subtitle">
                  {{ $t('pages.reset_password.success.title') }}
                </h2>
                <p>{{ $t('pages.reset_password.success.paragraph') }}</p>
                <nuxt-link to="/login" class="button is-black is-large">
                  {{ $t('pages.reset_password.success.button') }}
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
  import axios from 'axios'
  import AlertNotification from '~/components/AlertNotification'

  export default {
    name: 'ForgottenPassword',

    components: {
      AlertNotification
    },

    data () {
      return {
        form: {
          password: null,
          confirm_password: null
        },
        isLoading: false,
        success: false,
        alert: null,
        token: null
      }
    },

    mounted () {
      this.token = this.$route.params.token
    },

    methods: {
      async submitPassword () {
        let response

        this.isLoading = true

        try {
          response = await axios.post('/api/v1/forgotten-password/update-password', {
            ...this.form,
            token: this.token
          })
          this.isLoading = false
          this.success = true
          return response
        } catch (err) {
          this.alert = err.response.data
          this.isLoading = false
          return err
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
