<template>
  <div class="sign_page bg_colorlight" v-editable="blok">
    <!-- Sign up form -->
    <div v-if="signUp" class="sign_up bg_colordark">
      <figure class="image">
        <img :src="blok.img.filename" :alt="blok.img.alt" />
      </figure>
      <aside class="form">
        <h1>{{ blok.title }}</h1>
        <div v-html="undertitle"></div>
        <div class="inputs">
        <div class="email">
          <div><label for="email">E-mail</label></div>
          <div class="email_input">
          <input
            v-model="userData.email"
            type="email"
            name="email"
            id="email"
            placeholder="e-mail"
            required
          />
        </div>
        </div>
        <div class="password">
          <div><label for="password">Password</label></div>
          <div class="password_input">
            <input
            v-model="userPassword"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            id="password"
            placeholder="password"
            required
          />
          <button @click="togglePwd">
            <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
          </div>

          <div v-if="error" class="validation_box">
            <span>{{ error}}</span>
          </div>
          
        </div>
        </div>
        <div class="btn_container">
          <button type="submit" @click="registerUser($event)">
            {{ blok.buttons[0].text }}
          </button>
          <button @click="googleSignUp">
            {{ blok.buttons[1].text }}
            <img
              class="google"
              :src="blok.buttons[1].icon.filename"
              :alt="blok.buttons[1].icon.filename"
            />
          </button>
        </div>
      </aside>
    </div>

    <!-- Sign in form -->
    <div v-if="signIn" class="sign_up bg_colordark">
      <figure class="image">
        <img :src="blok.img.filename" :alt="blok.img.alt" />
      </figure>
      <aside class="form">
        <h1>{{ blok.title }}</h1>
        <div v-html="undertitle"></div>
        <div class="inputs">
        <div class="email">
          <div><label for="email">E-mail</label></div>
        <div class="email_input">
          <input
            v-model="userData.email"
            type="email"
            name="email"
            id="email"
            placeholder="e-mail"
            required
          />
        </div>
        </div>
        <div class="password">
          <div><label for="password">Password</label></div>
          <div class="password_input">
            <input
            v-model="userPassword"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            id="password"
            placeholder="password"
            required
          />
          <button @click="togglePwd">
            <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
          </div>
          <h3>
            <a :href=blok.link.cached_url>
            {{ blok.linkText}}
           </a>
         </h3>
        </div>
      </div>

      <div v-if="error" class="validation_box">
           <span>{{error}}</span>
      </div>

        <div class="btn_container">
          <button type="submit" @click="submitLogin">
            {{ blok.buttons[0].text }}
          </button>
          <button @click="googleLogin">
            {{ blok.buttons[1].text }}
            <img
              class="google"
              :src="blok.buttons[1].icon.filename"
              :alt="blok.buttons[1].icon.filename"
            />
          </button>
        </div>
      </aside>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import useAuth from "~/composables/useAuth";
import { ref } from "vue";


const props = defineProps({ blok: Object });
const undertitle = computed(() => renderRichText(props.blok.undertitle));
const signUp = computed(() => props.blok.isSignUp);
const signIn = computed(() => props.blok.isSignIn);

//Functions firebase for authentication and firebase database
const { createUser, loginUser, loginWithGoogle, signUpWithGoogle, verifyEmail, currentUser, error } =
  useAuth();
const {addUserData} = useDatabase();

//user data for authentication
const userData = {
      email: "",
      uid : null,
  }

const userPassword = ref("")
const showPassword = ref(false)
const router = useRouter();

//sign-in sign-up
const registerUser = async (event) => {
  console.log("email:", userData.email, "password:", userPassword.value);
  event.preventDefault();
  try {
    await createUser( userData.email,  userPassword.value);
    //id
    const {uid} = currentUser.value;
    userData.uid = uid;
    //data for backend
    await addUserData(userData.uid , userData);
    await verifyEmail();
    if(!error.value){
      router.push("/selection");
    }
  } catch (err) {
    console.log(err)
  }
};

const submitLogin = async () => {
  console.log("email:",  userData.email, "password:",  userPassword.value);
  await loginUser( userData.email,  userPassword.value);
  if (!error.value) {
    router.push("/dashboard");
  }
};

//Google
const googleLogin = async () => {
  await loginWithGoogle();
  if (!error.value) {
    router.push("/dashboard");
  }
};

const googleSignUp = async () => {
  await signUpWithGoogle();
  const {uid} = currentUser.value;
  userData.uid = uid;
  //data for backend
  await addUserData(userData.uid , userData);
  if (!error.value) {
    router.push("/selection");
  }
};


//Password
const togglePwd = () => {
  showPassword.value = !showPassword.value
}

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
    border: 3px solid #ddd3c9;
    //Mediaquery
    @media screen and (max-width: 851px) {
      & {
        display: block;
        padding: 0;
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
        button {
          background-color: black;
          color: white;
          border-radius: 10px;
          padding: 10px;
          margin-bottom: 10px;
          min-width: 250px;
          .google {
            width: 30px;
            margin-left: 10px;
          }
          &:hover {
            background-color: white;
            color: black;
          }
        }
      }
      .inputs{
        //Mediaquery
        @media screen and (max-width: 851px) {
          & {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
        .password h3{
          margin-top:10px;
          font-size:15px;
          a{
            text-decoration: none;
          }
        }
        .password_input, .email_input{
        background-color:white;
        border-radius: 10px;
        padding: 10px;
        display:flex;
        justify-content:space-between;
        width:250px;
        button{
          border:none;
          
        }
      }
      input {
        border: 0;
        background:white;
        width:100%;
        &:focus{
          outline: none;
        }
      }
      }
      .validation_box{
        width:250px;
        color:red;
        margin:10px 0;
      }
    }
  }
}
</style>
