import { configure } from '@storybook/vue'
import Vue from 'vue'
import Vuex from 'vuex'

import 'bulma'
// import '@fortawesome/fontawesome-free/css/all.css'
import '../assets/scss/main.scss'

// Components
import LangSelector from '../components/LangSelector.vue'

Vue.use(Vuex)

Vue.component('lang-selector', LangSelector)

const req = require.context('../components/stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => {
    req(filename);
  });
}

configure(loadStories, module)
