<template>
  <form
    data-qa="login form"
    @submit.prevent="login">
    <alert-notification
      v-if="alert"
      :alert="alert"
      data-qa="alert notification" />
    <h2 class="subtitle">
      {{ $t('pages.login.returning_customer.title') }}
    </h2>
    <p>{{ $t('pages.login.returning_customer.paragraph') }}</p>
    <div class="field">
      <label class="label">{{ $t('pages.login.returning_customer.label') }}<sup>*</sup></label>
      <div class="control">
        <input
          v-model="form.email"
          v-validate="'required|email'"
          :class="{'is-danger': errors.has('email') }"
          class="input"
          name="email"
          type="text"
          data-qa="email box">
        <p
          v-show="errors.has('email')"
          class="help is-danger">
          {{ errors.first('email') }}
        </p>
      </div>
    </div>
    <div class="field">
      <label class="label">{{ $t('pages.login.returning_customer.password') }}<sup>*</sup></label>
      <div class="control">
        <input
          v-model="form.password"
          v-validate="'required'"
          class="input"
          name="password"
          type="password"
          data-qa="password box">
        <p
          v-show="errors.has('password')"
          class="help is-danger">
          {{ errors.first('password') }}
        </p>
      </div>
    </div>
    <div class="field">
      <div class="control buttons">
        <button
          :class="{ 'is-loading' : isLoading }"
          class="button is-large is-black login-button"
          data-qa="login button"
          type="submit">
          {{ $t('pages.login.returning_customer.button') }}
        </button>
        <div class="forgotten-password">
          <nuxt-link
            :to="localePath('forgotten-password')"
            class="is-link"
            data-qa="forgotten password link">
            {{ $t('pages.login.returning_customer.forgotten_password') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import { mapActions } from 'vuex'
  import AlertNotification from '~/components/AlertNotification'

  Vue.use(VeeValidate)

  // const dictionary = {
  //   custom: {
  //     email: {
  //       required: this.$i18n.t('form_errors.email.required'),
  //       email: this.$i18n.t('form_errors.email.email')
  //     },
  //     password: {
  //       required: this.$i18n.t('form_errors.password.required')
  //     }
  //   }
  // }

  // VeeValidate.setI18nDriver('custom')// ,dictionary

  export default {
    name: 'LoginForm',

    components: {
      AlertNotification
    },

    data () {
      return {
        form: {
          email: '',
          password: ''
        },
        isLoading: false,
        alert: null
      }
    },

    methods: {
      ...mapActions({
        loginForm: 'customer/login'
      }),

      async login () {
        this.isLoading = true

        const validate = await this.$validator.validateAll()

        if (!validate) {
          this.$scrollTo('.is-danger', 0, { offset: -10 })
          this.isLoading = false
          return
        }

        try {
          await this.loginForm(this.form)
          this.isLoading = false
          this.$router.push({ name: 'homepage' })
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
</style>
