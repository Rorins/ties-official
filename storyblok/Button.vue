<template>
  <a v-editable="blok" :href="blok.link.cached_url">
    <button type="button" class="btn">
      <h3>{{ blok.text }}</h3>
      <img  
            class="icon"
            v-if="blok.icon?.filename"
            :src="blok.icon.filename"
            :alt="blok.icon.alt"
          />
    </button>
  </a>
</template>

<script setup>
defineProps({ blok: Object });
</script>

<style scoped lang="scss">
a {
  width: 280px;
  margin-bottom: 20px;
  .btn {
    width: inherit;
    background-color: black;
    color: white;
    padding: 10px;
    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
    }
    h3 {
      font-size: 20px;
      margin: 0;
      display:inline-block;
    }
    .icon{
      width:30px;
      margin:0 10px;
    }
  }
}
</style>
