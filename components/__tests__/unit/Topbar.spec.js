import { createLocalVue, shallowMount } from '@vue/test-utils'
import Topbar from '@/components/Topbar.vue'

const localVue = createLocalVue()

const instance = () => shallowMount(Topbar, {
  localVue
})

describe('components/Topbar', () => {
  it('has a language selector component', () => {
    const wrapper = instance()

    expect(wrapper.find('[data-qa="language selector"]').exists()).toBe(true)
  })
})
