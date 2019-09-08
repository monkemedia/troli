import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import ForgottenPasswordToken from '@/pages/forgotten-password/_token/index.vue'

const localVue = createLocalVue()

const instance = () => shallowMount(ForgottenPasswordToken, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  mocks: {
    $t: () => {},
    localePath: code => window.location.href + code
  }
})

describe('pages/forgotten-password/_token/index', () => {
  it('contains submit password form component', () => {
    const wrapper = instance()

    expect(wrapper.find('[data-qa="submit password form"]').exists()).toBe(true)
  })
})
