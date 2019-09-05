import { configure, addDecorator } from '@storybook/vue'
import { withA11y } from '@storybook/addon-a11y'

import 'bulma'
// import '@fortawesome/fontawesome-free/css/all.css'
import '../assets/scss/main.scss'

addDecorator(withA11y)

// Components
// import B from '../components/LanguageSelector.vue'


// Vue.component('lang-selector', LangSelector)

const req = require.context('../components/stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => {
    req(filename);
  });
}

configure(loadStories, module)
