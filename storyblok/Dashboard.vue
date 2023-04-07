<template>
    <div v-editable="blok">
        <div class="private_profile">
        <div class="profile bg_colordark">
            <div class="img_box">
                <img src="image" alt="image" />
            </div>
        <div>
            <h2>
                Profile nickname
            </h2>
        </div>
        </div>

        <div class="dashboard bg_colordark">
            <h1>
                Profile
            </h1>
            <h2>
                Why are you here?
            </h2>
            <div class="tags">
                <div class="tag">
                    <h3>
                        Depression
                    </h3>
                </div>
            </div>
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
    justify-content:center;
    .profile{
    border-radius:20px;
    width:300px;
    height:400px;

    .img_box{
        width:200px;
        height:200px;
        border-radius:50%;
        background-color:black;
    }
}
.dashboard{
    width:800px;
    height:800px;
    border-radius:20px;
}
}
</style>