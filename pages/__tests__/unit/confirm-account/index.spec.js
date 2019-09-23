import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import ConfirmAccount from '@/pages/confirm-account/index.vue'

const localVue = createLocalVue()

const instance = () => shallowMount(ConfirmAccount, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  mocks: {
    $t: () => {},
    localePath: code => window.location.href + code
  }
})

describe('pages/confirm-account', () => {
  it('contains confirmation link form component', () => {
    const wrapper = instance()

    expect(wrapper.find('[data-qa="confirmation link form"]').exists()).toBe(true)
  })
})
