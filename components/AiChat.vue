<template>
    <div class="msg_container">
      <input class="input-group-text" v-model="message" @keyup.enter="sendMessage" placeholder="Type your message..." />
      <div v-for="msg in responses" :key="msg" class="response">{{ msg }}</div>
      <div class="prompt" v-if="prompt">If you want to continue the conversation get premium membership
     <button @click="upgradeToPremium">Upgrade to Premium</button>
    </div>
      <Loading v-if="loading" />
    </div>
  </template>
  
  <script setup>
  const { currentUser } = useAuth();
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const message = ref('');
  const responses = ref([]);
  const loading = ref(false);
  const notPremium = ref(true);
  const prompt = ref(false);
  const authenticated = ref(false);


  const sendMessage = async () => {
    try {
      console.log('sending message');
      loading.value = true;

      if (!authenticated.value) {
      await axios.post('/api/authenticate'); // Authenticate only if not already authenticated
      authenticated.value = true; 
      saveAuthenticatedToLocalStorage()
      } 

      const apiResponse = await axios.post('/api/chat', {
        message: message.value,
      });
      responses.value.push(apiResponse.data.text);
      message.value = '';
      loading.value = false;
      console.log(responses.value, "risultato messaggio");
    } catch (error) {
      loading.value = false;
      prompt.value= true;
      console.log("inside of error of sendmessage", notPremium.value);
      console.error("Error sending message:", error);
    }
  };

const upgradeToPremium = async () => {
  try {
    const response = await axios.post('/api/upgrade', {
      notPremium: false, // Send the notPremium value to the backend
    });
   
     // If upgrade is successful, update the notPremium value locally
     if (response.status === 200) {
      notPremium.value = false;
      prompt.value= false;
      console.log("Upgraded to Premium frontend");
    }

  } catch (error) {
    console.error("Error upgrading to Premium:", error);
  }
};

//Local storage
const saveAuthenticatedToLocalStorage = () => {
  localStorage.setItem('authenticated', authenticated.value.toString());
};


const loadAuthenticatedFromLocalStorage = () => {
  const storedValue = localStorage.getItem('authenticated');
  if (storedValue !== null) {
    authenticated.value = storedValue === 'true';
  }
};

onMounted(() => {
  loadAuthenticatedFromLocalStorage();
});

  </script>

<style scoped lang="scss">
.msg_container{
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    width:350px;
    .response{
        margin:10px 0;
        background-color:#ddd3c9;
        border-radius: 20px;
        padding:10px;
    }
    .prompt{
        margin:10px 0;
        background-color:rgb(176, 137, 137);
        border-radius: 20px;
        padding:10px;
        font-weight:bold;
        text-align:center;
    }
}
</style>
  