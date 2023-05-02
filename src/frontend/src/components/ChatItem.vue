<template>
    <div class="chatItem" 
            style="justify-content: flex-start"
            v-if="isBot">
        <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

        <placeholderImg>{{ author }}</placeholderImg>
        <div class="chatMessage chatLeft">{{ content }}</div>         
    </div>

    <div class="chatItem" 
            style="justify-content: flex-end"
            v-else>
        <div class="chatMessage chatRight">{{ content }}</div>         
        <placeholderImg>{{ author }}</placeholderImg>
    </div>
</template>

<script setup>
    defineProps({
        author: String,
        isBot: Boolean,
        // time??
        content: String
    })
</script>

<style>
    :root{
        --left-bubble-bg: #95A0BA;
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