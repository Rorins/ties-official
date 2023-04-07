require("dotenv").config();
export default defineNuxtConfig({
  head: {
    link: [
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
  server: {       
    host: '0', // default: localhost   
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
  plugins: [
    { src: "~/plugins/bootstrap.js", mode: "client" },
    { src: "~/plugins/firebase.js", mode: "client" },
  ],
});
