export default {
  loading: false,
  buildModules: [['@nuxtjs/google-fonts']],
  googleFonts: {
    families: {
      Roboto: true,
      'IBM+Plex+Sans': true,
      'Merriweather+Sans': true
    }
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'accessToken',
          maxAge: 60 * 60 * 60 * 24
        },
        endpoints: {
          login: {
            url: 'api/auth/login',
            method: 'post'
          },
          user: false
        }
      }
    }
  },
  router: {
    middleware: ['auth'],
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'index',
        path: '',
        component: resolve(__dirname, 'pages/suppliers/index.vue')
      });
    }
  },
  target: 'server',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: [
    '@/assets/scss/main.scss',
    '@/assets/styles/form_elements.scss',
    '@/assets/styles/page_transitions.css'
  ],

  plugins: [
    { src: '~/plugins/Vuelidate' },
    { src: '~/plugins/Autocomplete', ssr: false }
  ],

  components: true,

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/svg',
    '@nuxtjs/auth-next',
    'bootstrap-vue/nuxt',
    'nuxt-mq',
    '@nuxtjs/style-resources'
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: true
  },
  styleResources: {
    scss: '@/assets/scss/_variables.scss'
  },
  mq: {
    defaultBreakpoint: 'xl',
    breakpoints: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: Infinity
    }
  },

  serverMiddleware: {
    '/api': '~/api'
  },

  /*
   ** For deployment you might want to edit host and port
   */
  // server: {
  //  port: 8000, // default: 3000
  //  host: '0.0.0.0' // default: localhost
  // },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [({ isServer }) => 'vue-typeahead-bootstrap']
  }
};
