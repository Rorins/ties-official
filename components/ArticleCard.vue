<template>
  <NuxtLink class="link" :to="'/' + slug" v-editable="article">
    <div class="article_card">
      <div class="img_container">
        <img
          :src="article.image.filename + '/m/600x0'"
          :alt="article.image.alt"
        />
      </div>
      <div class="title">
        <h2>
          {{ article.title }}
        </h2>
        <!-- <div >
          {{ article.teaser }}
        </div> -->
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({ article: Object, slug: String });
</script>

<style scoped lang="scss">
.link {
  text-decoration: none;
  color: black;
  width: 400px;
  min-height: 400px;
  margin:10px;
}
.article_card {
  height: 100%;
  width: 100%;
  border-radius: 20px;
  padding: 15px;
  background-color: #efeae6;
  .article_card:hover {
    box-shadow: black;
  }
  .img_container {
    width: 100%;
    height: 50%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
  }
  .title {
    text-align: center;
    margin: 20px auto;
  }
}
</style>
