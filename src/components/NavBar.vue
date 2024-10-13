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
        padding: 0.5rem;
        margin: 0.5rem;
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
        width: 36px;
        height: 36px;
        margin: 1rem;
    }

    h2 {
        margin: 1rem;
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
