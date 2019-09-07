import { storiesOf } from '@storybook/vue'

storiesOf('Form', module)
  .add('Input', () => ({
    data () {
      return {
        form: {
          email: null,
          password: null
        }
      }
    },
    template: `
      <div class="section">
        <div class="container">
          <div class="field">
            <label
              class="label"
              aria-label=""
              for="email">Email<sup>*</sup></label>
            <div class="control">
              <input
                id="email"
                v-model="form.email"
                v-validate="'required|email'"
                aria-required="true"
                :class="{'is-danger': errors.has('email') }"
                class="input"
                name="email"
                type="text"
                data-qa="email box">
              <p
                v-show="errors.has('email')"
                role="alert"
                aria-invalid="true"
                class="help is-danger"
                data-qa="email error">
                {{ errors.first('email') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  }))
