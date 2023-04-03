require("dotenv").config();
export default defineNuxtConfig({
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css",
      },
    ],
  },
  modules: [
    ["@storyblok/nuxt", { accessToken: process.env.STORYBLOK_ACCESS_TOKEN }],
    "@nuxtjs/google-fonts",
  ],
  build: {
    loaders: {
      scss: { implementation: require("sass") },
    },
  },
  vue: {
    config: {
      devtools: true,
    },
  },
  css: [
    "bootstrap/dist/css/bootstrap.css",
    "@/assets/style/global.scss",
    "@/assets/style/utilities.scss",
  ],
  googleFonts: {
    families: {
      Quicksand: {
        wght: [300, 400, 500, 600],
      },
      "Open+Sans": true,
    },
  },
  plugins: [{ src: "~/plugins/bootstrap.js", mode: "client" },
  { src: '~/plugins/firebase.js', mode: 'client' }],
});
