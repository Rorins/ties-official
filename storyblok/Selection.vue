<template>
    <section class="d-flex justify-content-center bg_colorlight">
          <div class="user-info bg_colordark text-center" >
          <div>
            <span>We sent you a verification link! Don't forget to check your email.</span>
          </div>
          <h1>{{blok.title}}</h1>
          <h3>{{blok.undertitle}}</h3>
            <div class="selected-avatar center" >
              <img
                  :src="currentUrl"
                  alt="avatar"
                />
              </div>
          <input 
          v-model="userData.nickName"
           type="text" placeholder="nickname" 
           required/>
  
          <h4>Scroll our avatars and pick an icon you think suits you better</h4>

          <div class="swiper-container" ref="swiper">
          <Swiper v-bind="swiperOptions">
            <SwiperSlide 
             v-for="(blok, index) in blok.avatars"
            >
            <StoryblokComponent
            :key="blok._uid"
            :blok="blok"
            @click="setAvatar(blok.img?.filename)" />
            </SwiperSlide>
          </Swiper>
        </div>

          <h5>Click here when you're all set</h5>
          <button 
          type="button"
           class="btn btn-outline-light btn btn-dark"
           @click="handleSubmit($event)">
            Continue
          </button>
  
  
        </div>
    </section>
  </template>
  
  <script setup>
  import { Swiper, SwiperSlide} from 'swiper/vue';
  import 'swiper/css';
  const props = defineProps({ blok: Object });

  //CAROUSEL SETTINGS
    
  const swiperOptions = {
  pagination: false,
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  focusOnSelect: true,
  speed: 500,
};


  const currentUrl = ref(props.blok.img?.filename);
  const setAvatar = (avatarUrl) => {
  currentUrl.value = avatarUrl;
  }

  //store data in database
  const {updateUserData, error } = useDatabase()
  const { currentUser} = useAuth();
  const userData = {
      nickName: "",
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
      try{
        //id
        const {uid} = currentUser.value;
          //Update data object to send
          console.log("updated Data", userData)
          await updateUserData(uid, userData);
        console.log("User data updated successfully");
      }catch(err){
        console.log(err)
      }
  }
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
    img{
      width:100%;
      height:100%;
      object-fit: cover;
      border-radius:inherit;
    }
  }

  .swiper-slide{
    img {
    width: 100%;
    height: 100%;
  }
  }
 
  </style>