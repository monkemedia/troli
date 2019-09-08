import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import ForgottenPassword from '@/pages/forgotten-password/index.vue'

const localVue = createLocalVue()

const instance = () => shallowMount(ForgottenPassword, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  mocks: {
    $t: () => {},
    localePath: code => window.location.href + code
  }
})

describe('pages/ForgottenPassword', () => {
  it('contains forgotten password form component', () => {
    const wrapper = instance()

    expect(wrapper.find('[data-qa="forgotten password form"]').exists()).toBe(true)
  })
})
