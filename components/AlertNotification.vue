<template>
  <div
    role="alert"
    class="notification is-flex"
    :aria-invalid="notificationType === 'error'"
    :class="{
      'is-danger' : notificationType === 'error',
      'is-success' : notificationType === 'success'}">
    <span class="icon">
      <i
        v-if="notificationType === 'error'"
        class="fas fa-exclamation" />
      <i
        v-else
        class="fas fa-check" />
    </span>
    <ul v-if="accountNotConfirmed">
      <!-- eslint-disable vue/no-v-html -->
      <li v-html="accountNotConfirmedMessage" />
      <!-- eslint-enable vue/no-v-html -->
    </ul>
    <ul v-else>
      <li
        v-for="(a, index) in alert"
        :key="index">
        {{ a.detail }}
      </li>
    </ul>
  </div>
</template>

<script>
  import _template from 'lodash.template'

  export default {
    name: 'AlertNotification',

    props: {
      alert: {
        type: Array,
        required: true
      }
    },

    computed: {
      notificationType () {
        if (this.alert[0].status === 200) {
          return 'success'
        }
        return 'error'
      },

      accountNotConfirmed () {
        if (this.alert[0].detail === 'Account not confirmed.') {
          return true
        }
        return false
      },

      getLocale () {
        return this.$i18n.locale === 'en' ? '/' : `/${this.$i18n.locale}/`
      },

      accountNotConfirmedMessage () {
        const compiled = _template(this.$t('alert_notification.confirm_email'))
        return compiled({ clickhere: `<a href="${this.getLocale}confirm-account" class="is-link">${this.$t('alert_notification.click_here')}</a>` })
      }
    }
  }
</script>

<style lang="scss" scoped>
   @import '~sass-rem';

  .notification {
    font-size: rem(14px);
    align-items: center;
    display: flex;

    .icon {
      margin-right: rem(8px);
    }
  }
</style>
