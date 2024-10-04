<template>
  <div class="wordle-container">
    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
      <div
        v-for="(letter, colIndex) in row"
        :key="colIndex"
        class="letter-box"
        :class="getLetterClass(rowIndex, colIndex)"
      >
        <input
          v-if="rowIndex === currentRow"
          v-model="grid[rowIndex][colIndex]"
          maxlength="1"
          @input="moveToNextLetter(colIndex)"
          class="letter-input"
        />
        <span v-else>{{ letter }}</span>
      </div>
    </div>

    <button @click="submitGuess">Submit Guess</button>
  </div>

  <v-dialog
      v-model="showDialog"
      width="auto"
    >
      <v-card
        max-width="400"
        text="Reset and play again?"
        :title="getDialogHeader()"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Play Again"
            @click="resetGame()"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
</template>

<script>
import { ref, onMounted, nextTick, onBeforeMount } from 'vue'

export default {
  setup() {
    onBeforeMount(async () => {
      await readFileToList();
      selectTheWord();
    });

    onMounted(() => {
      const row = getCurrentRow()
      row[currentCol.value].focus();

      document.addEventListener('keydown', function(event) {
        if (event.keyCode === 13){
          submitGuess();
        } else if (event.keyCode === 8 && currentCol.value > 0) {
          const row = getCurrentRow();

          if (row[currentCol.value].value === "") {
            currentCol.value--;
            row[currentCol.value].focus();
            removeLetter.value = true;
          }
        } else if (event.keyCode !== 8) {
          removeLetter.value = false;
        }
      });
    });

    const grid = ref([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""]
    ]);

    const theWord = ref("");
    const currentRow = ref(0);
    const currentCol = ref(0);
    const guesses = ref([]);
    const enterGuess = ref(false);
    const removeLetter = ref(false);
    const showDialog = ref(false);
    const allWords = ref([]);
    const win = ref(false);

    const getLetterClass = (rowIndex, colIndex) => {
      const guess = guesses.value[rowIndex];
      const correctLetter = theWord.value[colIndex];

      if (guess) {
        const letter = guess[colIndex];
        if (checkForWin(guess)){
          win.value = true;
          showDialog.value = true;
        }
        if (letter === correctLetter){
          return "correct";
        } else if (theWord.value.includes(letter)){
          return "misplaced";
        } else {
          return "incorrect";
        }
      }
      return "";
    };

    const moveToNextLetter = (colIndex) => {
      const inputs = getCurrentRow();
      if (colIndex < inputs.length - 1 && removeLetter.value === false){
        inputs[colIndex + 1].focus();
        currentCol.value = colIndex + 1
      }
    }

    const submitGuess = () => {
      const currentGuess = grid.value[currentRow.value].join("");
      if (currentGuess.length === 5) {
        guesses.value.push(currentGuess.toUpperCase());
        currentRow.value++;
        currentCol.value = 0;
        enterGuess.value = true;
        if (currentRow.value < 6){
          focusNextRow();
        } else {
          showDialog.value = true
        }
      }
    }

    const focusNextRow = () => {
      nextTick(() => {
        if (enterGuess.value) {
          const inputs = getCurrentRow();
          inputs[currentCol.value].focus();
          enterGuess.value = false;
        }
      });
    }

    const checkForWin = (guess) => {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] != theWord.value[i]){
          return false;
        }
      }
      return true;
    }

    const resetGame = () => {
      showDialog.value = false;
      guesses.value = [];
      currentCol.value = 0;
      currentRow.value = 0;
      grid.value = [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""]
      ];

      setTimeout(() => {
        selectTheWord(); 
      }, 200);

      nextTick(() => {
        const inputs = document.querySelectorAll('.letter-input');
        inputs[currentCol.value].focus();
      });
    }

    const getCurrentRow = () => {
      return document.querySelectorAll('.letter-input');
    }

    const readFileToList = async () => {
      const response = await fetch('/src/assets/wordle-solutions-08MAY2022.txt')
      if (response.ok) {
        allWords.value = await (await response.text()).split('\n');
      }
    }

    const selectTheWord = () => {
      const random = Math.floor(Math.random() * allWords.value.length);
      theWord.value = allWords.value[random].toUpperCase();
      console.log(theWord.value)
    }

    const getDialogHeader = () => {
      if (win.value){
        return "You won! The word was: " + theWord.value;
      } else {
        return "You lost. The word was: " + theWord.value;
      }
    }

    return {
      grid,
      theWord,
      currentRow,
      guesses,
      enterGuess,
      showDialog,
      allWords,
      win,
      getLetterClass,
      moveToNextLetter,
      submitGuess,
      focusNextRow,
      checkForWin,
      resetGame,
      getCurrentRow,
      readFileToList,
      selectTheWord,
      getDialogHeader,
    }
  }
}
</script>

<style scoped>
.wordle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 1rem;
}

.row {
  display: flex;
  gap: 5px;
}

.letter-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 4rem;
  border: 2px solid #d3d3d3;
}

.letter-input {
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2rem;
  text-transform: uppercase;
  border: none;
  outline: none;
}

.correct {
  background-color: #6aaa64;
  color: white;
  border-color: #6aaa64;
}

.misplaced {
  background-color: #c9b458;
  color: white;
  border-color: #c9b458;
}

.incorrect {
  background-color: #787c7e;
  color: white;
  border-color: #787c7e;
}
</style>
