<template>
  <div class="game" :class="isDarkMode ? 'dark' : 'light'">
    <DinoPlayer ref="dino" class="dino"></DinoPlayer>
    <Cactus v-for="(cactus, index) in cacti" 
      :key="index" 
      ref="cactusRefs" 
      :cactusPosition="cactus.position" 
    >
    </Cactus>

    <div class="ground">
      <div v-for="(dirt, index) in dirtSpecs" :key="index" class="dirt" 
         :style="{ left: dirt.position + 'px', bottom: dirt.yOffset + 'px' }"></div>
    </div>

    <div v-if="showDialog" class="start-dialog"
      :class="isDarkMode ? 'dark' : 'light'"
    >
      <div class="start-button-content">
        <h1>Dino Game</h1>
        <p>Score: {{ score }}</p>
        <button @click="clickPlay()" class="start-button"
          :class="isDarkMode ? 'dark' : 'light'"
        >Play</button>
        <button @click="routeToHome()" class="back-button"
          :class="isDarkMode ? 'dark' : 'light'"
        >Back to Home</button>
      </div>
    </div>
    <div class="score">SCORE: {{ score }}</div>
  </div>
</template>

<script>
import { defineComponent, ref, inject, onMounted } from 'vue';
import DinoPlayer from '../components/Dino.vue'
import Cactus from '../components/Cactus.vue';
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'DinoGame',
    components: {
        DinoPlayer,
        Cactus,
    },
    setup() {
      const isDarkMode = inject('isDarkMode', ref(false));

      const router = useRouter();
      const showCactus = ref(true);
      const cactusPosition = ref(800);
      const score = ref(0);
      const gameInterval = ref(null);
      const showDialog = ref(true);
      const cacti = ref([]);
      const dino = ref(null);
      const cactusRefs = ref([]);
      const gameOver = ref(true);
      const speed = ref(50);
      const cactusSpeed = ref(10);
      const maxCacti = ref(3);
      const spawnInterval = ref(null);
      const dirtSpecs = ref([]);
      const numDirtSpecs = ref(75);

      onMounted(() => {
        initializeDirtSpecs();
      });

      const startGame = () => {
        if (gameInterval.value) {
          clearInterval(gameInterval.value);
        }
        clearSpawnInterval();

        gameInterval.value = setInterval(() => {
          moveCactus();
          moveDirtSpecs();
          detectCollision();
        }, speed.value);

        spawnCactus();
      }

      const clickPlay = () => {
        showDialog.value = false;
        score.value = 0;
        if (gameInterval.value) {
          clearInterval(gameInterval.value);
        }

        clearSpawnInterval();
        gameInterval.value = null;
        cacti.value.length = 0;
        dino.value = null;
        cactusRefs.value = null;
        gameOver.value = false;
        gameInterval.value = null;

        startGame();
      }

      const spawnCactus = () => {
        const random = Math.random() * 3000 + 1000;

        spawnInterval.value = setTimeout(() => {
          if (cacti.value.length < maxCacti.value) {
            cacti.value.push({
              position: 800,
            });
          }

          spawnCactus();

        }, random)
      }

      const clearSpawnInterval = () => {
        if (spawnInterval.value) {
          clearTimeout(spawnInterval.value);
          spawnInterval.value = null;
        }
      };

      const moveCactus = () => {
        if (!gameOver.value) {
          score.value++;
          cacti.value = cacti.value.map(cactus => {
            cactus.position -= cactusSpeed.value;
            return cactus;
          }).filter(cactus => cactus.position > 0);
        }
      }

      const detectCollision = () => {
        if (!dino.value || !dino.value.$el) return;

        const dinoElement = dino.value.$el;
        const dinoRect = dinoElement.getBoundingClientRect();

        if (cactusRefs.value) {
          cactusRefs.value.forEach((cactusComponent) => {
            if (!cactusComponent || !cactusComponent.$el) return;

            const cactusRect = cactusComponent.$el.getBoundingClientRect()

            if (dinoRect.right > cactusRect.left &&
              dinoRect.left < cactusRect.right &&
              dinoRect.bottom > cactusRect.top) {
                gameOver.value = true;
                showDialog.value = true;

                clearInterval(gameInterval.value);
                clearSpawnInterval();
            }
          });
        }
      }

      const initializeDirtSpecs = () => {
        dirtSpecs.value = Array.from({ length: numDirtSpecs.value }, () => ({
          position: Math.random() * 800,
          yOffset: Math.random() * 15,
        }));
      };

      const moveDirtSpecs = () => {
        dirtSpecs.value = dirtSpecs.value.map(dirt => {
          dirt.position -= cactusSpeed.value
          if (dirt.position < 0) {
            dirt.position = 800;
            dirt.yOffset = Math.random() * 15;
          }
          return dirt;
        });
      };

      const routeToHome = () => {
        router.push({name: 'home'})
      }

      return {
        showCactus,
        cactusPosition,
        score, 
        gameInterval,
        showDialog,
        cacti,
        cactusRefs,
        dino,
        speed,
        cactusSpeed,
        router,
        isDarkMode,
        maxCacti,
        spawnInterval,
        dirtSpecs,
        numDirtSpecs,
        startGame, 
        moveCactus,
        spawnCactus,
        detectCollision,
        clickPlay,
        routeToHome,
        clearSpawnInterval,
        initializeDirtSpecs,
        moveDirtSpecs,
      }
    }
})
</script>

<style>

.game {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 500px;
  background: gray;
  border: 2px solid #000000;
}

.dark .game {
  background: #000000;
}

.start-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.dino {
  position: absolute;
  left: 25px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

p {
  margin-bottom: 20px;
  font-family: 'tiny5';
}

.start-button-content {
  background: white;
  padding: 40px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

.start-button {
  background-color: #757575;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin: 5px;
}

.dark .start-button-content{
  color: black;
  background: #3A3A3C;
}

.back-button {
  background-color: #aa6464;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin: 5px;
}

.score {
  position: absolute;
  top: 0;
  font-family: 'tiny5';
}

.ground {
  position: absolute;
  width: 100%;
  height: 16px;
  bottom: 0;
  border-top: 2px solid #535353;
}

.dirt {
  width: 2px;
  height: 2px;
  background-color: #535353;
  position: absolute;
  bottom: 0; 
}

</style>