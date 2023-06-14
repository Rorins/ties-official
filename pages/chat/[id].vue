<template>
  <div v-if="chatData" class="container d-flex justify-content-center">
    <div class="chat_container h_600 bg_colordark ">
    <h1>This is {{ chatData.userName }}' s chat </h1>
    <div class="message_list d-flex flex-column">
    <Message v-for="message in messageData" 
    :text = "message.text"
    :key="message.id"
    :sender ="message.senderName"
    :senderId = "message.senderId"
    :senderPhoto = "message.senderPhoto">
    {{ message }}
  </Message>
</div>
  
  <form class="d-flex align-items-center" @submit.prevent="sendMessage">
      <input class="input-group-text" v-model="inputText" />
      <button class="send_btn btn-outline-light btn btn-dark" type="submit">Send Message</button>
    </form>
  </div>

  <div class="details h_400">
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
import { onBeforeUnmount } from 'vue';

const { createMessages, getMessagesByChatId, getChatData, deleteChat} = useDatabase();
const { currentUser, error } = useAuth();
//chat id
const {id} = useRoute().params
const router = useRouter();
const messageData = ref([]);
const inputText = ref('');
const chatData = ref('');

//Delete chat when user changes page
const deleteAndRedirect = async () => {
  try {
    router.push("/chat");
    await deleteChat(id);
  } catch (err) {
    console.log(err.message);
  }
};

onBeforeUnmount(deleteAndRedirect);

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


</script>

<style scoped lang="scss">
@media screen and (max-width: 997px) {
  .container {
    flex-direction: column;
    align-items: center;
    .chat_container, .details{
      margin-bottom:20px;
      width:100%;
      form{
        width:100%;
      }
    }
    .details{
      margin:0;
    }
  }
}
.chat_container{
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  padding: 50px 80px 20px;
  margin:100px 0;
  border-radius: 20px;
  border: 3px solid #ddd3c9;
  width:900px;
  .message_list{
    overflow-y: auto;
    max-height: 400px;
  }
  form{
    background-color:#ddd3c9;
    padding:5px;
    margin:10px 0;
    border-radius:20px;
    flex-wrap:wrap;
  }
}
.details{
  width:450px;
  padding: 40px;
  margin:100px 0;
  border-radius: 20px;
  background-color:black;
  color:white;
  margin-left:10px;
  word-break:break-word;
  overflow:auto;
}
.send_btn{
  margin:20px 0;
}
.input-group-text{
  height:30px;
  .button{
    height:40px;
  }
}
</style>