export default {
  loading: false,
  buildModules: [["@nuxtjs/google-fonts"]],
  googleFonts: {
    families: {
      Roboto: true,
      "IBM+Plex+Sans": true
    }
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: "accessToken"
        },
        endpoints: {
          login: {
            url: "api/auth/login",
            method: "post"
          },
          user: false
        }
      }
    }
  },
  router: {
    middleware: ["auth"]

    // extendRoutes(routes, resolve) {
    //   routes.push({
    //     name: "index",
    //     path: "/",
    //     component: resolve(__dirname, "pages/login.vue")
    //   });
    // }
  },
  // privateRuntimeConfig: {
  //   secret: process.env.TEST
  // },
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Global CSS
   */
  css: ["@/assets/scss/main.scss", "@/assets/css/buttons.css"],

  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [{ src: "~/plugins/Vuelidate" }],

  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://http.nuxtjs.org
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "bootstrap-vue/nuxt",
    "@nuxtjs/style-resources"
  ],
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: true
  },
  styleResources: {
    scss: "@/assets/scss/_variables.scss"
  },
  /*
   ** Server Middleware
   */
  serverMiddleware: {
    "/api": "~/api"
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
  build: {}
};
