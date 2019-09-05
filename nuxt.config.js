require('dotenv').config()

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Shop template', // process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins&display=swap' }
    ]
  },
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
  },

  serverMiddleware: ['~server/index.js'],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'bulma',
    // CSS file in the project
    '@fortawesome/fontawesome-free/css/all.css',
    '@/assets/scss/main.scss'
  ],
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'home',
        path: '/',
        component: resolve(__dirname, 'pages/index.vue')
      })
    }
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/moltin.js',
    {
      src: '~plugins/vee-validate.js',
      ssr: true
    },
    '~plugins/vue-scrollto.js',
    '~plugins/global.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['nuxt-i18n', {
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        alwaysRedirect: false
      }
    }]
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-GB',
        name: 'English',
        file: 'en-GB.json'
      },
      {
        code: 'nl',
        iso: 'nl-NL',
        name: 'Netherlands',
        file: 'nl-NL.json'
      }
    ],
    lazy: true,
    defaultLocale: 'en',
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'en',
      silentFallbackWarn: true
    }
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ['vee-validate'],
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend (config, ctx) {
      config.node = { fs: 'empty' }
    }
  }
}
