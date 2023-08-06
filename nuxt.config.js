require("dotenv").config();
export default defineNuxtConfig({
  ssr: true,
  target: "server",
  head: {
    title: "Ties",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "Mental health site",
        name: "Ties",
        content:
          "Ties helps you with your mental health by letting you chat to kind listeners",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
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
  axios: {
    proxy: true, 
  },
  router: {
    middleware: ["auth"],
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
