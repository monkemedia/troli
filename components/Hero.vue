<template>
  <section
    class="hero">
    <div
      v-for="(slide, index) in slides"
      :key="slide.id"
      :aria-hidden="activeImage !== index"
      role="tabpanel"
      class="carousel-item"
      :class="{ 'carousel-item--active' : activeImage === index }"
      :style="`background-image: url(${slide.image});`"
      :data-qa="`hero slide ${index + 1}`">
      <div class="carousel-caption hero-body">
        <div class="container">
          <p class="tagline">
            {{ slide.content.tagline }}
          </p>
          <h1 class="title">
            {{ slide.content.title }}
          </h1>
          <link-default
            v-if="slide.link"
            :to="slide.link.path"
            :text="slide.link.name"
            :class="slide.link.classes"
            is-flip
            type="submit" />
        </div>
      </div>
    </div>
    <div
      v-if="slides.length > 1"
      class="carousel-control-prev is-hidden-mobile">
      <button
        :class="{ 'is-active' : activeImage > 0 }"
        role="button"
        class="test"
        data-qa="hero previous button"
        @click="prevImage()">
        Prev
      </button>
    </div>
    <div
      v-if="slides.length > 1"
      class="carousel-control-next is-hidden-mobile">
      <button
        :class="{ 'is-active' : activeImage + 1 < slides.length }"
        role="button"
        data-qa="hero next button"
        @click="nextImage()">
        Next
      </button>
    </div>
    <ol
      v-if="slides.length > 1"
      class="carousel-indicators"
      role="tablist">
      <li
        v-for="(slide, index) in slides.length"
        :key="index"
        role="tab"
        :aria-selected="activeImage === index"
        :data-slide-to="index">
        <button
          data-qa="hero indicator controls"
          role="button"
          :class="{ 'is-active' : activeImage === index }"
          @click="goToImage(index)">
          <span class="is-sr-only">
            Go to slide {{ index + 1 }}
          </span>
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
      slides: {
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

          if (this.activeImage === this.slides.length) {
            this.activeImage = 0
          }
        }, 7000)
      },

      nextImage () {
        clearInterval(this.timer)
        if (this.activeImage + 1 === this.slides.length) {
          return
        }
        this.activeImage += 1
        this.setActiveImage()
      },

      prevImage () {
        clearInterval(this.timer)
        if (this.activeImage === 0) {
          return
        }
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
    background: $grey-dark;
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
      z-index: 1;
    }
  }

  .carousel-control-prev,
  .carousel-control-next {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    z-index: 2;

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

      &.is-active {
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
    z-index: 2;

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

    p.tagline {
      font-size: rem(18px) !important;
      color: $white !important;
      letter-spacing: rem(3.2px);
      display: block;
      text-align: center;
      margin-bottom: rem(20px);

      @include mq($from: $tablet) {
        text-align: left;
      }
    }

    .title {
      font-size: rem(45px) !important;
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
