<template>
    <div class="container"
        :class="[isDarkMode ? 'dark' : 'light', isNavOpen ? 'open' : 'close']"
    >     
        <div class="nav-item" @click="goToRoute('home')">
            <svg xmlns="http://www.w3.org/2000/svg" class="nav-item-icon" viewBox="0 -960 960 960"  fill="#e8eaed"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
            <h2>Home</h2>
        </div>
        <hr class="solid"
            :class="isDarkMode ? 'dark' : 'light'"
        >
        <h2>
            Games
        </h2>
        <div class="nav-item" @click="goToRoute('wordle')">
            <img src="/src/components/icons/64px-Wordle_Logo.svg.png" class="nav-item-icon"/>
            <h2>Wordle</h2>
        </div>
        <div class="nav-item" @click="goToRoute('dinogame')">
            <svg class="nav-item-icon" viewBox="13.848000000000003 0 283.6449999999999 305.4" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M269.352 91.664h-42.436V80.04h70.577v-65.73h-14.294V0H168.4v14.309h-13.848v91.664H140.26v13.861h-20.994v14.309H98.271v14.308H83.977v13.862H58.069v-14.309H44.222v-13.861H29.928v-28.17h-16.08v86.746h13.847v14.308h14.293v13.862h13.848v14.308H70.13v13.862h13.847v56.34h30.375V289.3h-13.848V277.23h13.848v-13.862h14.294V249.06h11.613v14.308h14.294V305.4h30.375V289.3h-14.294v-54.104h14.294V220.89h13.847v-21.016h14.294v-49.186h11.614v13.862h16.527v-30.406h-28.14v-25.934h56.282z" fill="#666"/><path d="M182.248 20.569h16.974V37.56h-16.974z" fill="#fff"/></g></svg>
            <h2>Dino</h2>
        </div>
    </div>
</template>

<script>
import { defineComponent, inject, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'NavBar',
    setup() {
        const router = useRouter();

        const isDarkMode = inject('isDarkMode', ref(false));
        const isNavOpen = inject('isNavOpen', ref(false));

        const goToRoute = (route) => {
            router.push({ name: route })
        }

        return {
            isDarkMode,
            isNavOpen,
            router,
            goToRoute,
        }
    },
})
</script>

<style scoped>
    .container {
        position: fixed;
        background: white;
        width: 10vw;
        height: 100vh;
        box-shadow: 5px 0 10px rgba(0, 0, 0, 0.3);
        top: 0;
        left: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        flex-direction: column;
        transition: 0.3s;
    }

    .open {
        transform: translate(0vw);
    }

    .close {
        transform: translate(-11vw);
        visibility: hidden;
    }

    .dark {
        background: #292929;
        color: white;
        transition: 0.3s;
    }

    .light {
        background: white;
        color: #121212;
        transition: 0.3s;
    }

    .nav-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        padding: 1px;
        margin: 10px;
        border-radius: 5px;
    }

    .dark .nav-item:hover {
        background: #414141;
        transition: 0.3s;
    }

    .light .nav-item:hover {
        background: #d3d3d3;
        transition: 0.3s;
    }

    .nav-item-icon {
        width: 24px;
        height: 24px;
        margin: 10px;
    }

    h2 {
        margin: 10px;
        font-size: 15px;
    }

    hr.solid {
        border: 1px solid #e9e9e9;
        width: 100%;
    }

    .dark hr.solid {
        border: 1px solid #3d3d3d;
        color: #3a3a3a;
    }
</style>
