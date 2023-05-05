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

    const deleteMessage = (_id) => {
      console.log(_id)
        axios.delete('http://localhost:36656/history',
        {
          data : {
            id : _id, 
          }
        })
        .then(response => {
          console.log(response.body)
          axios.get('http://localhost:36656/history')
                .then((response) => {
                  chatHistory.value = response.data
                })
        })
    }

    const submitMessage = (msg) => {
      if (msg.toLowerCase().includes("tambah pertanyaan ") && msg.toLowerCase().includes(" dengan jawaban ")) {
        let _msg = msg.toLowerCase().replace("tambah pertanyaan ", "") //TODO
        _msg = msg.split(" dengan jawaban ", 2)

        axios.post('http://localhost:36656/question',
        {
            question : _msg[0],
            answer : _msg[1]
        }).then(response => console.log(response))
      }

      if (msg.toLowerCase().includes("hapus pertanyaan ")) {
        let _msg = msg.toLowerCase().replace("hapus pertanyaan ", "")

        axios.delete('http://localhost:36656/question',
        {
          data : {
            question : _msg,
          }
        }).then(response => console.log(response))
      }

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
  
    //delete
    


  })

</script>

<template>
  <Sidebar :chat-histories="chatHistory"
          @set-use-kmp="(e) => useKMP = e" 
          @set-messages="(q, a) => setMessage(q, a)"
          @delete-message="(id) => deleteMessage(id)"/>

  <!-- still considering using router to load chats-->
  <ChatWrapper :data=messages 
                @submit-question="(e) => submitMessage(e)"/>

</template>

<style scoped>

</style>
