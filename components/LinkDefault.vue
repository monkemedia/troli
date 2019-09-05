<template>
  <nuxt-link
    :to="to"
    class="button"
    :class="{ 'button--flip' : isFlip }">
    <span :data-text="text">
      {{ text }}
    </span>
  </nuxt-link>
</template>

<script>
  export default {
    name: 'LinkDefault',

    props: {
      text: {
        type: String,
        required: true
      },

      classes: {
        type: String,
        required: false,
        default: ''
      },

      isFlip: {
        type: Boolean,
        required: false,
        default: false
      },

      to: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
 @import '~sass-rem';

  .button {
    line-height: rem(51px);
  }
</style>
