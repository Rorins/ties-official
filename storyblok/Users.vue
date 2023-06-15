<template>
  <section v-editable="blok" class="users bg_colordark">
    <div class="container">
      <div class="contact text-center">
      <h2 >Want to become a listener?</h2>
      <p @click="navigateToContact" class="btn-outline-light btn btn-dark">Contact us and we will set you up!</p>
    </div>
      <div class="row">
        <ListenerCard
          v-for="user in users"
          class="col-12 col-lg-6"
          :key="user.uid"
          :img="user.currentImgUrl"
          :name="user.nickName"
          :quote="user.triggers"
          :description="user.about"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
defineProps({ blok: Object });
const { getUsersByUserType } = useDatabase();
const users = ref([]);

onMounted(async () => {
  try {
    users.value = await getUsersByUserType();
    console.log(users.value, "These should be the listeners")
  } catch (err) {
    console.log(err.message);
  }
});

const navigateToContact = () => {
    router.push("/contact-us");
};

</script>

<style scoped lang="scss">
.contact{
  padding-top:50px;
}
</style>
