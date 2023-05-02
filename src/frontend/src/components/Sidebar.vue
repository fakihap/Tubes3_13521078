<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

    
    <aside :class="`${sidebar_active ? 'active' : 'inactive'}`">
        <span class="material-symbols-outlined"
            @click="toggle_sidebar">
            menu
        </span>
        <div class="contentWrapper">
            <div class="chatHistoryContainer">
                <div class="chatHistoryItem"
                        v-for="(item, index) in chatHistories"
                        :key="index"
                        >
                    <span class="material-symbols-outlined">
                        chat
                    </span>
                    {{item.title}}
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup>
    import { ref } from 'vue';

    const sidebar_active = ref(false);

    const toggle_sidebar = () => {
        sidebar_active.value = !sidebar_active.value;
    }

    //TODO
    const chatHistories = [
        {
            title: 'tanya PR'
        },
        {
            title: 'saran makan malam'
        },
        {
            title: '2 + 1 = berapa?'
        },
        {
            title: 'tanya PR'
        },
        {
            title: 'saran makan malam'
        },
        {
            title: '2 + 1 = berapa?'
        },
        {
            title: 'tanya PR'
        },
        {
            title: 'saran makan malam'
        },
        {
            title: '2 + 1 = berapa?'
        },
        {
            title: 'tanya PR'
        },
        {
            title: 'saran makan malam'
        },
        {
            title: '2 + 1 = berapa?'
        },
        {
            title: 'tanya PR'
        },
        {
            title: 'saran makan malam'
        },
        {
            title: '2 + 1 = berapa?'
        },
        {
            title: 'tanya PR'
        },
        {
            title: 'saran makan malam'
        },
        {
            title: '2 + 1 = berapa?'
        },
    ]
</script>

<style>
    aside {
        z-index: 10;
        position: fixed;
        left: 0;
        top: 0;

        width: 0;
        min-height: 100vh;
        background-color: #1f2032;

        padding: 0;

        display: flex;
    
        transition: 0.2s ease-out;
    }

    aside.active {
        width: 100vw;
        padding: 1rem;
    }

    aside > .contentWrapper {
        opacity: 0;
        transition: 0.2 ease-out;
    }

    aside.active > .contentWrapper {
        opacity: 1;
    }

    aside > .material-symbols-outlined {        
        z-index: 10;
        position: absolute;

        top: 1rem;
        right: calc(1rem - 100vw);
        

        transition: 0.2s ease-out;

        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48;
    }

    aside.active > .material-symbols-outlined {
        right: 1rem;
    }

    .contentWrapper {
        width: 100%;
    }

    .chatHistoryContainer {
        margin: 3rem 1rem;

        max-height: 70vh;

        overflow-y: scroll;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .chatHistoryItem {
        margin: .5rem;

        display: flex;
        justify-content: center;
        align-items: flex-start;
    }

    .chatHistoryItem > .material-symbols-outlined {
        margin-right: .5rem;
    }

    @media (min-width: 1024px) {
        aside {
            width: 0;
            
            padding: 0;
        
            transition: 0.3s ease-out;
        }

        aside.active {
            width: 20vw;
            padding: 1rem;
        }

        aside > .contentWrapper {
            transition: 0.3 ease-out;
        }

        aside > .material-symbols-outlined {        
            top: 1rem;
            right: -2rem;
            
            transition: 0.3s ease-out;
        }

        aside.active > .material-symbols-outlined {
            right: 1rem;
        }    
    }
</style>