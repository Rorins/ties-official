<template>
   <div 
   class="message d-flex" 
   :class="currentUser && currentUser.uid === senderId ? 'sent' : 'received'">
    <img :src="senderPhoto" />
    <div>
      <span>
        {{ text }}
    </span> 
    </div>
   </div> 
  </template>

<script setup>
const { currentUser } = useAuth();
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
  word-break:break-word;
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
  align-self: flex-end;
}
</style>