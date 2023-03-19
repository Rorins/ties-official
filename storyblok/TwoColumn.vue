<template>
  <section v-editable="blok" class="two_column bg_colorlight">
    <div class="container">
      <div class="row ">
        <div class="col-12 col-sm-12 col-xl-6 first_column" v-html="richtext"></div>
        <div class="col-12 col-sm-12 col-xl-6 second_column" v-html="asset"></div>
      </div>
    </div>
  </section>
</template>


<script setup>
  const props = defineProps({ blok: Object })
  const richtext = computed(() => renderRichText(props.blok.description));
  const asset = computed(() => renderRichText(props.blok.asset));
</script>

<style lang='scss'>
.two_column {
  padding: 80px 0;
  .second_column h2,.first_column h2{
    font-weight:300;
    margin:30px 0px;
  }
  .second_column h2:nth-child(5),.first_column h2:nth-child(3){
    text-align:right;
  }
  .first_column .alignment, .second_column .alignment{
    display:block;
    text-align:center;
  }

  //Added mediaquery
  @media screen and (max-width:580px){
    .first_column .alignment img, .second_column .alignment img{
    width:80%;
  }
    }
}
</style>