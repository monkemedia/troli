<template>
  <div id="topbar">
    <div class="container">
      <div class="topbar-container">
        <lang-selector />
      </div>
    </div>
  </div>
</template>

<script>
  import LangSelector from '~/components/LangSelector'

  export default {
    name: 'Topbar',

    components: {
      LangSelector
    }
  }
</script>

<style lang="scss" scoped>
  @import '~sass-rem';
  @import '~assets/scss/utilities/variables';

  #topbar {
    background: $white;
    z-index: 35;
  }

  .topbar-container {
    justify-content: flex-end;
    display: flex;
  }
</style>
