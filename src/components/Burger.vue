<template>
    <div class="burger-icon" 
        :class="{ active: isNavOpen }"
        @click="openMenu()">
        <div class="burger-line line1"
            :class="{ 'line1-short': isNavOpen }"
        ></div>
        <div class="burger-line line2"></div>
        <div class="burger-line line3"
            :class="{ 'line3-short': isNavOpen }"
        ></div>
    </div> 
</template>

<script>
import { defineComponent, inject, ref } from 'vue'

export default defineComponent({
    name: 'BurgerItem',
    setup() {
        const isDarkMode = inject('isDarkMode', ref(false));
        const isNavOpen = inject('isNavOpen', ref(false));

        const openMenu = () => {
            isNavOpen.value = !isNavOpen.value;
            return !isNavOpen.value
        }

        return {
            isDarkMode,
            isNavOpen,
            openMenu,
        }
    },
})
</script>

<style scoped>
    .burger-icon {
        width: 30px;  
        height: 20px;  
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        cursor: pointer;
        transition: 0.3s;
        position: relative;
        margin: 2rem;
    }

    .burger-icon.active {
        transform: translateX(200px);
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
</style>