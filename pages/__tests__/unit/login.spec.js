import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import Login from '@/pages/login.vue'

const localVue = createLocalVue()
const $router = []

const instance = () => shallowMount(Login, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  mocks: {
    $t: () => {},
    $router
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
