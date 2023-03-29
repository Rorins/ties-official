<template>
  <div class="bg_colorlight" v-editable="blok">
    <div class="container centered_column">
      <img class="icon" :src="blok.image.filename" :alt="blok.headline" />
      <p>{{ blok.text }}</p>
      <StoryblokComponent
        v-if="blok.button.length > 0"
        :blok="blok.button[0]"
        :key="blok._uid"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object });
const button = computed(() => renderRichText(props.blok.button));
</script>

<style scoped lang="scss">
.centered_column {
  text-align: center;
  padding: 80px 0;
  .icon {
    width: 200px;
  }
}
</style>
