<template>
  <section v-editable="blok" class="users bg_colordark">
    <div class="container">
      <div class="contact text-center">
      <h2 >Want to be a listener?</h2>
      <p class="btn-outline-light btn btn-dark">Contact us and we will set you up!</p>
    </div>
      <div class="row">
        <ListenerCard
          v-for="user in blok.users"
          class="col-12 col-lg-6"
          :key="user._uid"
          :img="user.img.filename"
          :name="user.name"
          :quote="user.quote"
          :description="user.description"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({ blok: Object });
</script>

<style scoped lang="scss">
.contact{
  padding-top:50px;
}
</style>
