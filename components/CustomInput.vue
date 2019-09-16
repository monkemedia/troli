<template>
  <div class="field">
    <label
      :class="{ 'is-sr-only': hideLabel }"
      class="label"
      :for="id">{{ label }}<sup v-if="isRequired">*</sup></label>
    <div class="control">
      <input
        :id="id"
        ref="input"
        :value="value"
        :aria-required="isRequired"
        :class="{'is-danger': error }"
        class="input"
        :name="id"
        :type="type"
        :data-qa="dataQa"
        @input="onInput">
      <p
        v-if="helpText && !error"
        class="help"
        data-qa="help text">
        {{ helpText }}
      </p>
      <p
        v-if="error"
        role="alert"
        aria-invalid="true"
        class="help is-danger"
        :data-qa="`${id} error`">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CustomInput',

    $_veeValidate: {
      name () {
        return this.id
      },
      value () {
        return this.value
      }
    },

    props: {
      hideLabel: {
        type: Boolean,
        required: false,
        default: () => false
      },

      label: {
        type: String,
        required: true
      },

      helpText: {
        type: String,
        required: false,
        default: () => null
      },

      id: {
        type: String,
        required: true
      },

      isRequired: {
        type: Boolean,
        required: false,
        default: () => false
      },

      type: {
        type: String,
        required: false,
        default: () => 'text'
      },

      error: {
        type: String,
        required: false,
        default: () => ''
      },

      dataQa: {
        type: String,
        required: true
      }
    },

    data () {
      return {
        value: null
      }
    },

    methods: {
      onInput (e) {
        const val = this.$refs.input.value
        this.value = val

        this.$emit('input', val)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
