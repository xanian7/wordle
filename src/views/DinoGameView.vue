<template>
  <div class="container">
    <DinoPlayer></DinoPlayer>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import DinoPlayer from '../components/Dino.vue'

export default defineComponent({
    name: 'DinoGame',
    components: {
        DinoPlayer,
    },
    setup() {
    }
})
</script>

<style>

</style>