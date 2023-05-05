<template>
    <div v-if="content.question != ''"
            class="chatItem" 
            style="justify-content: flex-end">
        <div class="chatMessage chatRight">{{ content.question }}</div>         
        <placeholderImg>user</placeholderImg>
    </div>

    <div v-if="content.question != ''"
            v-for="(chat, idx) in content.answer"
            class="chatItem" 
            style="justify-content: flex-start"
            :key="idx">
        <placeholderImg>bot</placeholderImg>
        <div class="chatMessage chatLeft">{{ chat }}</div>         
    </div>
</template>

<script setup>
    defineProps({
        content: String
    })
</script>

<style>
    :root{
        --left-bubble-bg: #6d7588;
        --right-buble-bg: #EDE6D8;

        --left-bubble-text: #EAE8F3;
        --right-bubble-text: #35333E;
    }

    .chatItem {
        margin: .5rem;

        display: flex;
        flex-direction: row;

        align-items: flex-start;

        height: fit-content;
        
    }   
    
    placeholderImg {
        margin: 0 .5rem;

        border-radius: 50%;
        background-color: white;
        color: black;
        font-size: x-small;

        width: 3rem;
        height: 3rem;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .chatMessage {
        border-radius: 20px;
        padding: .7rem;

        max-width: 60vw;
    }

    .chatLeft {
        background-color: var(--left-bubble-bg);
        color: var(--left-bubble-text);
    }

    .chatRight {
        background-color: var(--right-buble-bg);
        color: var(--right-bubble-text);
    }
</style>