<template>
  <div class="notification  is-danger is-flex">
    <span class="icon is-large">
      <i class="fas fa-2x fa-exclamation-circle" />
    </span>
    <ul>
      <li
        v-for="(error, index) in errors"
        :key="index">
        {{ error.message }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ErrorMessage',

    props: {
      errors: {
        type: Array,
        required: true
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
