<template>
  <div
    role="alert"
    class="notification is-flex"
    :class="{ 'is-danger' : notificationType === 'error' }">
    <span class="icon is-large">
      <i class="fas fa-2x fa-exclamation-circle" />
    </span>
    <ul>
      <li
        v-for="(alert, index) in alerts"
        :key="index">
        {{ alert.message }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'AlertNotification',

    props: {
      alerts: {
        type: Array,
        required: true
      }
    },

    computed: {
      notificationType () {
        if (this.alerts[0].status === 200) {
          return 'success'
        }
        return 'error'
      }
    }
  }
</script>

<style lang="scss" scoped>
   @import '~sass-rem';

  .notification {
    font-size: rem(14px);
    align-items: center;
  }
</style>
