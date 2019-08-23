<template>
  <section
    class="hero">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="carousel-item"
      :class="{ 'carousel-item--active' : activeImage === index }"
      :style="`background-image: url(${item.image});`">
      <div class="carousel-caption hero-body">
        <div class="container">
          <p class="tagline">
            {{ item.content.tagline }}
          </p>
          <h1 class="title">
            {{ item.content.title }}
          </h1>
          <!-- <nuxt-link
            v-if="item.link"
            :to="item.link.path"
            :class="item.link.classes">
            {{ item.link.name }}
          </nuxt-link> -->
        </div>
      </div>
    </div>
    <div
      class="carousel-control-prev is-hidden-mobile"
      :class="{ 'is-active' : activeImage > 0 }">
      <button @click="prevImage()">
        Prev
      </button>
    </div>
    <div
      class="carousel-control-next is-hidden-mobile"
      :class="{ 'is-active' : activeImage + 1 < items.length }">
      <button @click="nextImage()">
        Next
      </button>
    </div>
    <ol class="carousel-indicators">
      <li
        v-for="(item, index) in items.length"
        :key="index"
        :data-slide-to="index">
        <button
          :class="{ 'is-active' : activeImage === index }"
          @click="goToImage(index)">
          <span />
        </button>
      </li>
    </ol>
  </section>
</template>

<script>
  export default {
    name: 'Hero',

    props: {
      items: {
        type: Array,
        required: true
      }
    },

    data () {
      return {
        activeImage: 0,
        timer: null
      }
    },

    mounted () {
      this.setActiveImage()
    },

    methods: {
      setActiveImage () {
        this.timer = setInterval(() => {
          this.activeImage += 1

          if (this.activeImage === this.items.length) {
            this.activeImage = 0
          }
        }, 7000)
      },

      nextImage () {
        clearInterval(this.timer)
        this.activeImage += 1
        this.setActiveImage()
      },

      prevImage () {
        clearInterval(this.timer)
        this.activeImage -= 1
        this.setActiveImage()
      },

      goToImage (index) {
        clearInterval(this.timer)
        this.activeImage = index
        this.setActiveImage()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~sass-rem';
  @import '~sass-mq';
  @import '~assets/scss/utilities/variables';

  .hero {
    position: relative;
    height: 100vh;
    // height: 950px;
  }

  .carousel-item {
    height: 100%;
    background-size: cover;
    opacity: 0 !important;
    position: absolute;
    width: 100%;
    left: 0;

    &--active {
      transition: all 0.8s !important;
      opacity: 1 !important;
    }
  }

  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;

    button {
      background: transparent;
      border: rem(2px) solid $white;
      color: $white;
      text-transform: uppercase;
      letter-spacing: rem(4px);
      padding: rem(10px);
      line-height: 1;
      text-align: center;
      width: rem(64px);
      cursor: pointer;
      pointer-events: none;
    }

    &.is-active {
      button {
        background: $white;
        color: $grey-darker;
        pointer-events: auto;
      }
    }
  }

  .carousel-control-prev {
    left: 0;

    button {
      transform: rotate(-90deg);
    }
  }

  .carousel-control-next {
    right: 0;

    button {
      transform: rotate(90deg);
    }
  }

  .carousel-indicators {
    position: absolute;
    right: 0;
    left: 0;
    bottom: rem(50px);
    display: flex;
    justify-content: center;
    list-style: none;

    li {
      flex: 0 1 auto;
      width: rem(30px);
      height: rem(30px);
      margin: 0 rem(3px);

      button {
        background: transparent;
        width: 100%;
        height: 100%;
        border-radius: 0;
        border: 0;
        padding: 0;
        pointer-events: auto;
        cursor: pointer;

        span {
          background: $white;
          opacity: .5;
          height: 3px;
          width: 100%;
          display: block;
        }

        &.is-active {
          span {
            opacity: 1;
            pointer-events: none;
            cursor: default;
          }
        }
      }
    }
  }

  .carousel-caption {
    height: 100%;
    display: flex;
    align-items: center;

    .container {
      @include mq($from: $tablet) {
        padding: 0 rem(50px);
      }
    }

    .tagline {
      font-size: rem(18px);
      color: $white;
      letter-spacing: rem(3.2px);
      display: block;
      text-align: center;
      margin-bottom: rem(20px);

      @include mq($from: $tablet) {
        text-align: left;
      }
    }

    .title {
      font-size: rem(45px);
      color: $white;
      text-transform: uppercase;
      display: block;
      margin-left: rem(-5px);
      font-weight: 500;
      text-align: center;
      line-height: 1;
      margin-bottom: rem(20px);

      @include mq($from: $tablet) {
        text-align: left;
        font-size: rem(75px);
      }
    }

    .button {
      width: 100%;

      @include mq($from: $tablet) {
        width: auto;
      }
    }
  }
</style>
