import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import IconMenu from '@/components/IconMenu.vue'

const localVue = createLocalVue()
const instance = () => shallowMount(IconMenu, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  propsData: {
    icons: [
      {
        name: 'Wishlist',
        path: '/wishlist',
        class: 'fa-heart',
        meta: null
      },
      {
        name: 'Cart',
        path: '/cart',
        class: 'fa-shopping-bag',
        meta: 'is-cart'
      },
      {
        name: 'Search',
        path: '/search',
        class: 'fa-search'
      }
    ]
  }
})

describe('components/IconMenu', () => {
  it('contains icons', () => {
    const wrapper = instance()

    expect(wrapper.findAll('[data-qa="icon"]').exists()).toBe(true)
  })
})
