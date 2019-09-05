<template>
  <button
    class="button"
    :class="{ 'button--flip' : isFlip }">
    <span :data-text="text">
      {{ text }}
    </span>
  </button>
</template>

<script>
  export default {
    name: 'ButtonDefault',

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
      }
    },

    data () {
      return {}
    }
  }
</script>
