<template>
  <section v-editable="blok" class="users bg_colordark">
    <div class="container">
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

<style scoped lang="scss"></style>
