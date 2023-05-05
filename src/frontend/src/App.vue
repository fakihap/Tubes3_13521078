<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

import axios from 'axios';

// import HelloWorld from './components/HelloWorld.vue';
import Sidebar from './components/Sidebar.vue';
import ChatWrapper from './components/ChatWrapper.vue';

  const messages = ref({});
  const useKMP = ref(true);
  const chatHistory = ref([]);

  const setMessage = (_q, _a) => {
      messages.value = {
        question : _q,
        answer : _a
      }
    }

    const submitMessage = (msg) => {
      axios.get('http://localhost:36656/answer',
      {
        params : {
          question : msg,
          method : useKMP.value ? "kmp" : "bm"
        }
      })
      .then(response => {
        setMessage(msg, response.data[0])
        console.log(response)
        axios.post('http://localhost:36656/history',
          {
              question : msg,
              answer : response.data[0]
          })
          .then(response => {
            console.log(response)
            axios.get('http://localhost:36656/history')
                .then((response) => {
                  chatHistory.value = response.data
                })
          })
      })
    }

  onMounted(() =>{
    axios.get('http://localhost:36656/history')
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
  <Sidebar :chat-histories="chatHistory"
          @set-use-kmp="(e) => useKMP = e" 
          @set-messages="(q, a) => setMessage(q, a)"/>

  <!-- still considering using router to load chats-->
  <ChatWrapper :data=messages 
                @submit-question="(e) => submitMessage(e)"/>

</template>

<style scoped>

</style>
