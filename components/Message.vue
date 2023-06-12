<template>
   <div 
   class="message" 
   :class="currentUser && currentUser.uid === senderId ? 'sent' : 'received'">
    <img :src="senderPhoto" />
    <span>
        {{ text }}
    </span> 
   </div> 
  </template>

<script setup>
const { currentUser } = useAuth();
const {uid} = useAuth();
  defineProps({
  text:String,
  sender: String,
  senderId: String,
  senderPhoto: String,
  }); 

</script>

<style scoped lang="scss">
.message{
  width:300px;
  border-radius: 20px;
  padding: 10px;
  margin:10px 0;
}
img{
  width:50px;
  height:50px;
}
.sent{
  background-color:black;
  color:white;
}
.received{
  background-color:white;
}
</style>