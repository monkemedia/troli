import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { configure, addDecorator } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withA11y } from '@storybook/addon-a11y'
import LinkDefault from '../components/LinkDefault.vue'

import 'bulma'
// import '@fortawesome/fontawesome-free/css/all.css'
import '../assets/scss/main.scss'
import './scss/main.scss'

addDecorator(withA11y)

Vue.use(VeeValidate)

Vue.component('link-default', LinkDefault)
Vue.component('NuxtLink', {
  props:   ['to'],
  methods: {
    log() {
      action('link target')(this.to)
    }
  },
  template: '<div @click="log()"><slot>NuxtLink</slot></div>',
})

Vue.prototype.localePath = function () {}
Vue.prototype.$t = function () {}

const req = require.context('../components/stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => {
    req(filename);
  });
}

configure(loadStories, module)
