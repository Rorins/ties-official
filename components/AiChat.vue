<template>
    <div>
      <input v-model="message" @keyup.enter="sendMessage" placeholder="Type your message..." />
      <div v-if="response">{{ response }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        message: '',
        response: '',
      };
    },
    methods: {
      async sendMessage() {
        try {
          console.log('sending message')
          const response = await axios.post('http://localhost:5000/chat', {
            message: this.message,
          });
          this.response = response.data.text;
          console.log(this.response, "risultato messaggio")
          this.message = '';
        } catch (error) {
          console.error("Error sending message:", error);
          // Handle error display or logging here if needed
        }
      },
    },
  };
  </script>
  