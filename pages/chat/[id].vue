<template>
  <div>
    <h1>Chat Room id: {{ id }}</h1>
    <div>
      Temporary room
    </div>
  </div>
</template>


<script>
const {id} = useRoute().params
</script>