import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import LanguageSelector from '@/components/LanguageSelector.vue'
const switchLanguage = jest.fn()

const localVue = createLocalVue()
const instance = () => shallowMount(LanguageSelector, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  mocks: {
    switchLocalePath: code => window.location.href + code
  },
  sync: false,
  methods: {
    switchLanguage
  },
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
  it('sets toggle state to active=`true` on mouse over', async () => {
    const wrapper = instance()
    const button = wrapper.find('[data-qa="English"]')

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
})
