import VueRouter from 'vue-router'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import { Store } from 'vuex-mock-store'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import ConfirmAccountToken from '@/pages/confirm-account/_token'

const confirmAccount = jest.fn()

const router = new VueRouter({
  routes: [
    {
      path: '/confirm-account/123',
      params: {
        token: '123'
      }
    },
    {
      name: 'login',
      path: '/login'
    }
  ]
})
const mock = new MockAdapter(axios)
const localVue = createLocalVue()

localVue.use(VueRouter)

const $store = new Store({
  mutations: {
    'confirmAccount/SET_STATUS': 'success',
    'confirmAccount/SET_MESSAGE': 'a message'
  }
})

const instance = () => shallowMount(ConfirmAccountToken, {
  localVue,
  router,
  mocks: {
    $store,
    $t: text => text,
    localePath: code => code
  }
})

describe('pages/confirm-account/_token', () => {
  it('calls confirmAccount method on load', () => {
    const wrapper = instance()

    wrapper.vm.confirmAccount = confirmAccount()
    expect(confirmAccount).toHaveBeenCalled()
  })

  it('calls `/api/v1/confirm-account` endpoint when form is submitted', async () => {
    mock
      .onPost('/api/v1/confirm-account')
      .reply(200, { status: 200 })

    const wrapper = instance()
    const res = await wrapper.vm.confirmAccount()

    expect(res.status).toBe(200)
  })

  it('commits mutations when user submits email address', () => {
    mock
      .onPost('/api/v1/confirm-account')
      .reply(200, { status: 200 })

    const wrapper = instance()
    wrapper.vm.confirmAccount()

    expect($store.commit).toHaveBeenCalledWith('confirmAccount/SET_STATUS', 'success')
    expect($store.commit).toHaveBeenCalledWith('confirmAccount/SET_MESSAGE', 'pages.confirm_account.thank_you')
  })

  it('directs user to login page when email has successfully been submitted', () => {
    mock
      .onPost('/api/v1/confirm-account')
      .reply(200, { status: 200 })

    const wrapper = instance()
    wrapper.vm.confirmAccount()

    expect(wrapper.vm.$route.name).toBe('login')
  })
})
