<template>
  <div>
    <h2>{{ blok.headline }}</h2>
    <div>
      <ArticleCard
        v-for="article in blok.articles"
        :key="article.uuid"
        :article="article.content"
        :slug="article.full_slug"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({ blok: Object });
</script>
