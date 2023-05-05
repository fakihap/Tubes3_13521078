<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

import axios from 'axios';

// import HelloWorld from './components/HelloWorld.vue';
import Sidebar from './components/Sidebar.vue';
import ChatWrapper from './components/ChatWrapper.vue';

const messages = [
  {
    author: 'flemming',
    content: 'hello from App.vue'
  },
  {
    author: 'fey',
    content: 'hello to u 2'
  },
]  

  
  const chatHistory = ref([]);
  onMounted(() =>{
    //get
    // axios.get('http://localhost:36656/answer',
    // {
    //   params : {
    //     question : "siapa manusia tertampan di dunia",
    //     method : "bm"
    //   }
    // })
    // .then(response => console.log(response))
    axios.get('http://localhost:36656/history',
    {
      params : {
        question : "siapa manusia tertampan di dunia",
        method : "bm"
      }
    })
    .then((response) => {
      chatHistory.value = response.data
    })

    

    //post
    // axios.post('http://localhost:36656/question',
    // {
      
    //     question : "halo di sana?",
    //     answer : "iya"

      
    // })
    // .then(response => console.log(response))
  
    //delete
    //     axios.delete('http://localhost:36656/question',
    // {
      
    //     id : "halo di sana?",

      
    // })
    // .then(response => console.log(response))


  })

</script>

<template>
  <Sidebar :chat-histories="chatHistory" />

  <!-- still considering using router to load chats-->
  <ChatWrapper :data=messages />
  
</template>

<style scoped>

</style>
