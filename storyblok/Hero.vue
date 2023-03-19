<template>
    <section>
      <div v-editable="blok">
        <div class="hero">
        <div class="container-fluid">
          <div class="row h_600 bg">
            <div :style="{ backgroundImage: `url(${blok.banner.filename})` }" class="hero-image col-12 col-lg-6"></div>
            <div
              class="
                col-lg-6
                col-12 
                bg_colorlight
                d-flex
                align-items-center
                text-center
              "
            >
              <p class="p_20">
                {{blok.quote}}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  </template>
  
  <script setup>
  defineProps({ blok: Object })
  </script>
  
  <style scoped lang='scss'>
  /*HERO*/
  .hero {
    padding-top: 20px;
    p{
      font-size: 30px;
    }
  }
  .hero-image {
    /* background-image: `url(${blok.banner.filename})` */
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

   //Added mediaquery
   @media screen and (max-width:991px){
    .hero-image{
    height:400px
   }
    }
  
  </style>