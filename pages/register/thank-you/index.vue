<template>
  <div
    id="registrationThankYouPage"
    data-qa="registration thank you page">
    <div class="banner" />

    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5">
            <h1 class="title">
              {{ $t('pages.registration_thank_you.title') }}
            </h1>
            <hr class="mb-0">
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-5">
            <div class="notification is-success">
              <span class="icon">
                <i class="fas fa-check" />
              </span>
              <!-- eslint-disable vue/no-v-html -->
              <p v-html="message" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import _template from 'lodash.template'
  export default {
    name: 'RegistrationThankYou',

    computed: {
      message () {
        const compiled = _template(this.$t('pages.registration_thank_you.message'))
        return compiled({ clickhere: `<a href="/confirm-account" class="is-link">${this.$t('pages.registration_thank_you.click_here')}</a>` })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~sass-rem';

  .notification  {
    display: flex;

    .icon {
      margin-right: rem(8px);
    }
  }
</style>
