<template>
  <header>
    <nav class="navbar fixed-top navbar-expand-lg bg-light">
      <div class="container-fluid">
        <nuxt-link class="navbar-brand" to="/"
          ><img src="~/assets/logo.png" alt="Ties"
        /></nuxt-link>
        <button
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
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class="navbar-nav me-auto mb-2 mb-lg-0"></div>
          <div>
            <ul class="navbar-nav me-auto">
              <li>
                <!--TO SUBSCRIBE-->
                <nuxt-link class="btn btn-outline-dark" to="/subscribe"
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

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/utilities.scss";

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
</style>
