<template>
    <section class="d-flex justify-content-center bg_colorlight">
          <div class="user-info bg_colordark text-center" >
          <div v-if="currentUser && !currentUser.emailVerified">
            <span>We sent you a verification link! Don't forget to check your email.</span>
          </div>
          <h1>{{blok.title}}</h1>
          <h3>{{blok.undertitle}}</h3>
            <div class="selected-avatar center" >
              <img
                  :src="currentImg"
                  alt="avatar"
                />
              </div>
          <input 
           v-model="userData.nickName"
           type="text" placeholder="nickname" 
           required/>

           <div v-if="validationPrompt" class="validation_box">
           <span>Please insert a nickname</span>
          </div>
  
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
  import { useRouter } from "vue-router";
  const props = defineProps({ blok: Object });

  //CAROUSEL SETTINGS
    
  const swiperOptions = {
    breakpoints: {       
      1372: {       
         slidesPerView: 5,
         spaceBetween: 10     
      },          
      1090: {       
         slidesPerView: 4,       
         spaceBetween: 50     
      },
      800: {       
         slidesPerView: 3,       
         spaceBetween: 20    
      },
      604: {       
         slidesPerView: 2,       
         spaceBetween: 10    
      },
      200: {       
         slidesPerView: 1,       
         spaceBetween: 10    
      }
    },
  pagination: false,
  centeredSlides: true,
  slidesPerView: 5,
  spaceBetween: 10,
  loop: true,
  focusOnSelect: true,
  speed: 500,
};

  const router = useRouter();
  const currentImg = ref(props.blok.img?.filename);
  const setAvatar = (avatarUrl) => {
  currentImg.value = avatarUrl;
  userData.currentImgUrl = avatarUrl;
  console.log(userData.currentImgUrl)
  }

  //store data in database
  const {updateUserData, error } = useDatabase()
  const { currentUser, updateUserProfile} = useAuth();
  const validationPrompt = ref(false);
  const userData = {
      nickName: "",
      currentImgUrl: null,
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userData.nickName) {
    validationPrompt.value = true
    return
   }
      try{
        //id
        const {uid} = currentUser.value;
          //Update data object to send
          console.log("updated Data", userData)
          await updateUserData(uid, userData);
          await updateUserProfile(userData.nickName, userData.currentImgUrl)
        console.log("User data updated successfully");
        if(!error.value){
        router.push("/dashboard");
       }
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
 .validation_box span{
  color:red;
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
  
  .swiper-container{
    margin:20px 0;
  }

 
  </style>
