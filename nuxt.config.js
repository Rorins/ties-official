require('dotenv').config()
export default defineNuxtConfig({
    modules: [['@storyblok/nuxt', { accessToken: process.env.STORYBLOK_ACCESS_TOKEN  }],'@nuxtjs/google-fonts'],
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
       'bootstrap/dist/css/bootstrap.css',
        '@/assets/style/global.scss',
        '@/assets/style/utilities.scss',
      ],
      googleFonts: {
        families: {
          Quicksand: {
            wght: [300,400,500,600]
          },
          'Open+Sans': true
        }
      },
      plugins: [
        { src: '~/plugins/bootstrap.js', mode: 'client' }
      ]
      
}
)
