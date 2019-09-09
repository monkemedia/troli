
import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import CustomInput from '@/components/CustomInput.vue'

const localVue = createLocalVue()

const instance = () => shallowMount(CustomInput, {
  localVue,
  mocks: {
    localePath: code => window.location.href + code
  },
  stubs: {
    NuxtLink: RouterLinkStub
  },
  propsData: {
    dataQa: 'email box',
    hideLabel: false,
    label: 'Email address',
    id: 'email'
  }
})

describe('components/CustomInput', () => {
  it('receives the `hideLabel` data prop', () => {
    const wrapper = instance()

    expect(wrapper.vm.hideLabel).toBe(false)

    wrapper.setProps({
      hideLabel: true
    })

    expect(wrapper.vm.hideLabel).toBe(true)
  })

  it('receives the `label` data prop', () => {
    const wrapper = instance()

    expect(wrapper.vm.label).toEqual('Email address')
  })

  it('receives the `id` data prop', () => {
    const wrapper = instance()

    expect(wrapper.vm.id).toEqual('email')
  })

  it('receives the `isRequired` data prop', () => {
    const wrapper = instance()

    expect(wrapper.vm.isRequired).toBe(false)

    wrapper.setProps({
      isRequired: true
    })

    expect(wrapper.vm.isRequired).toBe(true)
  })

  it('receives the `type` data prop', () => {
    const wrapper = instance()

    expect(wrapper.vm.type).toEqual('text')

    wrapper.setProps({
      type: 'password'
    })

    expect(wrapper.vm.type).toEqual('password')
  })

  it('receives the `error` data prop', () => {
    const wrapper = instance()

    expect(wrapper.vm.error).toEqual('')

    wrapper.setProps({
      error: 'Whoops! Email address is required'
    })

    expect(wrapper.vm.error).toEqual('Whoops! Email address is required')
  })

  it('emits input value on @input event', () => {
    const wrapper = instance()
    const id = wrapper.vm.id
    const input = wrapper.find(`[data-qa="${id} box"]`)

    input.setValue('test@test.com')
    input.trigger('change')

    expect(wrapper.emitted('input')[0][0]).toEqual('test@test.com')
  })
})
