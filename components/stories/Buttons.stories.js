import { storiesOf } from '@storybook/vue'
import ButtonDefault from '../ButtonDefault.vue'

storiesOf('Buttons', module)
  .add('Primary', () => ({
    components: {
      ButtonDefault
    },
    template: `
        <div class="container">
          <button-default is-flip text="Create a new account"></button-default>
        </div>
    `
  }))
