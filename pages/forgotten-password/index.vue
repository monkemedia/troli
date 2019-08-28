<template>
  <div id="login">
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
                v-if="errors"
                :alerts="errors"
                data-qa="alert notification" />
              <div v-if="!success" class="field">
                <label class="label">{{ $t('pages.forgotten_password.label') }}<sup>*</sup></label>
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
                    type="submit"
                    data-qa="forgotten passward button">
                    {{ $t('pages.forgotten_password.button') }}
                  </button>
                </div>
              </div>

              <div
                v-if="success"
                class="notification is-success"
                data-qa="success message">
                {{ $t('pages.forgotten_password.success_message') }}
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
        success: false,
        errors: null
      }
    },

    methods: {
      async submitEmail () {
        this.isLoading = true
        let res

        try {
          res = await axios.post('/api/v1/forgotten-password', this.form)
          this.isLoading = false
          this.success = true
          return res
        } catch (err) {
          this.errors = err.response.data
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
