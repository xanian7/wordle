<template>
    <div class="topbar"
        :class="isDarkMode ? 'dark' : 'light'"
    >
        <BurgerItem></BurgerItem>
        <ToggleButton class="toggle-button" />
    </div>
</template>

<script>
import { defineComponent, inject, ref } from 'vue'
import ToggleButton from './ToggleButton.vue';
import BurgerItem from './Burger.vue';

export default defineComponent({
    name: 'TopBar',
    components: {
        ToggleButton,
        BurgerItem,
    },
    setup() {

        const isDarkMode = inject('isDarkMode', ref(false));
        const isNavOpen = inject('isNavOpen', ref(false));
        return {
            isDarkMode,
            isNavOpen,
        }
    },
})
</script>

<style scoped>

.topbar {
    background: white;
    width: 100vw;
    height: 7vh;
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.3);
    left: 0;
}

.toggle-button {
    position: absolute;
    right: 50px;
    display: flex;
    align-content: center;
}

</style>
