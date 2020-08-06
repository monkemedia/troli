<template>
  <nav
    class="navbar py-2 has-background-primary"
    role="navigation"
    aria-label="main navigation">
    <div class="container is-fluid">
      <div class="navbar-menu">
        <div class="navbar-start">
          <!-- <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a> -->
          <breadcrumb />
        </div>

        <div class="navbar-end">
          <a class="navbar-item has-text-white">
            <i class="fas fa-bell" />
          </a>
          <!-- <my-account-dropdown /> -->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  // import MyAccountDropdown from '@/components/MyAccountDropdown'

  export default {
    name: 'MainNavigation',

    components: {
      Breadcrumb
      // MyAccountDropdown
    },

    data () {
      return {
        query: ''
      }
    }
  }
</script>
