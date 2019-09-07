import { storiesOf } from '@storybook/vue'
import ButtonDefault from '../ButtonDefault.vue'

storiesOf('Button', module)
  .add('Primary', () => ({
    components: {
      ButtonDefault
    },
    template: `
      <div class="section">
        <div class="container">
          <button-default text="Login in"></button-default>
        </div>
      </div>
    `
  }))
  .add('Animated', () => ({
    components: {
      ButtonDefault
    },
    template: `
      <div class="section">
        <div class="container">
          <button-default is-flip text="Create a new account"></button-default>
        </div>
      </div>
    `
  }))
  .add('Animated - Colour', () => ({
    components: {
      ButtonDefault
    },
    template: `
      <div class="section">
        <div class="container">
          <button-default class="is-primary" is-flip text="Create a new account"></button-default>
        </div>
      </div>
    `
  }))
