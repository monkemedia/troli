<template>
  <nav
    v-if="items && items.length > 0"
    class="breadcrumb has-succeeds-separator is-inline-block"
    aria-label="breadcrumbs">
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="{ 'is-active' : item.active }">
        <nuxt-link
          v-if="!item.commit"
          :to="{ ...item.to }"
          :aria-current="item.active ? 'page' : null">
          {{ item.text }}
        </nuxt-link>
        <a
          v-else
          @click="goToSlide(item.commit.type, item.page)">
          {{ item.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'Breadcrumb',

    computed: {
      items () {
        return this.$store.state.breadcrumb.items
      }
    },

    methods: {
      goToSlide (type, page) {
        this.$store.commit(type, page)
      }
    }
  }
</script>
