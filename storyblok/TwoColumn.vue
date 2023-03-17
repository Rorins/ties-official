<template>
  <section v-editable="blok" class="two_column bg_colorlight">
    <div class="container">
      <div class="row h_300">
        <!-- <div class="col-12 col-md-6 ">
            <img :src=blok.image.filename alt="talking" />
          </div> -->
        <div class="col-12 col-md-6 first_column" v-html="richtext"></div>
        <div class="col-12 col-md-6 second_column" v-html="asset"></div>
          <!-- <div class="col-12 col-xl-6">
            <h2>Listeners</h2>
            <p>
            We are not in any way mental health experts and always advice to
            seek professional help when needed. Ties is made of people just
            like you: our listeners are here because they want to be, they
            decided to offer their time freely to help us in our mission to
            bring a sheer of hope into this world, this is why we seek the
            most empathetic and kind individuals around the globe.
            </p>
            <h2 class="text-end">Chat</h2>
            <p>
              We believe technology can connect people, just like words, the
              right ones, can make a difference. This is why we provide online
              chats to interact with our available listeners worldwide. If you
              feel in need, lonely, in crisis, please feel free to chat with us.
            </p>
          </div> -->
      </div>
    </div>
  </section>
</template>


<script setup>
  const props = defineProps({ blok: Object })
  const richtext = computed(() => renderRichText(props.blok.description));
  const asset = computed(() => renderRichText(props.blok.asset));
</script>

<style scoped lang='scss'>
.two_column {
  padding: 80px 0;
  .first_column h2:nth-child(2){
    text-align:right !important;
  }
}
</style>