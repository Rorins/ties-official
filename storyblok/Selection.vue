<template>
    <section class="d-flex justify-content-center bg_colorlight">
          <div class="user-info bg_colordark text-center" >
          <div>
            <span>We sent you a verification link! Don't forget to check your email.</span>
          </div>
          <h1>{{blok.title}}</h1>
          <h3>{{blok.undertitle}}</h3>
            <div class="selected-avatar center" >
              <!-- <img
                  
                  alt=""
                /> -->
              </div>
          <input type="text" placeholder="Nickname" />
  
          <h4>Pick an avatar icon you think suits you better</h4>
          <h5>Click here when you're all set</h5>
          <button type="button" class="btn btn-outline-light btn btn-dark">
            Continue
          </button>
  
  
        </div>
    </section>
  </template>
  
  <script setup>
  defineProps({ blok: Object });
  </script>
  
  <style scoped lang='scss'>
  /*SECTION*/
  .user-info {
    margin: 100px 0;
    width: 70%;
    border: 3px solid #ddd3c9;
    border-radius: 20px;
    padding: 40px 50px;
  }
  .user-info h4 {
    padding: 20px;
  }

 input{
    border:0;
    background:white;
    padding:10px;
    border-radius: 10px;
 }
  
  /*AVATAR AND CAROUSEL*/
  
  .selected-avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: white;
    margin: 20px auto;
  }
 
  </style>