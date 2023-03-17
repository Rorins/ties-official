<template>
    <header>
      <nav class="
          navbar
          fixed-top
          navbar-expand-lg navbar-light
          justify-content-between
        ">
        <div>
          <nuxt-link class="navbar-brand" to="/"><img src="~/assets/logo.png" alt="Ties" /></nuxt-link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
  
        <!--RIGHT SIDE NAVBAR-->
        <div class="right_nav">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li>
                <!--TO SUBSCRIBE-->
                <nuxt-link class="btn btn-outline-dark" to="/subscribe">Get started</nuxt-link>
              </li>
              <!--TO HOME-->
              <li class="nav-item active">
                <nuxt-link class="nav-link" to="/">Home</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/listeners">Listeners</nuxt-link>
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
        </nav>
    </header>
  </template>

<style scoped lang='scss'>
@import "@/assets/style/global.scss";
@import "@/assets/style/utilities.scss";

/*NAVBAR*/
.navbar {
  background-color: #ebe2db;
  img{
    height: 50px;
  }
}
.right_nav li {
  padding: 0 10px;
}
</style>