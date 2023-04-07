<template>
  <section v-editable="blok" class="headline bg_colorlight">
    <h1>{{ blok.title }}</h1>
    <h2>{{ blok.description }}</h2>
  </section>
</template>

<script setup>
defineProps({ blok: Object });
</script>

<style scoped lang="scss">
.headline {
  margin-top: 70px;
  text-align: center;
  padding: 60px;
}
</style>
