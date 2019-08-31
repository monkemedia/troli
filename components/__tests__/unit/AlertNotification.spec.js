import { createLocalVue, shallowMount } from '@vue/test-utils'
import AlertNotification from '@/components/AlertNotification.vue'

const localVue = createLocalVue()
const instance = () => shallowMount(AlertNotification, {
  localVue,
  propsData: {
    alert: [
      {
        status: 401,
        message: 'Message 1'
      },
      {
        status: 401,
        message: 'Message 2'
      }
    ]
  }
})

describe('components/AlertNotification', () => {
  it('receives 2 alerts', () => {
    const wrapper = instance()

    expect(wrapper.props().alert.length).toBe(2)
  })

  it('shows a success notification if first status is `200`', () => {
    const wrapper = instance()

    wrapper.setProps({
      alert: [
        {
          status: 200
        }
      ]
    })
    expect(wrapper.vm.notificationType).toEqual('success')
  })

  it('shows an error notification if first status is not `200`', () => {
    const wrapper = instance()

    expect(wrapper.vm.notificationType).toEqual('error')
  })
})
