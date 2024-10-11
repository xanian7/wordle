<template>
    <div class="topbar"
        :class="isDarkMode ? 'dark' : 'light'"
    >
        <ToggleButton class="toggle-button" />
    </div>
</template>

<script>
import { defineComponent, inject, ref } from 'vue'
import ToggleButton from './ToggleButton.vue';

export default defineComponent({
    name: 'TopBar',
    components: {
        ToggleButton,
    },
    setup() {

        const isDarkMode = inject('isDarkMode', ref(false));
        return {
            isDarkMode,
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
    align-content: center;
    top: 0;
    box-shadow: 0 10px 10px -5px rgba(0, 0, 0, 0.3);
    left: 0;
}

.toggle-button {
    position: absolute;
    left: 95vw;
    top: 2vh;
    display: flex;
    align-content: center;
}

</style>
