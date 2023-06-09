<template>
   <div>
    <p >
        {{ text }}
    </p> 
   </div> 
  </template>

<script setup>
const { currentUser, error } = useAuth();

  defineProps({
  text:String,
  sender: String,
  }); 


</script>