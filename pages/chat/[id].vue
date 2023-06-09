<template>
  <div class="container d-flex justify-content-center">
    <div class="chat_container h_600 bg_colordark ">
    <h1>You are talking to </h1>
    <Message v-for="message in messageData" 
    :text = "message.text"
    :key="message.id"
    :sender ="message.senderId">
    {{ message }}
  </Message>

  <form @submit.prevent="sendMessage">
      <input v-model="inputText" />
      <button type="submit">Send Message</button>
    </form>
  </div>
  </div>
</template>


<script setup>
const { createMessages, getMessagesByChatId } = useDatabase();
const { currentUser, error } = useAuth();
//chat id
const {id} = useRoute().params
const messageData = ref([]);
const inputText = ref('');

onMounted(async () => {
  try {
    const messages = await getMessagesByChatId(id);
    messageData.value = messages;
    console.log(messageData, "all messages")
  } catch (err) {
    console.log(err.message);
  }
});

//creating message
const sendMessage = async () => {
  try {
    const { uid } = currentUser.value;

    const message = {
      chatRoomId: id,
      text: inputText.value,
      senderId: uid,
    };

    const data = await createMessages(message);
    messageData.value.push(data);
     console.log(messageData.value, "stuff")
     inputText.value = '';
    } catch (err) {
      console.log(err.message);
    }
};

</script>

<style scoped lang="scss">
.chat_container{
  padding: 80px;
  margin:100px 0;
  border-radius: 20px;
  border: 3px solid #ddd3c9;
  width:800px;
}
</style>