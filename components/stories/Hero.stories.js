import { storiesOf } from '@storybook/vue'
import Hero from '../Hero.vue'

storiesOf('Hero', module)
  .add('Primary', () => ({
    components: {
      Hero
    },
    data () {
      return {
        slides: [
          {
            id: 1,
            image: 'https://cdn.pixabay.com/photo/2016/11/21/11/16/beautiful-1844724_960_720.jpg',
            content: {
              tagline: 'Limited product',
              title: 'Rockstar collection'
            },
            link: {
              name: 'Shop now',
              path: '/',
              classes: 'is-primary'
            }
          },
          {
            id: 2,
            image: 'https://cdn.pixabay.com/photo/2015/11/06/11/32/girl-1026246_960_720.jpg',
            content: {
              tagline: 'Limited product',
              title: 'Rockstar collection'
            }
          },
          {
            id: 3,
            image: 'https://cdn.pixabay.com/photo/2015/03/26/10/38/girl-691712_960_720.jpg',
            content: {
              tagline: 'Limited product',
              title: 'Rockstar collection'
            }
          }
        ]
      }
    },
    // methods: {
    //   localePath () {}
    // },
    template: `
      <div class="section">
        <div class="container">
          <hero :slides="slides" />
        </div>
      </div>
    `
  }))
