<template>
  <div>
    <main-header
      title="test"
      prefix="Category" />
    <!-- PAGE CONTENT -->
    <div class="container is-fluid pt-3 bt-1 pb-6">
      test
    </div>
  </div>
</template>

<script>
  import MainHeader from '@/components/Structure/MainHeader'

  export default {
    name: 'CategoryPage',

    components: {
      MainHeader
    },

    data () {
      return {
        breadcrumbs: [
          {
            text: 'Home',
            to: {
              name: 'home'
            }
          },
          {
            text: 'Categories',
            to: {
              name: 'categories'
            }
          }
        ]
      }
    },

    computed: {
      products () {
        return this.$store.state.products.items
      }
    },

    async fetch ({ params, store, query }) {
      try {
        await store.dispatch('products/getProducts', params.categoryId)
      } catch (err) {
        console.log('error', err)
      }
    },

    // mounted () {
    //   const breadcrumb = this.breadcrumbs
    //   breadcrumb.push({
    //     text: this.category.name,
    //     active: true
    //   })
    //   this.$store.commit('breadcrumb/SET_BREADCRUMB', breadcrumb)
    // },

    beforeRouteLeave (to, from, next) {
      this.$store.commit('products/CLEAR_CATEGORY')
      next()
    }
  }
</script>
