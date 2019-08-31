<template>
  <div
    role="alert"
    class="notification is-flex"
    :class="{
      'is-danger' : notificationType === 'error',
      'is-success' : notificationType === 'success'}">
    <span class="icon is-large">
      <i class="fas fa-2x fa-exclamation-circle" />
    </span>
    <ul>
      <li
        v-for="(a, index) in alert"
        :key="index">
        {{ a.detail }}
      </li>
    </ul>
  </div>
</template>

<script>
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
