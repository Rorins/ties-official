<template>
  <div v-editable="blok">
    <section class="grid bg_colordark">
      <div class="container">
        <div>
          <h2 class="title">{{ blok.title }}</h2>
        </div>
        <div class="row h_300 text-center">
          <StoryblokComponent
            v-for="blok in blok.columns"
            :key="blok._uid"
            :blok="blok"
            class="col-md-4 col-12"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
defineProps({ blok: Object });
</script>

<style scoped lang="scss">
@media screen and (max-width: 400px) {
  .grid{
    padding-top:50px;
  }
}
.grid {
  padding: 80px 0;
  .container {
    div {
      text-align: center;
      h2.title {
        padding-bottom: 60px;
        font-size: 50px;
        font-weight: 300;
      }
    }
  }
}
</style>
