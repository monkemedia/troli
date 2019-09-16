import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import _template from 'lodash.template'
import NotificationBar from '@/components/NotificationBar.vue'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      notification_bar: {
        /* eslint-disable no-template-curly-in-string */
        confirmation_link: 'This is a message ${clickhere}',
        /* eslint-enable no-template-curly-in-string */
        click_here: `click here`
      }
    }
  }
})

const localVue = createLocalVue()
const instance = () => shallowMount(NotificationBar, {
  localVue,
  i18n,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  _template,
  sync: false,
  propsData: {
    notification: {
      status: 'success',
      message: 'this is a message'
    }
  }
})

describe('components/NotificationBar', () => {
  it('shows successful message when status is set to `success`', () => {
    const wrapper = instance()

    expect(wrapper.vm.isSuccess).toBe(true)
  })

  it('shows error message when status is set to `error`', () => {
    const wrapper = instance()

    wrapper.setProps({
      notification: {
        status: 'error'
      }
    })

    expect(wrapper.vm.isError).toBe(true)
  })

  it('returns the correct format when string includes a template literal', () => {
    const wrapper = instance()

    expect(wrapper.vm.confirmLinkMessage).toEqual('This is a message <a href="/confirm-account" class="is-link">click here</a>')
  })
})
