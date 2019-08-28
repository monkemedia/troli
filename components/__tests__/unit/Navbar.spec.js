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
  it('contains topbar navigation', () => {
    const wrapper = instance()

    expect(wrapper.find('[data-qa="topbar navigation"]').exists()).toBe(true)
  })

  it('contains the logo', () => {
    const wrapper = instance()

    expect(wrapper.find('[data-qa="logo"]').exists()).toBe(true)
  })

  it('contains mobile burger button', () => {
    const wrapper = instance()

    expect(wrapper.find('[data-qa="mobile burger button"]').exists()).toBe(true)
  })

  it('contains main navigation', () => {
    const wrapper = instance()

    expect(wrapper.find('[data-qa="main navigation"]').exists()).toBe(true)
  })

  it('contains icon menu', () => {
    const wrapper = instance()

    expect(wrapper.find('[data-qa="icon menu"]').exists()).toBe(true)
  })

  it('updates toggleMobileMenu with true', () => {
    const wrapper = instance()

    wrapper.vm.toggleMobileMenuHandler(true)
    expect(wrapper.vm.toggleMobileMenu).toBe(true)
  })
})
