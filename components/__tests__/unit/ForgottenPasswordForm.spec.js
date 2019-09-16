import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import flushPromises from 'flush-promises'
import MockAdapter from 'axios-mock-adapter'
import ButtonDefault from '@/components/ButtonDefault.vue'
import ForgottenPasswordForm from '@/components/ForgottenPasswordForm'
import englishLang from '@/lang/en-GB.json'

const mock = new MockAdapter(axios)
const localVue = createLocalVue()
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

const instance = () => shallowMount(ForgottenPasswordForm, {
  localVue,
  attachToDocument: true,
  i18n,
  stubs: {
    ButtonDefault: true
  },
  methods: {
    $scrollTo
  },
  sync: false
})

describe('components/ForgottenPasswordForm', () => {
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

  it('shows success message when alert object has a status of 200', async () => {
    const wrapper = instance()

    wrapper.setData({
      alert: [
        {
          status: 200,
          detail: 'This is a success message'
        }
      ]
    })

    await flushPromises()

    expect(wrapper.find('[data-qa="alert notification"]').exists()).toBe(true)
  })

  it('shows error message when alert object message has a status of 401', async () => {
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

  it('hides and spinner and called scrollTo method when validation fails', async () => {
    const wrapper = instance()

    wrapper.vm.submitEmail()

    await flushPromises()

    expect($scrollTo).toBeCalled()
    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('calls `/api/v1/forgotten-password` endpoint when form is submitted', async () => {
    mock
      .onPost('/api/v1/forgotten-password')
      .reply(200, { status: 200 })

    const wrapper = instance()

    wrapper.setData({
      form: {
        email: 'test@test.com',
        password: '1111qqqq'
      }
    })

    const res = await wrapper.vm.submitEmail()

    expect(res.status).toBe(200)
    expect(wrapper.vm.isLoading).toBe(false)
    expect(wrapper.vm.success).toBe(true)
  })

  it('response with errors', async () => {
    mock
      .onPost('/api/v1/forgotten-password')
      .reply(500, [{
        details: 'This is a error'
      }])

    const wrapper = instance()

    wrapper.setData({
      form: {
        email: 'test@test.com',
        password: '1111qqqq'
      }
    })

    await wrapper.vm.submitEmail()

    expect(wrapper.vm.alert.length).toBe(1)
    expect(wrapper.vm.isLoading).toBe(false)
  })
})
