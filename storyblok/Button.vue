<template>
  <a v-editable="blok" :href="blok.link.cached_url">
    <button type="button" class="btn-outline-light btn btn-dark">
      <h3>{{ blok.text }}</h3>
      <img
        class="icon"
        v-if="blok.icon?.filename"
        :src="blok.icon?.filename"
        :alt="blok.icon?.alt"
      />
    </button>
  </a>
</template>

<script setup>
defineProps({ blok: Object });
</script>

<style scoped lang="scss">
a {
    h3 {
      font-size: 20px;
      margin: 0;
      display: inline-block;
    }
}
</style>
