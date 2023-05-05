<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

import axios from 'axios';

// import HelloWorld from './components/HelloWorld.vue';
import Sidebar from './components/Sidebar.vue';
import ChatWrapper from './components/ChatWrapper.vue';

  const messages = ref([]);
  const useKMP = ref(true);
  const chatHistory = ref([]);

  const clearMessage = () => {
      messages.value = []
    }

  const setMessage = (_q, _a) => {
    clearMessage()
    addMessage(_q, _a)
  }

  const addMessage =  (_q, _a) => {
    let _messages = JSON.parse(JSON.stringify(messages.value))
    messages.value = _messages.concat([{
      question : _q,
      answer : _a
    }])
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
      // tambah pertanyaan
      if (msg.toLowerCase().includes("tambah pertanyaan ") && msg.toLowerCase().includes(" dengan jawaban ")) {
        let _msg = msg.toLowerCase().replace("tambah pertanyaan ", "")
        _msg = _msg.split(" dengan jawaban ", 2)

        axios.post('http://localhost:36656/question',
        {
            question : _msg[0],
            answer : _msg[1]
        }).then(response => console.log(response))
      }

      // hapus pertanyaan
      if (msg.toLowerCase().includes("hapus pertanyaan ")) {
        let _msg = msg.toLowerCase().replace("hapus pertanyaan ", "")

        axios.delete('http://localhost:36656/question',
        {
          data : {
            question : _msg,
          }
        }).then(response => console.log(response))
      }

      // hapus semua pertanyaan
      if (msg.toLowerCase().includes("hapus semua pertanyaan ")) {
        axios.delete('http://localhost:36656/question').then(response => console.log(response))

        addMessage(msg, "semua pertanyaan telah dihapus") // DEBUG

        return
      }

      axios.get('http://localhost:36656/answer',
      {
        params : {
          question : msg,
          method : useKMP.value ? "kmp" : "bm"
        }
      })
      .then(response => {
        addMessage(msg, response.data)
        console.log(response)
        axios.post('http://localhost:36656/history',
          {
              question : msg,
              answer : JSON.stringify(response.data)
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
  })

</script>

<template>
  <Sidebar :chat-histories="chatHistory"
          @set-use-kmp="(e) => useKMP = e" 
          @set-messages="(q, a) => setMessage(q, a)"
          @delete-message="(id) => deleteMessage(id)"
          @clear-messages="clearMessage()"
          />

  <!-- still considering using router to load chats-->
  <ChatWrapper :data=messages 
                @submit-question="(e) => submitMessage(e)"/>

</template>

<style scoped>

</style>
