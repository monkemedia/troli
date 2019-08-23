import { createLocalVue, shallowMount } from '@vue/test-utils'
import BurgerButton from '@/components/BurgerButton.vue'

const localVue = createLocalVue()
const instance = () => shallowMount(BurgerButton, {
  localVue
})

describe('components/BurgerMenu', () => {
  it('toggles to `true` on first click', () => {
    const wrapper = instance()
    const button = wrapper.find('[data-qa="button"]')

    wrapper.setData({
      toggleMobileMenu: false
    })

    button.trigger('click')
    expect(wrapper.vm.toggleMobileMenu).toEqual(true)
  })

  it('toggles to `false` on next click', () => {
    const wrapper = instance()
    const button = wrapper.find('[data-qa="button"]')

    wrapper.setData({
      toggleMobileMenu: true
    })

    button.trigger('click')
    expect(wrapper.vm.toggleMobileMenu).toEqual(false)
  })
})
