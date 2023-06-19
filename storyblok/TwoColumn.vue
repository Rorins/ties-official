<template>
  <section
    v-editable="blok"
    class="two_column bg_colorlight"
    :class="{ bg_colordark: useBackground }"
  >
    <div class="container">
      <div class="row">
        <div
          class="col-12 col-sm-12 col-xl-6 first_column"
          v-html="richtext"
        ></div>
        <div
          class="col-12 col-sm-12 col-xl-6 second_column"
          v-html="asset"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  blok: Object,
});

const richtext = computed(() => renderRichText(props.blok.description));
const asset = computed(() => renderRichText(props.blok.asset));
const useBackground = computed(() => props.blok.useBackground);
</script>

<style lang="scss">
.two_column {
  padding: 80px 0;
  .medium-width{
    display:block;
    text-align:center;
  }
  .second_column h2,
  .first_column h2 {
    font-weight: 400;
    margin: 30px 0px;
  }
  .second_column h2:nth-child(5),
  .first_column h2:nth-child(3) {
    text-align: right;
  }
  //medium image
  .first_column .medium-width img,
  .second_column .medium-width img {
    width: 50%;
  }
  //regular big image
  .first_column img,
  .second_column img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  //Added mediaquery
  @media screen and (max-width: 580px) {
    .first_column .medium-width img,
    .second_column .medium-width img {
      width: 50%;
    }
  }
}
</style>
