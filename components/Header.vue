<template>
  <header>
    <nav class="navbar fixed-top navbar-expand-lg bg-light">
      <div class="container-fluid">
        <nuxt-link class="navbar-brand" to="/"
          ><img src="~/assets/logo.png" alt="Ties"
        /></nuxt-link>
        <button
          @click="toggleMenu"
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse"
          :class="{ 'full-page': isActive }"
          id="navbarSupportedContent"
        >
          <div class="navbar-nav me-auto mb-2 mb-lg-0"></div>
          <div>
            <ul class="navbar-nav">

               <!-- Profile -->
              <li @click="toggleAccountMenu" v-if="currentUser" class="account nav-item active">
                  <button class="btn">
                  Account
                </button>
              </li>


                <!-- Account menu -->
                <div v-if="showAccountMenu && currentUser" class="account_menu">
                <nuxt-link to="/dashboard">
                  <button class="btn">
                  Dashboard
                </button>
                </nuxt-link>

                <button class="btn" @click="handleLogout">
                  Sign-out
                </button>
              </div>
              
               <!-- Profile mobile -->
               <nuxt-link v-if="currentUser" class="profile nav-link" to="/dashboard">
                <li class=" nav-item active">
                Profile
                </li>
               </nuxt-link>


              <li>
                <!--TO SUBSCRIBE-->
                <nuxt-link v-if="!currentUser" class="nav-link" to="/sign-up"
                  >Get started</nuxt-link
                >
              </li>
              <!--TO HOME-->
              <li class="nav-item active">
                <nuxt-link class="nav-link" to="/">Home</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/listeners"
                  >Listeners</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/blog">Blog</nuxt-link>
              </li>
              <li class="nav-item active">
                <nuxt-link class="nav-link" to="/about-us">About us</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "~/composables/useAuth";

//Functions firebase for authentication
const {currentUser, logoutUser, error } = useAuth();
const router = useRouter();

const menuOpen = ref(false);
let isActive = ref(false);
const showAccountMenu = ref(false);

function toggleMenu() {
  isActive.value = !isActive.value;
  menuOpen.value = !menuOpen.value;
  document.body.style.overflow = menuOpen.value ? "hidden" : "auto";
}

function toggleAccountMenu() {
  showAccountMenu.value = !showAccountMenu.value
}

//logout
const handleLogout = async () => {
  await logoutUser();
  if (!error.value) {
    router.push("/");
  }
};

//Close account menu div when clicking outside 
onMounted(() => {
  document.addEventListener("click", closeAccountMenu);
});

function closeAccountMenu(event) {
  const target = event.target;
  const accountButton = document.querySelector(".account");
  const accountMenu = document.querySelector(".account_menu");

  if (accountButton && accountMenu && !accountButton.contains(target) && !accountMenu.contains(target) && showAccountMenu.value) {
    showAccountMenu.value = false;
  }
}
</script>

<style scoped lang="scss">
/*NAVBAR*/
.navbar {
  background-color: #ebe2db !important;
  a{
    text-decoration:none;
  }
  img {
    height: 50px;
  }
  .btn{
      color:white;
      background-color:black;
      border-radius:20px;
      &:hover{
        color:black;
        background-color:white;
      }
    }
  .user {
    background-color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 20px;
    position:relative;
    cursor:pointer;
    &:hover{
      filter: grayscale(20%);
    }
    //Mediaquery for full page toggle
  @media screen and (max-width: 991px) {
    &{
      display:none;
    }
    }   
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
  }
  .account_menu{
    background-color:white;
    border-radius:20px;
    display:flex;
    flex-direction:column;
    padding:20px;
    position:absolute;
    top:70px;
    a, button{
      margin:5px 0;
    }
  }
  .account{
    @media screen and (max-width: 991px) {
    &{
      display:none;
    }
    }
  }
  .profile{
    display:none;
    @media screen and (max-width: 991px) {
    &{
      display:block;
    }
    }
  }
}
.right_nav li {
  padding: 0 10px;
}

//Mediaquery for full page toggle
@media screen and (max-width: 991px) {
  .full-page {
    height: 100vh;
    text-align: center;
    margin: 50px auto;
    font-size: 60px;
  }
}
</style>
