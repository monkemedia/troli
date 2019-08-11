<template>
  <div id="login">
    <div class="banner" />

    <section id="register" class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-6">
            <form @submit.prevent="login">
              <div class="field">
                <label class="label">Username or email address <sup>*</sup></label>
                <div class="control">
                  <input
                    v-model="form.email"
                    class="input"
                    type="text">
                </div>
              </div>
              <div class="field">
                <label class="label">Password <sup>*</sup></label>
                <div class="control">
                  <input
                    v-model="form.password"
                    class="input"
                    type="password">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button
                    :class="{ 'is-loading' : isLoading }"
                    class="button is-large is-black"
                    type="submit">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      isLoading: false
    }
  },

  methods: {
    async login () {
      this.isLoading = true

      try {
        await this.$store.dispatch('auth/login', this.form)
        this.isLoading = false
      } catch (err) {
        console.log(err)
        this.isLoading = false
      }
    }
  }
}
</script>

<style>

</style>
