<template>
     <div v-editable="blok">
    <div class="container-fluid bg_colorlight">
      <div class="private_profile">
        <div class="row">
          <div class="profile col-12 col-lg-4">
            <!-- Avatar Box -->
            <div class="avatar_box bg_colordark">
              <div class="user_img_box">
                <img :src="userData ? userData.currentImgUrl : blok.img?.filename" :alt="blok.img?.alt" />
              </div>
              <div>
                <h2>{{ userData ? userData.nickName : 'Loading...' }}</h2>
                <div class="btn_box">
                  <button @click="updateInfo" class="btn-outline-light btn btn-dark">
                    Change your info
                  </button>
                </div>
              </div>
            </div>

            <!-- Chat Box -->
            <div class="chat_box bg_colordark">
              <div class="img_box">
                <img :src="blok.box?.filename" :alt="blok.box?.alt" />
              </div>
              <div>
                <h3>When you are ready, join the chat!</h3>
              </div>
              <!-- Chat -->
              <div class="chat">
                <button class="btn-outline-light btn btn-dark"  @click="openChat">
                    Join chat
                </button>
              </div>
            </div>
          </div>

          <div class="dashboard bg_colordark col-12 col-lg-8">
            <div>
              <h1>Hello, {{ userData ? userData.nickName : 'Loading...' }}. This is your dashboard.</h1>

              <!-- Input Sections or User's Information -->
              <section v-if="userData && (showInputSection || (!userData.about && !userData.triggers))">
                <div class="input-section">
                  <h2>Tell us what brought you here.</h2>
                  <h3>
                    <label for="about-you">This will help listeners understand the best way to help.</label>
                  </h3>
                  <textarea v-model="dataToSend.about" id="about" name="about" placeholder="Remember! Do not share any personal info that can help in identifying you: city, address, real name etc" required></textarea>
                </div>

                <div class="input-section">
                  <h2>Tell us anything that may be triggering to you.</h2>
                  <h3>
                    <label for="triggers">Listeners will avoid these subjects.</label>
                  </h3>
                  <textarea v-model="dataToSend.triggers" id="triggers" name="triggers" placeholder="We will avoid any discussion of religion and politics by default" required></textarea>
                </div>

                <div class="submit-section">
                  <button  class="btn-outline-light btn btn-dark" @click="submitData">Submit</button>
                </div>
              </section>

              <!-- User's Information -->
              <div className="updated_info" v-else-if="userData">
                <div className="updated_section">
                  <h2>About you</h2>
                <p>{{ userData.about }}</p>
                </div>
                <div className="updated_section">
                  <h2>Your triggers</h2>
                <p>{{ userData.triggers }}</p>
                </div>
              </div>

              <!-- Loading message -->
              <div v-else>
                <p>Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  defineProps({ blok: Object });

  const { currentUser, error } = useAuth();
const { getUserData, updateUserData } = useDatabase();
const userData = ref(null);
const showInputSection = ref(false);
const dataToSend = {
  about: null,
  triggers: null,
};

onMounted(async () => {
  try {
    const { uid } = currentUser.value;
    const data = await getUserData(uid);
    userData.value = data;
    showInputSection.value = !data.about && !data.triggers; // showInput trigger only if the two fields are empty, false
  } catch (err) {
    console.log(err.message);
  }
});

const submitData = async () => {
  try {
    const { uid } = currentUser.value;
    await updateUserData(uid, dataToSend);
    userData.value.about = dataToSend.about; 
    userData.value.triggers = dataToSend.triggers;
    showInputSection.value = false; 
  } catch (err) {
    console.log(err.message);
  }
};

const openChat = () => {
};

const updateInfo = () => {
  showInputSection.value = true;
};
  
  </script>
  
<style scoped lang="scss">
.private_profile{
    display:flex;
    justify-content: center;
    padding:100px 0;
    .profile{
      @media screen and (max-width: 991px)  {
        display:flex;
        justify-content: space-around;
        div{
          margin:0 auto,
        }
      }
      @media screen and (max-width: 678px)  {
       display:block;
      }
    }
    .avatar_box{
    border-radius:20px;
    width:300px;
    height:fit-content;
    padding:50px;
    text-align:center;
    border: 3px solid #ddd3c9;

    .user_img_box{
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
.chat_box{
    border-radius:20px;
    width:300px;
    height:fit-content;
    padding:50px;
    text-align:center;
    margin-top:20px;
    cursor:pointer;
    border: 3px solid #ddd3c9;
    .img_box{
        width:200px;
        height:200px;
        margin-bottom:20px;
        img{
            width:100%;
            height:100%;
            object-fit:cover;
        }
    }
    h3{
        font-size:25px;
    }
   
}
.dashboard{
    height:fit-content;
    border-radius:20px;
    padding:50px;
    border: 3px solid #ddd3c9;
    @media screen and (max-width: 991px){
      margin-top:50px;
    }
    .input-section{
        margin:50px 0;
        h3{
        font-size:20px;
    }
    textarea{
        border-radius: 20px;
        padding:10px;
        width:500px;
        height:200px;
    }
    }
    .updated_info{
      margin:50px 0;
      .updated_section{
        margin:50px 0;
      }
    }
}
}
</style>