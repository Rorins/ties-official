<template>
    <div v-editable="blok">
        <div class="private_profile bg_colorlight">
        <div class="profile bg_colordark">
            <div class="img_box">
                <img :src="blok.img?.filename" :alt="blok.img?.alt" />
            </div>
        <div>
            <h2>
                {{blok.text}}
            </h2>
        </div>
        </div>

        <div class="dashboard bg_colordark">
            <h1>
                {{blok.headline}}
            </h1>
            <StoryblokComponent
            v-for="blok in blok.fields"
            :key="blok._uid"
            :blok="blok"
            />
            
            
        </div>
        </div>
    </div>
  </template>
  
  <script setup>
  defineProps({ blok: Object });
  </script>
  
<style scoped lang="scss">
.private_profile{
    display:flex;
    justify-content:space-around;
    padding:100px;
    .profile{
    border-radius:20px;
    width:300px;
    height:400px;
    padding:50px;
    text-align:center;

    .img_box{
        width:200px;
        height:200px;
        border-radius:50%;
        background-color:white;
        img{
            width:100%;
            height:100%;
            object-fit:cover;
            border-radius:inherit;
        }
    }
}
.dashboard{
    width:800px;
    height:800px;
    border-radius:20px;
    padding:50px;
    
}
}
</style>