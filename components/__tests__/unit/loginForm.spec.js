import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import { Store } from 'vuex-mock-store'
import flushPromises from 'flush-promises'
import Login from '@/components/loginForm.vue'

const localVue = createLocalVue()
const store = new Store()
const $router = []
const $scrollTo = jest.fn()

const instance = () => shallowMount(Login, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  mocks: {
    $t: () => {},
    $store: store,
    $router,
    localePath: code => window.location.href + code,
    $i18n: {
      locale: 'en'
    }
  },
  methods: {
    $scrollTo
  },
  sync: false
})

describe('components/LoginForm', () => {
  it('on submit dispatch is called', async () => {
    const wrapper = instance()
    const form = wrapper.find('[data-qa="login form"]')

    wrapper.setData({
      form: {
        email: 'test@test.com',
        password: '1111qqqq'
      }
    })

    form.trigger('submit.prevent')

    await flushPromises()

    expect(store.dispatch).toHaveBeenCalledWith('customer/login', { 'email': 'test@test.com', 'password': '1111qqqq' })
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

  it('shows an alert notification if there is an error', async () => {
    const wrapper = instance()

    wrapper.setData({
      alert: [
        {
          status: 401,
          detail: 'This is an error'
        }
      ]
    })

    await flushPromises()

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

    wrapper.setData({
      form: {
        email: 'test@test.com',
        password: '1111qqqq'
      }
    })

    await wrapper.vm.login()

    expect(wrapper.vm.alert.length).toBe(1)
    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('shows an error if email box is left empty', async () => {
    const wrapper = instance()
    const emailBox = wrapper.find('[data-qa="email box"]')
    const emailError = wrapper.find('[data-qa="email error"]')

    emailBox.trigger('blur')

    await flushPromises()
    expect(emailError.isVisible()).toBe(true)
  })

  it('shows an error if email address is wrong', async () => {
    const wrapper = instance()
    const emailBox = wrapper.find('[data-qa="email box"]')
    const emailError = wrapper.find('[data-qa="email error"]')

    emailBox.setValue('test&test.com')

    emailBox.trigger('blur')

    await flushPromises()
    expect(emailError.isVisible()).toBe(true)
  })

  it('shows an error if password box is left empty', async () => {
    const wrapper = instance()
    const passwordBox = wrapper.find('[data-qa="password box"]')
    const passwordError = wrapper.find('[data-qa="password error"]')

    passwordBox.trigger('blur')

    await flushPromises()
    expect(passwordError.isVisible()).toBe(true)
  })
})
