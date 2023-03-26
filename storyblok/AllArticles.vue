<template>
  <div class="all_articles bg_colordark">
    <div class="titles bg_colorlight">
      <h1>{{ blok.headline }}</h1>
      <h2>{{ blok.undertitle }}</h2>
    </div>

    <div class="container">
      <div class="row">
        <ArticleCard
          class="col-12 col-md-4"
          v-for="article in articles"
          :key="article.uuid"
          :article="article.content"
          :slug="article.full_slug"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ blok: Object });
const articles = ref(null);
const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  version: "draft",
  starts_with: "blog",
  is_startpage: false,
});
articles.value = data.stories;
</script>

<style scoped lang="scss">
.all_articles {
  margin-top: 70px;
  .titles {
    text-align: center;
    padding: 100px 0;
    margin-bottom: 70px;
    h2 {
      font-weight: 300;
    }
  }
  .row {
    justify-content: center;
  }

  //Mediaquery
  @media screen and (max-width: 992px) {
    .row {
      justify-content: center;
    }
  }
}
</style>
