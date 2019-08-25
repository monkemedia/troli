import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import MyAccount from '@/components/MyAccount.vue'

const localVue = createLocalVue()
const instance = customer => shallowMount(MyAccount, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  mocks: {
    $t: key => key
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
})
