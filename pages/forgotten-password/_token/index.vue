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
            <submit-password-form data-qa="submit password form" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import SubmitPasswordForm from '~/components/SubmitPasswordForm'

  export default {
    name: 'ForgottenPassword',

    components: {
      SubmitPasswordForm
    }
  }
</script>

<style lang="scss" scoped>
  @import '~sass-rem';
  @import '~sass-mq';
  @import '~assets/scss/utilities/variables';

</style>
