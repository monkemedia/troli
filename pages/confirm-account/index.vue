<template>
  <div
    id="resendConfirmLinkPage"
    data-qa="resend confirmation link page">
    <div class="banner" />

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="title">
              {{ $t('pages.confirm_account.title') }}
            </h1>
            <hr class="mb-0">
          </div>
        </div>
        <div class="columns is-variable is-8">
          <div class="column is-5">
            <p>
              {{ $t('pages.confirm_account.paragraph') }}
            </p>
            <send-confirmation-link-form data-qa="confirmation link form" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import SendConfirmationLinkForm from '~/components/SendConfirmationLinkForm'

  export default {
    name: 'ForgottenPassword',

    components: {
      SendConfirmationLinkForm
    }
  }
</script>

<style lang="scss" scoped>
  @import '~sass-rem';
  @import '~sass-mq';
  @import '~assets/scss/utilities/variables';

</style>
