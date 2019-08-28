import Vue from 'vue'
import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import MyAccount from '@/components/MyAccount.vue'
import englishLang from '@/locales/en-GB.json'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: englishLang
  }
})
const localVue = createLocalVue()
const mockStore = {
  dispatch: jest.fn()
}
const instance = customer => shallowMount(MyAccount, {
  mocks: {
    $store: mockStore
  },
  localVue,
  i18n,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  computed: {
    customerDetails: () => {
      return customer ? customer.customer : false
    },
    isAuthenticated: () => {
      return customer ? customer.isAuthenticated : false
    }
  }
})

describe('components/MyAccount', () => {
  it('has a background imagesets toggle state to active=`true` on mouse over', () => {
    const wrapper = instance()
    const button = wrapper.find('[data-qa="my account dropdown"]')

    wrapper.setData({
      isActive: false
    })
    button.trigger('mouseover')
    expect(wrapper.vm.isActive).toBe(true)
  })

  it('shows the deauthenticate header when user isn`t logged in', () => {
    const customer = {
      isAuthenticated: false,
      customer: {
        name: null
      }
    }
    const wrapper = instance(customer)
    const authenticatedHeader = wrapper.find('[data-qa="my account dropdown authenticated header"]')
    const deauthenticatedHeader = wrapper.find('[data-qa="my account dropdown deauthenticated header"]')

    expect(authenticatedHeader.exists()).toBe(false)
    expect(deauthenticatedHeader.exists()).toBe(true)
  })

  it('shows the authenticate header when user is logged in', () => {
    const customer = {
      isAuthenticated: true,
      customer: {
        name: 'Richard'
      }
    }
    const wrapper = instance(customer)
    const authenticatedHeader = wrapper.find('[data-qa="my account dropdown authenticated header"]')
    const deauthenticatedHeader = wrapper.find('[data-qa="my account dropdown deauthenticated header"]')

    expect(authenticatedHeader.exists()).toBe(true)
    expect(deauthenticatedHeader.exists()).toBe(false)
  })

  it('shows users name when logged in', () => {
    const customer = {
      isAuthenticated: true,
      customer: {
        name: 'Richard'
      }
    }
    const wrapper = instance(customer)
    const username = wrapper.find('[data-qa="my account user name"]')

    expect(username.text()).toEqual('Hi Richard')
  })

  it('dispatches `customer/signOut` when user clicks on sign out button', () => {
    const customer = {
      isAuthenticated: true,
      customer: {
        name: 'Richard'
      }
    }
    const wrapper = instance(customer)
    const signOutButton = wrapper.find('[data-qa="sign out button"]')

    signOutButton.trigger('click')

    expect(mockStore.dispatch).toHaveBeenCalled()
  })
})
