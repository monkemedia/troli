<template>
  <form
    data-qa="register form"
    role="form"
    aria-label="register form"
    @submit.prevent="registerCustomer">
    <alert-notification
      v-if="alert"
      :alert="alert"
      data-qa="alert notification" />

    <p>
      {{ $t('pages.register.paragraph') }}
    </p>

    <custom-input
      id="first_name"
      v-model="form.first_name"
      v-validate="'required'"
      :label="$t('pages.register.first_name')"
      is-required
      type="text"
      data-qa="first name box"
      :error="errors.first('first_name')" />

    <custom-input
      id="last_name"
      v-model="form.last_name"
      v-validate="'required'"
      :label="$t('pages.register.last_name')"
      is-required
      type="text"
      data-qa="last name box"
      :error="errors.first('last_name')" />

    <custom-input
      id="email"
      v-model="form.email"
      v-validate="'required'"
      :label="$t('pages.register.email')"
      is-required
      type="email"
      data-qa="email box"
      :error="errors.first('email')" />

    <custom-input
      id="password"
      v-model="form.password"
      v-validate="'required|min:8'"
      v-password-strength
      :label="$t('pages.register.password')"
      :help-text="$t('form_help_text.min')"
      is-required
      type="password"
      data-qa="password box"
      :error="errors.first('password')" />

    <custom-input
      id="confirm_password"
      v-model="form.confirm_password"
      v-validate="'required|confirmed:password'"
      :label="$t('pages.register.confirm_password')"
      is-required
      type="password"
      data-qa="confirm password box"
      :error="errors.first('confirm_password')" />

    <div class="field">
      <div class="control">
        <button-default
          :text="$t('pages.register.button')"
          :class="{ 'is-loading' : isLoading }"
          is-flip
          data-qa="reset password button"
          type="submit" />
      </div>
    </div>
  </form>
</template>

<script>
  import Vue from 'vue'
  import VeeValidate, { Validator } from 'vee-validate'
  import { mapActions } from 'vuex'
  import passwordStrength from '~/directives/password-strength.js'
  import CustomInput from '~/components/CustomInput'
  import AlertNotification from '~/components/AlertNotification'

  Vue.use(VeeValidate)

  function validatorLocalize (locale, dictionary) {
    Validator.localize(locale, dictionary)
  }

  export default {
    name: 'RegisterForm',

    components: {
      CustomInput,
      AlertNotification
    },

    directives: {
      passwordStrength
    },

    data () {
      return {
        form: {
          first_name: null,
          last_name: null,
          email: null,
          password: null,
          confirm_password: null
        },
        isLoading: false,
        alert: null
      }
    },

    mounted () {
      const dictionary = {
        custom: {
          first_name: {
            required: this.$t('form_errors.first_name.required')
          },
          last_name: {
            required: this.$t('form_errors.last_name.required')
          },
          password: {
            required: this.$t('form_errors.password.required'),
            min: this.$t('form_errors.password.min')
          },
          confirm_password: {
            required: this.$t('form_errors.confirm_password.required'),
            confirmed: this.$t('form_errors.confirm_password.confirmed')
          }
        }
      }

      validatorLocalize(this.$i18n.locale, dictionary)
    },

    methods: {
      ...mapActions({
        registerForm: 'customer/register'
      }),

      async registerCustomer () {
        // let response

        this.isLoading = true

        const validate = await this.$validator.validateAll()

        if (!validate) {
          this.$scrollTo('.is-danger', 0, { offset: -10 })
          this.isLoading = false
          return
        }

        try {
          await this.registerForm(this.form)
          this.isLoading = false
          this.$router.push(this.localePath({ name: 'home' }))
        } catch (err) {
          this.alert = err.response.data
          this.isLoading = false
          return err
        }
      }
    }
  }
</script>
