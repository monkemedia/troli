import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import Register from '@/pages/register.vue'

const localVue = createLocalVue()
const $router = []

const instance = () => shallowMount(Register, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  mocks: {
    $t: () => {},
    $router,
    localePath: code => window.location.href + code
  }
})

describe('pages/Register', () => {
  it('contains login form component', () => {
    const wrapper = instance()

    expect(wrapper.find('[data-qa="register form"]').exists()).toBe(true)
  })
})
