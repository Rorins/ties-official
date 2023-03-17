<template>
    <div v-editable="blok">
    <div class="container">
        <img :src=blok.image.filename :alt="blok.headline" />
        <p class="text-lg">{{ blok.text}}</p>
    </div>
    </div>
  </template>
     
  <script setup>
    defineProps({ blok: Object })
  </script>
  
  
  <style scoped lang='scss'>
  .container{
    text-align:center;
    padding:80px 0;
    img{
    width: 200px;
  }
  }
  </style>