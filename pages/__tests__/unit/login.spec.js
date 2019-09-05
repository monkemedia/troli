import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import Login from '@/pages/login.vue'
import LinkDefault from '@/components/LinkDefault.vue'

const localVue = createLocalVue()
const $router = []

localVue.component('link-default', LinkDefault)

const instance = () => shallowMount(Login, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub,
    LinkDefault: true
  },
  mocks: {
    $t: () => {},
    $router,
    localePath: code => window.location.href + code
  }
})

describe('pages/Login', () => {
  it('contains login form component', () => {
    const wrapper = instance()

    expect(wrapper.find('[data-qa="login form"]').exists()).toBe(true)
  })

  it('contains a `create account` button', () => {
    const wrapper = instance()

    expect(wrapper.find('[data-qa="create account now button"]').exists()).toBe(true)
  })
})
