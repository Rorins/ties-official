<template>
  <div v-editable="blok">
  <h3 class="text-lg">{{ blok.headline }}</h3>
  <img :src=blok.image.filename :alt="blok.headline" />
  <p class="text-lg">{{ blok.description}}</p>
  </div>
</template>
   
<script setup>
  defineProps({ blok: Object })
</script>


<style scoped lang='scss'>
h3{
  font-weight:300;
}
  img{
  width: 200px;
}
</style>