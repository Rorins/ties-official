<template>
  <div class="sign_page bg_colorlight" v-editable="blok">
    <div class="sign_up bg_colordark">
      <figure class="image">
        <img :src="blok.img.filename" :alt="blok.img.alt" />
      </figure>
      <aside class="form">
        <h1>{{ blok.title }}</h1>
        <div v-html="undertitle"></div>
        <div class="email">
          <div><label for="email">E-mail</label></div>
          <input type="text" name="email" id="email" />
        </div>
        <div class="password">
          <div><label for="password">Password</label></div>
          <input type="text" name="password" id="password" />
        </div>
        <div class="btn_container">
          <StoryblokComponent
            v-for="blok in blok.buttons"
            :key="blok._uid"
            :blok="blok"
          />
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object });
const undertitle = computed(() => renderRichText(props.blok.undertitle));
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
