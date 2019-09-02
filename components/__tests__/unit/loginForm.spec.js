import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import { Store } from 'vuex-mock-store'
import Login from '@/components/loginForm.vue'

const localVue = createLocalVue()
const store = new Store()
const $router = []

const instance = () => shallowMount(Login, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  mocks: {
    $t: () => {},
    $store: store,
    $router
  }
})

describe('components/LoginForm', () => {
  it('on submit dispatch is called', () => {
    const wrapper = instance()
    const form = wrapper.find('[data-qa="login form"]')

    form.trigger('submit.prevent')

    expect(store.dispatch).toHaveBeenCalledWith('customer/login', { 'email': '', 'password': '' })
  })

  it('shows the loading spinner when set to true', () => {
    const wrapper = instance()

    wrapper.setData({
      isLoading: true
    })

    expect(wrapper.vm.isLoading).toBe(true)
  })

  it('hides the loading spinner when set to false', () => {
    const wrapper = instance()

    wrapper.setData({
      isLoading: false
    })

    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('shows a alert notification if there is an error', () => {
    const wrapper = instance()

    wrapper.setData({
      errors: [
        {
          status: 401,
          detail: 'This is an error'
        }
      ]
    })

    expect(wrapper.find('[data-qa="alert notification"]').exists()).toBe(true)
  })

  it('errors', async () => {
    /* eslint prefer-promise-reject-errors: */
    store.dispatch.mockImplementationOnce(() => Promise.reject({
      response: {
        data: [
          {
            statsu: 401,
            details: 'This is a error'
          }
        ]
      }
    }))
    const wrapper = instance()

    await wrapper.vm.login()
    expect(wrapper.vm.errors.length).toBe(1)
    expect(wrapper.vm.isLoading).toBe(false)
  })
})
