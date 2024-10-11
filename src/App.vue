<template>
  <body>
    <TopBar></TopBar>
    <ToggleButton></ToggleButton>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/wordle">Worlde</RouterLink>
    </nav>
    <RouterView />
  </body>
</template>

<script>
import { defineComponent, ref } from 'vue';
import ToggleButton from './components/ToggleButton.vue';
import TopBar from './components/TopBar.vue';

export default defineComponent ({
  name: 'App',
  components: {
    ToggleButton,
    TopBar,
  },
  
  setup() {
    
  },
})
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
