<template>
  <form @submit.prevent="submitPassword">
    <alert-notification
      v-if="alert"
      :alert="alert"
      data-qa="alert notification" />

    <custom-input
      v-if="!success"
      id="password"
      v-model="form.password"
      v-validate="'required'"
      :label="$t('pages.reset_password.password')"
      is-required
      type="password"
      data-qa="password box"
      :error="errors.first('password')" />

    <custom-input
      v-if="!success"
      id="confirm_password"
      v-model="form.confirm_password"
      v-validate="'required'"
      :label="$t('pages.reset_password.confirm_password')"
      is-required
      type="password"
      data-qa="confirm password box"
      :error="errors.first('confirm_password')" />

    <div v-if="!success" class="field">
      <div class="control">
        <button-default
          :text="$t('pages.reset_password.button')"
          :class="{ 'is-loading' : isLoading }"
          is-flip
          data-qa="reset password button"
          type="submit" />
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
</template>

<script>
  import Vue from 'vue'
  import VeeValidate, { Validator } from 'vee-validate'
  import axios from 'axios'
  import AlertNotification from '~/components/AlertNotification'
  import CustomInput from '~/components/CustomInput'

  Vue.use(VeeValidate)

  function validatorLocalize (locale, dictionary) {
    Validator.localize(locale, dictionary)
  }

  export default {
    name: 'ForgottenPasswordForm',

    components: {
      AlertNotification,
      CustomInput
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

      const dictionary = {
        custom: {
          password: {
            required: this.$t('form_errors.password.required')
          },
          confirm_password: {
            required: this.$t('form_errors.confirm_password.required')
          }
        }
      }

      validatorLocalize(this.$i18n.locale, dictionary)
    },

    methods: {
      async submitPassword () {
        let response

        this.isLoading = true

        const validate = await this.$validator.validateAll()

        if (!validate) {
          this.$scrollTo('.is-danger', 0, { offset: -10 })
          this.isLoading = false
          return
        }

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
