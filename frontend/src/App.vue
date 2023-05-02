<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
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
  {
    author: 'fey',
    content: "nice orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    author: 'flemming',
    content: 'hello from App.vue'
  },
  {
    author: 'fey',
    content: 'hello to u 2'
  },
  {
    author: 'fey',
    content: "nice orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    author: 'flemming',
    content: 'hello from App.vue'
  },
  {
    author: 'fey',
    content: 'hello to u 2'
  },
  {
    author: 'fey',
    content: "nice orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    author: 'flemming',
    content: 'hello from App.vue'
  },
  {
    author: 'fey',
    content: 'hello to u 2'
  },
  {
    author: 'fey',
    content: "nice orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  {
    author: 'flemming',
    content: 'hello from App.vue'
  },
  {
    author: 'fey',
    content: 'hello to u 2'
  },
  {
    author: 'fey',
    content: "nice orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
]  

</script>

<template>
  <Sidebar />

  <!-- <header> -->
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <!-- <div class="wrapper"> -->
      <!-- <HelloWorld msg="You did it!" /> -->

      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    <!-- </div> -->
  <!-- </header> -->

  <!-- <RouterView /> -->

  <!-- still considering using router to load chats-->
  <ChatWrapper :data=messages />
  
</template>

<style scoped>

</style>
