<template>
  <div class="listener_card">
    <div class="img_container">
      <img :src="img" alt="name" />
    </div>
    <div class="about">
      <h2>
        {{ name }}
      </h2>
      <p>
        {{ description }}
      </p>
      <h3>
        {{ quote }}
      </h3>
    </div>
  </div>
</template>

<script setup>
defineProps({
  img: String,
  name: String,
  description: String,
  quote: String,
});
</script>

<style scoped lang="scss">
.listener_card {
  display: flex;
  margin: 80px 0;
  .img_container {
    width:50%;
    max-height: 200px;
    border-radius: 50%;
    background-color: white;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
  }
}
.about {
  margin-left: 20px;
  h3 {
    font-weight: 400;
  }
}
</style>
