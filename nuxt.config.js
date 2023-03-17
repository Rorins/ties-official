// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [['@storyblok/nuxt', { accessToken: 'CfLCSCTxmfFxPSM42WY5Awtt' }],'@nuxtjs/google-fonts'],
    build: {
      loaders: {
        scss: { implementation: require('sass') }
      }
    },
    vue:{
      config:{
        devtools:true
      }
    },
    css: [
        '~/node_modules/bootstrap/dist/css/bootstrap.css',
        '@/assets/style/global.scss',
        '@/assets/style/utilities.scss',
      ],
      googleFonts: {
        families: {
          Quicksand: true,
          'Open+Sans': true
        }
      },
      plugins: [
        { src: 'bootstrap/dist/js/bootstrap.js', mode: 'client' }
      ]
      
}
)
