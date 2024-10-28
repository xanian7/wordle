<template>
  <div class="home">
    <h1> {{ displayText }}</h1>
  </div>
</template>

<script>
import { defineComponent, ref, provide, onMounted } from 'vue';

export default defineComponent ({
  name: 'HomeView',
  components: {

  },
  
  setup() {
    const isDarkMode = ref(false);
    const isNavOpen = ref(false);
    provide('isDarkMode', isDarkMode);
    provide('isNavOpen', isNavOpen);

    const i = ref(0)
    const text = 'x.kraem.com';
    const displayText = ref('');

    onMounted(() => {
      typeWriter();
    });

    const typeWriter = () => {
      let speed = 200;
      if (i.value < text.length) {
        displayText.value += text.charAt(i.value);
        i.value++;
        setTimeout(typeWriter, speed);
      }
    }

    return {
      isDarkMode,
      isNavOpen,
      displayText,
      typeWriter,
    }
  },
})
</script>


<style scoped>
  .home {
    font-family: 'tiny5';
  }
</style>
