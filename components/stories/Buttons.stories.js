import { storiesOf } from '@storybook/vue'

storiesOf('Buttons', module)
  .add('Primary', () => ({
    template: `
        <div class="container">
          <button class="button is-large">Text</button>
        </div>
    `
  }))
