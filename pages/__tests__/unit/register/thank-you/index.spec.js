import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import RegisterThankYou from '@/pages/register/thank-you/index.vue'

const localVue = createLocalVue()
const $router = []

const instance = () => shallowMount(RegisterThankYou, {
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

describe('pages/register/thank-you', () => {
  it('exists', () => {
    const wrapper = instance()

    expect(wrapper.find('[data-qa="registration thank you page"]').exists()).toBe(true)
  })
})
