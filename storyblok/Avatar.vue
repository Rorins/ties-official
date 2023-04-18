<template>
    <img :src="blok.img?.filename" :alt="blok.img?.alt" />
</template>
  
  <script setup>
  defineProps({ blok: Object });
  </script>
  
  <style scoped lang="scss">
 
  </style>