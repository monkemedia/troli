import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import { Store } from 'vuex-mock-store'
import flushPromises from 'flush-promises'
import LoginForm from '@/components/LoginForm.vue'
import ButtonDefault from '@/components/ButtonDefault.vue'
import englishLang from '@/lang/en-GB.json'

const localVue = createLocalVue()
const $store = new Store()
const $router = []
const $scrollTo = jest.fn()

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: englishLang
  }
})

localVue.component('button-default', ButtonDefault)

const instance = () => shallowMount(LoginForm, {
  localVue,
  i18n,
  stubs: {
    NuxtLink: RouterLinkStub,
    ButtonDefault: true
  },
  mocks: {
    $store,
    $router,
    localePath: code => window.location.href + code
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

    expect($store.dispatch).toHaveBeenCalledWith('customer/login', { 'email': 'test@test.com', 'password': '1111qqqq' })
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
    $store.dispatch.mockImplementationOnce(() => Promise.reject({
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

  it('hides and spinner and called scrollTo method when validation fails', async () => {
    const wrapper = instance()

    wrapper.vm.login()

    await flushPromises()

    expect($scrollTo).toBeCalled()
    expect(wrapper.vm.isLoading).toBe(false)
  })
})
