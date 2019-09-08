import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import flushPromises from 'flush-promises'
import SubmitPasswordForm from '@/components/SubmitPasswordForm'
import ButtonDefault from '@/components/ButtonDefault.vue'
import englishLang from '@/lang/en-GB.json'

const mock = new MockAdapter(axios)
const $scrollTo = jest.fn()
const $route = {
  params: {
    token: '123456'
  }
}
const localVue = createLocalVue()

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: englishLang
  }
})

localVue.component('button-default', ButtonDefault)

const instance = () => shallowMount(SubmitPasswordForm, {
  localVue,
  i18n,
  attachToDocument: true,
  stubs: {
    NuxtLink: RouterLinkStub,
    ButtonDefault: true
  },
  mocks: {
    $route
  },
  methods: {
    $scrollTo
  },
  sync: false
})

describe('components/SubmitPasswordForm', () => {
  it('shows load spinner when `isLoading` is set to true', () => {
    const wrapper = instance()

    wrapper.setData({
      isLoading: true
    })

    expect(wrapper.vm.isLoading).toBe(true)
  })

  it('hides load spinner when `isLoading` is set to false', () => {
    const wrapper = instance()

    wrapper.setData({
      isLoading: false
    })

    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('shows success message when `success` is set to true', async () => {
    const wrapper = instance()

    wrapper.setData({
      success: true
    })

    await flushPromises()

    expect(wrapper.find('[data-qa="success message"]').exists()).toBe(true)
  })

  it('shows error message when alert has a status of 401', async () => {
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

  it('calls `/api/v1/forgotten-password/update-password` endpoint when form is submitted', async () => {
    mock
      .onPost('/api/v1/forgotten-password/update-password')
      .reply(200, { status: 200 })

    const wrapper = instance()

    wrapper.setData({
      form: {
        password: 'password',
        confirm_password: 'password'
      }
    })

    const res = await wrapper.vm.submitPassword()

    expect(res.status).toBe(200)
    expect(wrapper.vm.isLoading).toBe(false)
    expect(wrapper.vm.success).toBe(true)
  })

  it('response with alert', async () => {
    mock
      .onPost('/api/v1/forgotten-password/update-password')
      .reply(500, [{
        details: 'This is a error'
      }])

    const wrapper = instance()

    wrapper.setData({
      form: {
        password: 'password',
        confirm_password: 'password'
      }
    })

    await wrapper.vm.submitPassword()

    expect(wrapper.vm.alert.length).toBe(1)
    expect(wrapper.vm.isLoading).toBe(false)
  })
})
