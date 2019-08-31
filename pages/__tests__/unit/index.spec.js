import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import Homepage from '@/pages/index.vue'

const localVue = createLocalVue()
const instance = () => shallowMount(Homepage, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  mocks: {
    $t: () => {},
    $route: () => {}
  }
})

describe('pages/Homepage', () => {
  it('contains hero component', () => {
    const wrapper = instance()

    expect(wrapper.find('[data-qa="hero banner"]').exists()).toBe(true)
  })
})
