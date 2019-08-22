import { storiesOf } from '@storybook/vue'
import Vuex from 'vuex'
import locales from '../../store/locales.js'

const store = new Vuex.Store({
  modules: {
    locales
  }
})

storiesOf('Buttons', module)
  .add('Language Selector', () => ({
    store,
    template: `
      <div class="navbar">
        <div class="container">
          <div class="navbar-end" style="align-items: center">
            <lang-selector :switchLanguage="switchLanguage"></lang-selector>
          </div>
        </div>
      </div>
    `
  }))
