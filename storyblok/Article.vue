<template>
  <section class="article bg_colorlight">
    <div v-editable="blok">
      <div class="container">
        <div class="img_container">
          <img
            v-if="blok.image?.filename"
            :src="blok.image.filename + '/m/1600x0'"
            :alt="blok.image.alt"
          />
        </div>
        <div class="paragraph">
          <h1>{{ blok.title }}</h1>
          <h2>
            {{ blok.subtitle }}
          </h2>
          <div v-html="article"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ blok: Object });
const article = computed(() => renderRichText(props.blok.paragraph));
</script>

<style scoped lang="scss">
.article {
  padding-top: 100px;
  .img_container {
    width: 100%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .paragraph {
    h1 {
      margin: 100px;
      text-align: center;
    }
  }
}
</style>
