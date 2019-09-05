import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import LinkDefault from '@/components/LinkDefault.vue'

const localVue = createLocalVue()

const instance = () => shallowMount(LinkDefault, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  propsData: {
    text: 'Button',
    to: '/'
  }
})

describe('components/LinkDefault', () => {
  it('has the correct text prop', () => {
    const wrapper = instance()

    expect(wrapper.vm.text).toBe('Button')
  })

  it('has the correct to prop', () => {
    const wrapper = instance()

    expect(wrapper.vm.to).toBe('/')
  })
})
