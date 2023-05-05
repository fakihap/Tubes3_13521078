<template>
    <div class="chatTopbar"></div>
     
    <div class="chatWrapper">
        <div    class="chatEmpty"    
                v-if="data.length == 0">
                Chat kosong
        </div>
        <ChatItem v-for="(datum, index) in data"
                    :content="datum"
                    :key="index"
                />
    </div>

    <div class="chatInputField">
        <div class="chatText">
            <input id="chatInput" v-model="chatInput" placeholder="masukkan teks ...">
        </div>
        <div class="chatSubmit" @click="sendMsg(chatInput)">
            <span class="material-symbols-outlined">
                send
            </span>
            send
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import ChatItem from './ChatItem.vue'

    const chatInput = ref('');

    defineProps({
        data: {
            type: Object,
            required: false
        }
    })

    const emit = defineEmits(['submit-question'])

    const sendMsg = (msg) => {
        emit('submit-question', msg)
        
        chatInput.value = ''
    }

    
</script>

<style>
    .material-symbols-outlined {
        font-variation-settings:
        'FILL' 0,
        'wght' 700,
        'GRAD' 200,
        'opsz' 48
    }

    .chatTopbar {
        display: none;
    }

    .chatWrapper {
        left: 1vw;

        display: flex;
        flex-direction: column;

        height: 100vh;
        width: 98vw;

        padding: 3rem 0;

        transition: 0.3s ease-out;
    }

    .chatEmpty {
        display: flex;
        align-items: center;
        justify-content: center;

        height: 100%;
    }

    .chatInputField {
        position: fixed;
        left: 0;
        bottom: 0;

        padding: 0 .3rem;
        
        width: 100vw;
        height: 12vh;

        background-color: #313351;
        box-shadow: 0 -2px 10px #151623;

        transition: 0.3s ease-out;

        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .chatText,
    .chatSubmit {
        height: 6vh;

        border-radius: 40px;
    }

    .chatText {
        width: 60vw;

        background-color: #F9F5EE;

        transition: 0.3s ease-out;
    }

    .chatSubmit {
        width: 25vw;

        padding: 0 3rem;

        display: flex;
        align-items: center;
        justify-content: space-evenly;


        background-color: #EDE6D8;
        color: #35333E;
        font-size: medium;
    }

    #chatInput {
        border: none;
        outline: none;

        background-color: inherit;

        padding: 1em;

        font-size: large;

        width: 100%;
        height: 100%;

        border-radius: inherit;
    }

    #chatInput:focus {
        
    }

    @media (min-width: 1024px) {
        .chatWrapper {
            padding: 3rem 2rem;
            
            height: 90vh;

            overflow-y: auto;

            top: -4vh;
        }

        .chatInputField {
            padding: 0 5rem;
        }

        .chatText {
            width: 70vw;
        }

        .chatSubmit {
            width: 8vw;
            font-size: x-large;
        }

        .chatSubmit:hover {
            background-color: #b5afa4;
        }

        aside.active ~ .chatWrapper {
            width: 78vw;
            left: 21vw;
        }

        aside.active ~ .chatInputField {
            width: 80vw;
            left: 20vw;
        }

        aside.active ~ .chatInputField > .chatText {
            width: 55vw;
        }
    }

    @media (max-width: 1024px) {
        .chatTopbar {
            display: block;
            position: fixed;
            z-index: 5;
            background-color:#151623bc;
            backdrop-filter: blur(20px);

            width: 100vw;
            height: 7vh;
        }

        .chatWrapper {
            top: 3vh;
        }
    }
</style>