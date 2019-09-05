import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import ButtonDefault from '@/components/ButtonDefault.vue'

const localVue = createLocalVue()

const instance = () => shallowMount(ButtonDefault, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  propsData: {
    text: 'Button'
  }
})

describe('components/ButtonDefault', () => {
  it('has the correct text prop', () => {
    const wrapper = instance()

    expect(wrapper.vm.text).toBe('Button')
  })
})
