<template>
  <div class="bg_colorlight" v-editable="blok">
    <div class="container centered_column">
      <img class="icon" :src="blok.image.filename" :alt="blok.headline" />
      <p class="text-lg">{{ blok.text }}</p>
      <button
        type="button"
        class="btn btn-outline-light"
        v-html="button"
      ></button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object });
const button = computed(() => renderRichText(props.blok.button));
</script>

<style lang="scss">
.centered_column {
  text-align: center;
  padding: 80px 0;
  .icon {
    width: 200px;
  }
  //Button style
  button {
    background-color: black;
    &:hover a {
      color: black;
    }
    p {
      margin: 2px auto;
      width:100%;
        height:100%;
      a {
        text-decoration: none;
        color: white;
      }
    }
  }
}
</style>
