import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import Hero from '@/components/Hero.vue'
import LinkDefault from '@/components/LinkDefault.vue'

const localVue = createLocalVue()

localVue.component('link-default', LinkDefault)

const instance = () => shallowMount(Hero, {
  localVue,
  stubs: {
    NuxtLink: RouterLinkStub,
    LinkDefault: true
  },
  mocks: {
    localePath: code => window.location.href + code
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
      },
      {
        id: '3',
        image: 'https://example.org/img4.jpg',
        content: {
          title: 'This is a title 3',
          tagline: 'This is a tagline 3'
        },
        link: {
          name: 'Button 3',
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
    const slide = wrapper.find('[data-qa="hero slide 1"]')

    expect(slide.attributes().style).toContain('https://example.org/img.jpg')
  })

  it('has a tagline', () => {
    const wrapper = instance()
    const tagline = wrapper.find('[data-qa="hero slide 1"] .tagline')

    expect(tagline.text()).toEqual('This is a tagline')
  })

  it('has a title', () => {
    const wrapper = instance()
    const tagline = wrapper.find('[data-qa="hero slide 1"] .title')

    expect(tagline.text()).toEqual('This is a title')
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
      activeImage: 2
    })
    nextButton.trigger('click')
    expect(wrapper.vm.activeImage).toBe(2)
  })

  it('will slide to correct position when clicking on hero indicator controls', () => {
    const wrapper = instance()
    const indicators = wrapper.findAll('[data-qa="hero indicator controls"]')

    for (let i = 0; i < indicators.length; i++) {
      indicators.at(i).trigger('click')
      expect(wrapper.vm.activeImage).toEqual(i)
    }
  })

  it('automatically slides the carousel every 7 seconds', () => {
    jest.useFakeTimers()
    const wrapper = instance()

    wrapper.vm.setActiveImage() // Fire off method

    expect(setInterval).toHaveBeenCalledTimes(2)
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 7000)
  })
})
