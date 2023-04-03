<template>
  <div class="sign_page bg_colorlight" v-editable="blok">
    <!-- Sign up form -->
    <div v-if =signUp class="sign_up bg_colordark">
      <figure class="image">
        <img :src="blok.img.filename" :alt="blok.img.alt" />
      </figure>
      <aside class="form">
        <h1>{{ blok.title }}</h1>
        <div v-html="undertitle"></div>
        <div class="email">
          <div><label for="email" >E-mail</label></div>
          <input v-model="email" type="email" name="email" id="email" required/>
        </div>
        <div class="password">
          <div><label for="password">Password</label></div>
          <input v-model="password" type="password" name="password" id="password" required/>
        </div>
        <div class="btn_container">
          <button @click="registerUser">
            {{ blok.buttons[0].text }}
          </button>
          <button @click="googleSignUp">
            {{ blok.buttons[1].text }}
            <img class="google" :src="blok.buttons[1].icon.filename" :alt="blok.buttons[1].icon.filename" />
          </button>
        </div>
      </aside>
    </div>

      <!-- Sign in form -->
    <div v-if =signIn class="sign_up bg_colordark">
      <figure class="image">
        <img :src="blok.img.filename" :alt="blok.img.alt" />
      </figure>
      <aside class="form">
        <h1>{{ blok.title }}</h1>
        <div v-html="undertitle"></div>
        <div class="email">
          <div><label for="email" >E-mail</label></div>
          <input v-model="email" type="email" name="email" id="email" required/>
        </div>
        <div class="password">
          <div><label for="password">Password</label></div>
          <input v-model="password" type="password" name="password" id="password" required/>
        </div>
        <div class="btn_container">
          <button @click="submitLogin">
            {{ blok.buttons[0].text }}
          </button>
          <button @click="googleLogin">
            {{ blok.buttons[1].text }}
            <img class="google" :src="blok.buttons[1].icon.filename" :alt="blok.buttons[1].icon.filename" />
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useAuth from '~/composables/useAuth'
import { ref } from 'vue'

const props = defineProps({ blok: Object });
const undertitle = computed(() => renderRichText(props.blok.undertitle));
const signUp = computed(() => props.blok.isSignUp);
const signIn = computed(() => props.blok.isSignIn);

//Functions firebase for authentication
const { createUser, loginUser, loginWithGoogle, signUpWithGoogle, error } = useAuth()
const email = ref('')
const password = ref('')
const router = useRouter()

//sign-in sign-up
const registerUser = async () => {
  console.log('email:', email.value, 'password:', password.value)
  await createUser(email.value, password.value)
  if (!error.value) {
    router.push('/')
  }
}

const submitLogin = async () => {
  console.log('email:', email.value, 'password:', password.value)
  await loginUser(email.value, password.value)
  if (!error.value) {
    router.push('/')
  }
}

//Google
const googleLogin = async () => {
  await loginWithGoogle()
  if (!error.value) {
    router.push('/')
  }
}

const googleSignUp = async () => {
  await signUpWithGoogle()
  if (!error.value) {
    router.push('/')
  }
}

//logout
// const handleLogout = async () => {
//   await logoutUser()
//   if (!error.value) {
//     router.push('/')
//   }
// }

</script>

<style scoped lang="scss">
.sign_page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .sign_up {
    display: flex;
    padding: 80px;
    border-radius: 20px;
    //Mediaquery
    @media screen and (max-width: 851px) {
      & {
        display: block;
        padding:0;
      }
    }
    .image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .form {
      padding: 0 50px;
      //Mediaquery
      @media screen and (max-width: 851px) {
        & {
          text-align: center;
        }
      }
      label {
        font-weight: 500;
      }
      .btn_container {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        //Mediaquery
        @media screen and (max-width: 851px) {
          & {
            align-items: center;
          }
        }
        button{
          background-color:black;
          color:white;
          border-radius: 10px;
          padding:10px;
          margin-bottom:10px;
          min-width:250px;
          .google{
            width:30px;
            margin-left:10px;
          }
          &:hover{
          background-color:white;
          color:black;
        }
        }
      }
      input {
        border-radius: 10px;
        border: 0;
        padding: 10px;
      }
    }
  }
}
</style>
