import { createLocalVue, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import flushPromises from 'flush-promises'
import MockAdapter from 'axios-mock-adapter'
import ForgottenPassword from '@/pages/forgotten-password/index.vue'

const mock = new MockAdapter(axios)
const localVue = createLocalVue()
const instance = () => shallowMount(ForgottenPassword, {
  localVue,
  attachToDocument: true,
  mocks: {
    $t: () => {}
  }
})

describe('pages/forgotten-password/index', () => {
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

  it('shows success message when `success` is set to true', () => {
    const wrapper = instance()

    wrapper.setData({
      success: true
    })

    expect(wrapper.find('[data-qa="success message"]').exists()).toBe(true)
  })

  it('shows error message when there are `errors`', () => {
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

  it('calls `/api/v1/forgotten-password` endpoint when form is submitted', async () => {
    mock
      .onPost('/api/v1/forgotten-password')
      .reply(200, { status: 200 })

    const wrapper = instance()
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
    await wrapper.vm.submitEmail()

    expect(wrapper.vm.errors.length).toBe(1)
    expect(wrapper.vm.isLoading).toBe(false)
  })
})
