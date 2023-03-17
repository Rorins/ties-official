<template>
    <section>
      <div v-editable="blok">
        <div class="hero">
        <div class="container-fluid">
          <div class="row h_600 bg">
            <div :style="{ backgroundImage: `url(${blok.banner.filename})` }" class="hero-image col-12 col-md-7"></div>
            <div
              class="
                col-12 col-md-5
                bg_colorlight
                d-flex
                align-items-center
                text-center
              "
            >
              <p>
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
  
  </style>