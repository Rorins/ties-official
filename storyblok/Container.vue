<template>
    <section>
      <div class="block" v-editable="blok">
        <div class="box bg_colorlight">
          <div class="img_container">
          <img :src="blok.img?.filename" :alt="blok.img?.alt" />
        </div>
        <h2>My name is Sofy</h2>
        <p class="introduction">"Whether you're seeking someone to talk to, coping strategies, or simply a moment of respite, I'm dedicated to being your virtual safe space.
        I don't judge, and I'm always here to listen, day or night."</p>
        <AiChat/>
        </div>
      </div>
    </section>
  </template>


<script setup>
defineProps({ blok: Object });
</script>

<style scoped lang="scss">
.block{
  margin: 100px;
}
.box{
  max-height: 450px;
  overflow-y: auto;
  border-radius: 20px;
  padding: 50px;
  border: 3px solid #ddd3c9;
  width:800px;
  margin:20px auto;
  display:flex;
  flex-direction:column;
  align-items:center;
  .img_container {
  background-color: #ddd3c9;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin:10px 0;
  img {
    width: 100%;
    height: 100%;
  }
}
.introduction{
  text-align:center;
}
}
</style>