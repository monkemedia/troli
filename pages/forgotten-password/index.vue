<template>
  <div
    id="forgottenPasswordPage"
    data-qa="forgotten password page">
    <div class="banner" />

    <section id="forgottenPassword" class="section">
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
            <forgotten-password-form data-qa="forgotten password form" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import ForgottenPasswordForm from '~/components/ForgottenPasswordForm'

  export default {
    name: 'ForgottenPassword',

    components: {
      ForgottenPasswordForm
    }
  }
</script>

<style lang="scss" scoped>
  @import '~sass-rem';
  @import '~sass-mq';
  @import '~assets/scss/utilities/variables';

</style>
