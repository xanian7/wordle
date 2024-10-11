<template>
    <div class="topbar">
        App
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'TopBar',
    setup() {
        
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

</style>
