<template>
    <div class="sign_page bg_colorlight" v-editable="blok">
     <div v-if="isPasswordForm" class="reset_form bg_colordark">
        <div class="img_container">
            <img :src="blok.img?.filename" :alt="blok.img?.alt" />
        </div>
        <h1>
            {{ blok.title }}
        </h1>
        <p>
            {{ blok.undertitle}}
        </p>
      
          <div class="email_input">
          <input
            v-model="email"
            type="email"
            name="email"
            id="email"
            placeholder="e-mail"
            required
          />
     </div>
     <button @click="submit">
    {{ blok.buttons[0]?.text }}
    </button>
    <h3>
        <a :href=blok.link.cached_url>
            {{ blok.linkText}}
        </a>
    </h3>
     </div>
    </div>
  </template>
  
  <script setup>
import { useRouter } from "vue-router";
import useAuth from "~/composables/useAuth";
import { ref } from "vue";

const props = defineProps({ blok: Object });
const isPasswordForm = computed(() => props.blok.isVerifyPassword);

  //Functions firebase for e-mail
const { passwordResetEmail, error} =
  useAuth();
  const email = ref("");
  const router = useRouter();

  //e-mail for password reset
const submit = async () => {
  console.log("email:", email.value);
  await passwordResetEmail(email.value);
  if (!error.value) {
    alert("Check your mail! We sent you a password reset")
  }
};
  </script>

<style scoped lang="scss">
.sign_page{
    height: 100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    .reset_form{
    width:400px;
    height:500px;
    border-radius:20px;
    padding:20px;
    text-align:center;
    & *{
        margin:6px 0;
    }
    h1{
        font-size:30px;
    }
    .img_container{
        width:100px;
        height:100px;
        margin:0 auto;
        img{
            width:100%;
            height:100%;
            object-fit: contain;
        }
    }
    input {
        width:250px;
        border: 0;
        background:white;
        border-radius:10px;
        padding:10px;
        &:focus{
          outline: none;
        }
      }
    button{
          background-color: black;
          color: white;
          border-radius: 10px;
          padding: 10px;
          margin-bottom: 10px;
          min-width: 250px;
          &:hover {
            background-color: white;
            color: black;
          }
    }
    h3{
        font-size:20px;
        a{
            text-decoration: none;
        }
    }
}
}

</style>