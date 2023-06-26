<template>
  <div class="img_container">
    <img :src="blok.img?.filename" :alt="blok.img?.alt" />
  </div>
</template>

<script setup>
defineProps({ blok: Object });
</script>

<style scoped lang="scss">
.img_container {
  background-color: white;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
