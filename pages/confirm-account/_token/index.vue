<template>
  <div
    id="confirmAccountPage"
    data-qa="confirm account page">
    <div class="pageloader is-active is-secondary" data-qa="confirm account page loader">
      <span class="title">
        {{ $t('pages.confirm_account.loading_title') }}...
      </span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'ConfirmAccount',

    data () {
      return {
        token: null
      }
    },

    mounted () {
      this.token = this.$route.params.token
      this.confirmAccount()
    },

    methods: {
      async confirmAccount () {
        try {
          const response = await axios.post('/api/v1/confirm-account', {
            token: this.token
          })

          this.$store.commit('confirmAccount/SET_STATUS', 'success')
          this.$store.commit('confirmAccount/SET_MESSAGE', this.$t('pages.confirm_account.thank_you'))

          this.$router.push(this.localePath({
            name: 'login'
          }))
          return response
        } catch (err) {
          this.$store.commit('confirmAccount/SET_STATUS', 'error')
          this.$store.commit('confirmAccount/SET_MESSAGE', err.response.data[0].detail)

          this.$router.push(this.localePath({
            name: 'login'
          }))

          return err
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import '~sass-rem';
  @import '~bulma-pageloader';
  @import '~assets/scss/utilities/variables';

  .pageloader {
    background: $black;
  }

  .title {
    font-size: rem(14px) !important;
    text-transform: none;
  }
</style>
