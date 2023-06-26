<template>
  <section class="prompt bg_colorlight">
    <div class="container">
      <img src="~/assets/sent.png" />
      <h1>
        Your chat has been deleted, click here to get back to the dashboard or
        home.
      </h1>
      <button class="btn-outline-light btn btn-dark" @click="redirect">
        Back
      </button>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const { currentUser } = useAuth();

const redirect = () => {
  if (currentUser.value) {
    router.push("/dashboard");
  } else {
    router.push("/");
  }
};
</script>

<style scoped lang="scss">
.prompt {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 400px;
    }
    .btn {
      margin-top: 20px;
    }
  }
}
</style>
