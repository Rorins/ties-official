<template>
    <div v-editable="blok">
        <div class="container-fluid bg_colorlight">

        <div class="private_profile">
        <div class="row">
        <div class="profile col-4">
        <div class="avatar_box bg_colordark">
            <div class="user_img_box">
                <img :src="userData ? userData.currentImgUrl : blok.img?.filename" :alt="blok.img?.alt" />
            </div>
        <div>
            <h2>
                {{ userData ? userData.nickName : 'Loading...' }}
            </h2>
            <div class="btn_box">
                <button class=" btn-outline-light btn btn-dark">
                    Change your info
                </button>
            </div>

        </div>

        </div>
        

        <div class="chat_box  bg_colordark">
            <div class="img_box">
                <img :src="blok.box?.filename" :alt="blok.box?.alt" />
            </div>

            <div>
           <h3>
            When you are ready join the chat!
           </h3>
            </div>
        </div>
      </div>

        <div class="dashboard bg_colordark col-8">
            <h1>
                Hello, {{ userData ? userData.nickName : 'Loading...'  }}. This is your dashboard.
            </h1>
            <div class="input-section">
            <h2>
                Tell us what brought you here.
            </h2>
            <h3>
                <label for="about-you">
                This will help listeners understand the best way to help.
                </label>
            </h3>
            <textarea id="about-you" name="about-you" placeholder="Remember! Do not share any personal info that can help in identifying you: city, address, real name etc" required></textarea>
            </div>

            <div class="input-section">
            <h2>
                Tell us anything that may be triggering to you.
            </h2>
            <h3>
                <label for="triggers">
                Listeners will avoid these subjects.
                </label>
            </h3>
            <textarea id="triggers" name="triggers" placeholder="We will avoid any discussion of religion and politics by default" required></textarea>
            </div>

            
        </div>
        </div>
    </div>
        </div>
    </div>
  </template>
  
  <script setup>
  defineProps({ blok: Object });
  
  const { currentUser, error } = useAuth();
  const {getUserData} = useDatabase();
  const userData = ref(null);

  onMounted(async () => {
    //id
    try {
        const {uid} = currentUser.value;
        const data = await getUserData(uid);
        userData.value = data;
        console.log("returned data",userData.value)
        }
    catch (err) {
        console.log(err.message);
    }
  });
  
  </script>
  
<style scoped lang="scss">
.private_profile{
    display:flex;
    justify-content: center;
    padding:100px 0;
    .avatar_box{
    border-radius:20px;
    width:300px;
    height:fit-content;
    padding:50px;
    text-align:center;

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
    
}
}
</style>