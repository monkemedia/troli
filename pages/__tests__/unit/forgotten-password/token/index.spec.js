import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import ForgottenPasswordToken from '@/pages/forgotten-password/_token/index.vue'

const mock = new MockAdapter(axios)
const $route = {
  params: {
    token: '123456'
  }
}
const localVue = createLocalVue()
const instance = () => shallowMount(ForgottenPasswordToken, {
  localVue,
  attachToDocument: true,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  mocks: {
    $t: () => {},
    $route
  }
})

describe('pages/forgotten-password/_token/index', () => {
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

  it('shows error message when alert has a status of 401', () => {
    const wrapper = instance()

    wrapper.setData({
      alert: [
        {
          status: 401,
          detail: 'This is an error'
        }
      ]
    })

    expect(wrapper.find('[data-qa="alert notification"]').exists()).toBe(true)
  })

  it('calls `/api/v1/forgotten-password/update-password` endpoint when form is submitted', async () => {
    mock
      .onPost('/api/v1/forgotten-password/update-password')
      .reply(200, { status: 200 })

    const wrapper = instance()
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
    await wrapper.vm.submitPassword()

    expect(wrapper.vm.alert.length).toBe(1)
    expect(wrapper.vm.isLoading).toBe(false)
  })
})
