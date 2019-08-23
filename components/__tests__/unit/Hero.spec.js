import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import Hero from '@/components/Hero.vue'

const localVue = createLocalVue()
const instance = () => shallowMount(Hero, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub
  },
  propsData: {
    slides: [
      {
        id: '1',
        image: 'https://example.org/img.jpg',
        content: {
          title: 'This is a title',
          tagline: 'This is a tagline'
        },
        link: {
          name: 'Button',
          path: '/',
          classes: 'btn'
        }
      },
      {
        id: '2',
        image: 'https://example.org/img2.jpg',
        content: {
          title: 'This is a title 2',
          tagline: 'This is a tagline 2'
        },
        link: {
          name: 'Button 2',
          path: '/',
          classes: 'btn'
        }
      }
    ]
  }
})

describe('components/Hero', () => {
  it('has a background image', () => {
    const wrapper = instance()
    const slide = wrapper.find('[data-qa="hero slide"]')

    expect(slide.attributes().style).toContain('https://example.org/img.jpg')
  })

  it('has a tagline', () => {
    const wrapper = instance()
    const tagline = wrapper.find('[data-qa="hero slide"] .tagline')

    expect(tagline.text()).toEqual('This is a tagline')
  })

  it('has a title', () => {
    const wrapper = instance()
    const tagline = wrapper.find('[data-qa="hero slide"] .title')

    expect(tagline.text()).toEqual('This is a title')
  })

  it('has a button', () => {
    const wrapper = instance()
    const button = wrapper.find('[data-qa="hero slide"] .btn')

    expect(button.text()).toEqual('Button')
  })

  it('slides to the previous slide when clicking on the `previous` button', () => {
    const wrapper = instance()
    const previousButton = wrapper.find('[data-qa="hero previous button"]')

    wrapper.setData({
      activeImage: 1
    })
    previousButton.trigger('click')
    expect(wrapper.vm.activeImage).toBe(0)
  })

  it('slides to the next slide when clicking on the `next` button', () => {
    const wrapper = instance()
    const nextButton = wrapper.find('[data-qa="hero next button"]')

    wrapper.setData({
      activeImage: 0
    })
    nextButton.trigger('click')
    expect(wrapper.vm.activeImage).toBe(1)
  })

  it('will not slide backwards when on the first slide', () => {
    const wrapper = instance()
    const previousButton = wrapper.find('[data-qa="hero previous button"]')

    wrapper.setData({
      activeImage: 0
    })
    previousButton.trigger('click')
    expect(wrapper.vm.activeImage).toBe(0)
  })

  it('will not slide forwards when on the last slide', () => {
    const wrapper = instance()
    const nextButton = wrapper.find('[data-qa="hero next button"]')

    wrapper.setData({
      activeImage: 1
    })
    nextButton.trigger('click')
    expect(wrapper.vm.activeImage).toBe(1)
  })
})
