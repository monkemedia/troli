<template>
  <div
    id="register"
    data-qa="register">
    <div class="banner" />

    <section id="register" class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-6">
            <form>
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Text input">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button class="button is-large is-black">
                    register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'Register'
  }
</script>

<style>

</style>
