import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'

const localVue = createLocalVue()
const instance = () => shallowMount(Navbar, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  mocks: {
    $t: () => {},
    $route: () => {}
  }
})

describe('components/Navbar', () => {
  it('contains the logo', () => {
    const wrapper = instance()

    expect(wrapper.find('[data-qa="logo"]').exists()).toBe(true)
  })
})
