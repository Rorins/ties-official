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
              <li @click="handleLogout" class="user">
                <img src="~/assets/fox.png" alt="Fox" />
              </li>
              <li @click="handleLogout" class="profile nav-item active">
                Profile
              </li>
              <li>
                <!--TO SUBSCRIBE-->
                <nuxt-link class="nav-link" to="/sign-up"
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

//Functions firebase for authentication
const { logoutUser, error } = useAuth();
const router = useRouter();

const menuOpen = ref(false);
let isActive = ref(false);

function toggleMenu() {
  isActive.value = !isActive.value;
  menuOpen.value = !menuOpen.value;
  document.body.style.overflow = menuOpen.value ? "hidden" : "auto";
}

//logout
const handleLogout = async () => {
  await logoutUser();
  if (!error.value) {
    router.push("/");
  }
};
</script>

<style scoped lang="scss">
/*NAVBAR*/
.navbar {
  background-color: #ebe2db !important;
  img {
    height: 50px;
  }
  .user {
    background-color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 20px;
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
    margin: 100px auto;
    font-size: 60px;
  }
}
</style>
