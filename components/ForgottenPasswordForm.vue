<template>
  <form
    @submit.prevent="submitEmail">
    <alert-notification
      v-if="alert"
      :alert="alert"
      data-qa="alert notification" />
    <div v-if="!success" class="field">
      <custom-input
        id="email"
        v-model="form.email"
        v-validate="'required|email'"
        :label="$t('pages.forgotten_password.label')"
        is-required
        type="text"
        data-qa="email box"
        :error="errors.first('email')" />
    </div>
    <div v-if="!success" class="field">
      <div class="control">
        <button-default
          :text="$t('pages.forgotten_password.button')"
          :class="{ 'is-loading' : isLoading }"
          is-flip
          data-qa="send reset password button"
          type="submit" />
      </div>
    </div>
  </form>
</template>

<script>
  import Vue from 'vue'
  import VeeValidate, { Validator } from 'vee-validate'
  import axios from 'axios'
  import CustomInput from '~/components/CustomInput'
  import AlertNotification from '~/components/AlertNotification'

  Vue.use(VeeValidate)

  function validatorLocalize (locale, dictionary) {
    Validator.localize(locale, dictionary)
  }

  export default {
    name: 'ForgottenPasswordForm',

    components: {
      CustomInput,
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

    mounted () {
      const dictionary = {
        custom: {
          email: {
            required: this.$t('form_errors.email.required'),
            email: this.$t('form_errors.email.email')
          }
        }
      }

      validatorLocalize(this.$i18n.locale, dictionary)
    },

    methods: {
      async submitEmail () {
        let response
        this.isLoading = true

        const validate = await this.$validator.validateAll()

        if (!validate) {
          this.$scrollTo('.is-danger', 0, { offset: -10 })
          this.isLoading = false
          return
        }

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
