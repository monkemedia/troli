import { createLocalVue, shallowMount } from '@vue/test-utils'
import LanguageSelector from '@/components/LanguageSelector.vue'

const localVue = createLocalVue()
const instance = () => shallowMount(LanguageSelector, {
  localVue,
  computed: {
    locale: () => {
      return 'nl'
    },
    locales: () => {
      return [
        {
          code: 'en',
          iso: 'en-GB',
          name: 'English'
        },
        {
          code: 'nl',
          iso: 'nl-NL',
          name: 'Netherlands'
        }
      ]
    }
  }
})

describe('components/LanguageSelector', () => {
  it('sets toggle state to active=`true` on mouse over', () => {
    const wrapper = instance()
    const button = wrapper.find('[data-qa="language selector button"]')

    wrapper.setData({
      isActive: false
    })
    button.trigger('mouseover')
    expect(wrapper.vm.isActive).toBe(true)
  })

  it('only shows locales which have not been selected', () => {
    const wrapper = instance()

    expect(wrapper.vm.availableLocales).toEqual([
      {
        code: 'en',
        iso: 'en-GB',
        name: 'English'
      }
    ])
  })

  it('shows the correct selected locale on page load', () => {
    const wrapper = instance()

    expect(wrapper.vm.selectedLocale.code).toBe('nl')
  })

  // it('selects the correct locale when clicking on items from dropdown', () => {
  //   const wrapper = instance()
  //   const button = wrapper.findAll('[data-qa="language selector dropdown button"]').at(0)

  //   button.trigger('click')
  //   expect(wrapper.vm.selectedLocale.code).toBe('en')
  // })
})
