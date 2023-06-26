<template>
  <div v-editable="blok">
    <h2>
      {{ blok.headline }}
    </h2>
    <p>
      {{ blok.description }}
    </p>
  </div>
</template>

<script setup>
defineProps({ blok: Object });
</script>
