<template>
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
    <div class="container"
        :class="[isDarkMode ? 'dark' : 'light', isOpen ? 'open' : 'close']"
    >      
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/wordle">Worlde</RouterLink>
    </div>
</template>

<script>
import { defineComponent, inject, ref } from 'vue'

export default defineComponent({
    name: 'NavBar',
    setup() {

        const isDarkMode = inject('isDarkMode', ref(false));

        const isOpen = ref(true);
        const openMenu = () => {
            isOpen.value = !isOpen.value;
            return !isOpen.value
        }
        return {
            isDarkMode,
            isOpen,
            openMenu,
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
        width: 35px;  
        height: 25px;  
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        cursor: pointer;
        margin: 1rem;
    }

    .burger-line {
        width: 100%;   
        height: 4px;   
        background-color: #333;  
        border-radius: 5px; 
        transition: 0.5s; 
    }

    .burger-icon:hover .burger-line {
        background-color: #555;  
    }

    .burger-icon.active .line1 {
        transform: rotate(-45deg) translate(-10px, -2px);
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
        transform: rotate(45deg) translate(-10px, 2px);
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
</style>
