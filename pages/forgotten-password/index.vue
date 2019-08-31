<template>
  <div
    id="forgottenPasswordPage"
    data-qa="forgotten password page">
    <div class="banner" />

    <section id="register" class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="title">
              {{ $t('pages.forgotten_password.title') }}
            </h1>
            <hr class="mb-0">
          </div>
        </div>
        <div class="columns is-variable is-8">
          <div class="column is-5">
            <p>
              {{ $t('pages.forgotten_password.paragraph') }}
            </p>
            <form
              data-qa="forgotten password form"
              @submit.prevent="submitEmail">
              <alert-notification
                v-if="alert"
                :alert="alert"
                data-qa="alert notification" />
              <div v-if="!success" class="field">
                <label class="label">{{ $t('pages.forgotten_password.label') }}<sup>*</sup></label>
                <div class="control">
                  <input
                    v-model="form.email"
                    class="input"
                    date-name="username"
                    data-qa="email box"
                    type="text">
                </div>
              </div>
              <div v-if="!success" class="field">
                <div class="control">
                  <button
                    :class="{ 'is-loading' : isLoading }"
                    class="button is-large is-black"
                    type="submit"
                    data-qa="send reset password button">
                    {{ $t('pages.forgotten_password.button') }}
                  </button>
                </div>
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
          email: ''
        },
        isLoading: false,
        alert: null
      }
    },

    computed: {
      success () {
        return this.alert && this.alert[0].status === 200
      }
    },

    methods: {
      async submitEmail () {
        let response
        this.isLoading = true

        try {
          response = await axios.post('/api/v1/forgotten-password', this.form)
          this.isLoading = false
          this.alert = [
            {
              status: 200,
              detail: this.$t('pages.forgotten_password.success_message')
            }
          ]
          return response
        } catch (err) {
          this.alert = err.response.data
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
