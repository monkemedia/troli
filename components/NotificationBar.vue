<template>
  <div
    class="notification"
    :class="{
      'is-danger' : isError,
      'is-success' : isSuccess
    }">
    <div class="container">
      <p>
        <span class="icon">
          <i
            v-if="notification.status === 'success'"
            class="fas fa-check" />
          <i
            v-else
            class="fas fa-exclamation" />
        </span>
        {{ notification.message }}
        <span v-if="isError && notification.message === 'Token has expired.'">
          {{ message }} {{ confirmLinkMessage }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
  import _template from 'lodash.template'

  export default {
    name: 'Notification',

    props: {
      notification: {
        type: Object,
        required: true
      }
    },

    computed: {
      isSuccess () {
        return this.notification.status === 'success'
      },

      isError () {
        return this.notification.status === 'error'
      },

      confirmLinkMessage () {
        const compiled = _template(this.$t('notification_bar.confirmation_link'))
        return compiled({ clickhere: `<a href="/confirm-account" class="is-link">${this.$t('notification_bar.click_here')}</a>` })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~sass-rem';
  @import '~assets/scss/utilities/variables';

  .notification {
    font-size: rem(13px) !important;
    padding-top: rem(12px);
    padding-bottom: rem(12px);

    p {
      margin-bottom: 0;
    }
  }
</style>
