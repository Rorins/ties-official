<template>
  <div class="container d-flex justify-content-center">
    <div class="chat_container h_600 bg_colordark ">
    <h1>This is {{ chatData.userName }}' s chat </h1>
    <Message v-for="message in messageData" 
    :text = "message.text"
    :key="message.id"
    :sender ="message.senderName"
    :senderId = "message.senderId"
    :senderPhoto = "message.senderPhoto">
    {{ message }}
  </Message>

  <form @submit.prevent="sendMessage">
      <input v-model="inputText" />
      <button type="submit">Send Message</button>
    </form>
  </div>

  <div class="details bg_colordark h_400">
    <h2>
      About {{ chatData.userName }}:
    </h2>
    <p>{{ chatData.otherInfo }}</p>
    <h2> Avoid discussing:</h2>
    <p> {{ chatData.about }}</p>
  </div>
  </div>
</template>


<script setup>
import { useRouter, useRoute } from "vue-router";
const { createMessages, getMessagesByChatId, getChatData, deleteChat} = useDatabase();
const { currentUser, error } = useAuth();
//chat id
const {id} = useRoute().params
const router = useRouter();
const messageData = ref([]);
const inputText = ref('');
const chatData = ref('');

// Get messages
onMounted(async () => {
  try {
    const messages = await getMessagesByChatId(id);
    messageData.value = messages;
    console.log(messageData, "all messages")
  } catch (err) {
    console.log(err.message);
  }
});

//Get chat data
onMounted(async () => {
  try {
    chatData.value = await getChatData(id);
    console.log(chatData.value, "ALL CHAT DATA")
  } catch (err) {
    console.log(err.message);
  }
});

//creating message
const sendMessage = async () => {
  try {
    const { uid, displayName, photoURL } = currentUser.value;

    const message = {
      chatRoomId: id,
      text: inputText.value,
      senderId: uid,
      senderName: displayName,
      senderPhoto: photoURL,
    };

    const data = await createMessages(message);
    messageData.value.push(data);
     console.log(messageData.value, "stuff")
     inputText.value = '';
    } catch (err) {
      console.log(err.message);
    }
};

const deleteChatRoom = async () => {
    try {
      await deleteChat(id);
      router.push("/chat");
    } catch (error) {
      console.log('Error deleting chat:', error);
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
.details{
  padding: 80px;
  margin:100px 0;
  border-radius: 20px;
  border: 3px solid #ddd3c9;
}
</style>