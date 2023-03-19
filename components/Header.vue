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
        <div class="collapse navbar-collapse" :class="{ 'full-page' : isActive }" id="navbarSupportedContent">
          <div class="navbar-nav me-auto mb-2 mb-lg-0" ></div>
          <div>
            <ul class="navbar-nav" >
              <li>
                <!--TO SUBSCRIBE-->
                <nuxt-link class="nav-link" to="/subscribe"
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
import { ref } from 'vue'

const menuOpen = ref(false)
let isActive = ref(false)

function toggleMenu() {
  isActive.value = !isActive.value
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : 'auto'
}
</script>


<style scoped lang="scss">
/*NAVBAR*/
.navbar {
  background-color: #ebe2db !important;
  img {
    height: 50px;
  }
}
.right_nav li {
  padding: 0 10px;
}


//Mediaquery for full page toggle
@media screen and (max-width: 991px) {
  .full-page{
  height:100vh;
  text-align:center;
  margin:100px auto;
  font-size:60px;
  transition: all 0.3s ease-in-out;
}

}

</style>
