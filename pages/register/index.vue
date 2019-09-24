<template>
  <div
    id="registerPage"
    data-qa="register page">
    <div class="banner" />

    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5">
            <h1 class="title">
              {{ $t('pages.register.title') }}
            </h1>
            <hr class="mb-0">
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column is-5">
            <register-form data-qa="register form" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import RegisterForm from '~/components/RegisterForm'

  export default {
    name: 'Register',

    components: {
      RegisterForm
    }
  }
</script>
