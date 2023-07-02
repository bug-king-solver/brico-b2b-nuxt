import enModule from "./utils/translate/en.message.json";
import itModule from "./utils/translate/it.message.json";

export default {
  head: {
    titleTemplate: "Brico-Casa - Deodato",
    title: "Brico-Casa - Deodato",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "Porto - Multi-purpose eCommerce Vue Template",
      },
      {
        name: "author",
        content: "d-themes",
      },
      {
        name: "keywords",
        content: "Porto Vue eCommerce Template",
      },
      {
        name: "app-mobile-web-app-title",
        content: "Porto",
      },
      {
        name: "application-name",
        content: "Porto Vue eCommerce Template",
      },
      {
        name: "msapplication-TileColor",
        content: "#cc9966",
      },
      {
        name: "msapplication-config",
        content: "/images/icons/browserconfig.xml",
      },
    ],
    link: [
      {
        rel: "dns-prefetch",
        href: "//fonts.googleapis.com",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "./images/icons/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "./images/icons/favicon.ico",
      },
      {
        rel: "shortcut icon",
        href: "./images/icons/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "./images/icons/apple-touch-icon.png",
      },
      {
        rel: "mask-icon",
        color: "#666666",
        href: "./images/icons/safari-pinned-tab.svg",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700%7CPoppins:300,400,500,600,700",
      },
    ],
  },

  css: [
    "swiper/dist/css/swiper.css",
    "~/static/css/animate.min.css",
    "~/static/css/bootstrap.min.css",
    "~/static/css/porto-icons.min.css",
    "~/static/vendor/fontawesome-free/css/all.min.css",
    "~/static/vendor/simple-line-icons/css/simple-line-icons.min.css",
    "~/static/sass/style.scss",
  ],

  plugins: [
    { src: "~/plugins", ssr: false },
    { src: "~/plugins/localstorage.js", ssr: false },
    { src: "~/plugins/filters.js", ssr: false },
    { src: "~/plugins/validate.js", ssr: false },
    { src: "~/plugins/directives/animate.js", ssr: false },
    { src: "~/plugins/directives/parallax.js", ssr: false },
    { src: "~/plugins/directives/sticky.js", ssr: false },
    { src: "~/plugins/directives/click-outside.js", ssr: false },
  ],

  buildModules: [
    "@nuxtjs/style-resources",
    "@nuxt/image",
    "nuxt-i18n",
    '@nuxtjs/dotenv'
  ],

  modules: ["@nuxtjs/axios"],

  router: {
    base: "/",
    linkActiveClass: "",
    linkExactActiveClass: "active",
  },

  build: {
    publicPath: "localhost",
  },

  image: {
    domains: ["localhost"],
  },

  generate: {
    subFolders: false,
    fallback: "404.html",
  },

  ssr: false,
  loading: false,
  loadingIndicator: false,

  pageTransition: "page",

  server: {
    port: 4000,
    host: "0.0.0.0",
  },
  i18n: {
    locales: ["en", "it"],
    defaultLocale: "it",
    vueI18n: {
      fallbackLocale: "it",
      messages: {
        en: enModule,
        it: itModule,
      },
    },
    silentTranslationWarn: false,
  },
  env: {
    VUE_APP_BASE_URL:
      process.env.VUE_APP_BASE_URL || 'http://localhost:8000/api/',
    VUE_APP_BASE_URL_CMS:
      process.env.VUE_APP_BASE_URL_CMS || 'http://localhost:3000',
    API_URL:
      process.env.API_URL || 'http://localhost:8000/api/',
    API_RESOURCE:
      process.env.API_RESOURCE || 'https://cms.omnicommerce.cloud',
    APPLICATION_TOKEN:
      process.env.APPLICATION_TOKEN || 'APPLICATION_TOKEN',
  }
};
