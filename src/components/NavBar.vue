<template>
    <div class="container"
        :class="[isDarkMode ? 'dark' : 'light', isOpen ? 'open' : 'close']"
    >     
    <div class="burger-icon" 
        :class="{ active: isOpen }"
        @click="openMenu()">
        <div class="burger-line line1"
            :class="{ 'line1-short': isOpen }"
        ></div>
        <div class="burger-line line2"></div>
        <div class="burger-line line3"
            :class="{ 'line3-short': isOpen }"
        ></div>
    </div> 
        <div class="nav-item" @click="goToRoute('home')">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
            <div>Home</div>
        </div>
        <div>
            Games
        </div>
        <div class="nav-item" @click="goToRoute('wordle')">
            <img src="/src/components/icons/64px-Wordle_Logo.svg.png" height="24px" width="24px"/>
            <div>Wordle</div>
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

        const isOpen = ref(true);
        const openMenu = () => {
            isOpen.value = !isOpen.value;
            return !isOpen.value
        }

        const goToRoute = (route) => {
            router.push({ name: route })
        }

        return {
            isDarkMode,
            isOpen,
            router,
            openMenu,
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

    button {
        outline: solid 2px;
        margin: 1rem;
    }

    .burger-icon {
        width: 30px;  
        height: 20px;  
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        cursor: pointer;
        margin: 2rem;
        transform: translateX(8vw);
        transition: 0.3s;
        position: fixed;
    }

    .burger-icon.active {
        transform: translateX(6vw);
    }

    .burger-line {
        width: 100%;   
        height: 2px;   
        background-color: #333;  
        border-radius: 5px; 
        transition: 0.5s; 
    }

    .dark .burger-line {
        background-color: white;
    }

    .dark .burger-icon:hover .burger-line {
        background-color: #d3d3d3;  
    }

    .burger-icon:hover .burger-line {
        background-color: #555;  
    }

    .burger-icon.active .line1 {
        transform: rotate(-45deg) translate(-10px, -4px);
        transition: 0.3s; 
    }

    .burger-line.line1.line1-short {
        width: 50%; 
        margin-left: auto;
        transition: 0.3s;  
    }

    .burger-icon.active .line2 {
        transform: translate(14px, 0px);
        transition: 0.3s; 
    }

    .burger-icon.active .line3 {
        transform: rotate(45deg) translate(-10px, 4px);
        transition: 0.3s; 
    }

    .burger-line.line3.line3-short {
        width: 50%; 
        margin-left: auto; 
        transition: 0.3s; 
    }

    .open {
        transform: translate(0vw);
    }

    .close {
        transform: translate(-11vw);
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
    }

    .light .nav-item:hover {
        background: #d3d3d3;
    }
</style>
