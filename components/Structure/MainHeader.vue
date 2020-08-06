<template>
  <div class="header has-background-primary pb-3">
    <div class="container is-fluid">
      <div class="columns py-3 mt-0 is-vertical-center">
        <div class="column is-8 py-0">
          <h1 class="h1 mb-0 is-inline-block has-text-white">
            <span
              v-if="prefix"
              class="prefix"> {{ prefix }}: </span>
            {{ title }}
          </h1>
        </div>
        <div class="column is-4 py-0">
          <button-default
            v-if="button"
            :text="button.text"
            :to="{ name: button.path }"
            class="is-small is-pulled-right mr-0 is-primary is-inverted"
            is-flip
            data-qa="new button"
            type="button" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ButtonDefault from '@/components/Button/ButtonDefault'

  export default {
    name: 'MainHeader',

    components: {
      ButtonDefault
    },

    props: {
      prefix: {
        type: String,
        default: ''
      },

      title: {
        type: String,
        default: ''
      },

      button: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/scss/utilities/variables';

  .prefix {
    // color: $solitude;
    font-weight: normal;
  }
</style>
