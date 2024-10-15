<template>
  <img src="../components/icons/cactus.png" class="cactus" :style="{ left: cactusPosition + 'px' }"/>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent ({
    name: 'CactusComponent',
    props: {
        cactusPosition: Number,
    },
    setup(props) {
        return { props };
    },
})
</script>

<style>
    .cactus {
        width: 20px;
        height: 40px;
        position: absolute;
        bottom: 0;
    }
</style>