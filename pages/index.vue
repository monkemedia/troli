<template>
  <div id="app">
    <navbar />
    <hero :items="items" />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Hero from '~/components/Hero'

export default {
  components: {
    Navbar,
    Hero
  },

  // async asyncData ({ $axios }) {
  //   const response = await $axios.$get('http://localhost:1337/homepages')
  //   console.log('RESPONSE', response)
  //   return {
  //     data: response[0].heroes
  //   }
  // }
  data () {
    return {
      items: [
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
            classes: 'button is-large is-primary'
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
  }
}
</script>

<style>

</style>
