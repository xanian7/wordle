<template>
  <div class="wordle-container">
    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
      <div
        v-for="(letter, colIndex) in row"
        :key="colIndex"
        class="letter-box"
        :class="getLetterClass(letter.toUpperCase(), rowIndex, colIndex)"
      >
        <input
          v-if="rowIndex === currentRow"
          v-model="grid[rowIndex][colIndex]"
          maxlength="1"
          @input="moveToNextLetter(colIndex)"
          @blur="keepFocus()"
          class="letter-input"
        />
        <span v-else>{{ letter }}</span>
      </div>
    </div>

    <!--<button @click="submitGuess">Submit Guess</button>-->

    <div class="keyboard">
      <div v-for="(row, rowIndex) in keyboardRows" :key="rowIndex" class="row">
        <button v-for="key in row" :key="key" @click="simulateKeyPress(key)">
          {{ key }}
        </button>

      </div>
    </div>
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
import { ref, onMounted, nextTick, onBeforeMount, reactive } from 'vue'

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

    const keepFocus = () => {
      const inputs = getCurrentRow();
      inputs[currentCol.value].focus;
    }

    const simulateKeyPress = (key) => {
      const event = new KeyboardEvent('keydown', {
        key: key,
        bubbles: true,
        cancelable: true,
      });
      keepFocus();
      console.log(key)
      setTimeout(() => {
        document.dispatchEvent(event);
      }, 200);
    }

    const grid = ref([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""]
    ]);

    const keyboardRows = ref([
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
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
    const alreadyGuessed = reactive([]);
    const theWordCopy = ref("");
    const allLetters = reactive([]);

    const getLetterClass = (letter, rowIndex, colIndex) => {
      const guess = guesses.value[rowIndex];
      const correctLetter = theWord.value[colIndex];

      if (guess) {
        if (guess.length === 5) {

          if (!alreadyGuessed[rowIndex]) {
            alreadyGuessed[rowIndex] = [];
          }

          // If the letter is already guessed for this position, return its class
          if (alreadyGuessed[rowIndex][colIndex]) {
            return alreadyGuessed[rowIndex][colIndex].class;
          }

          if (alreadyGuessed[rowIndex][colIndex]) {
            return alreadyGuessed[rowIndex][colIndex].class;
          }
            
          if (checkForWin(guess)){
            win.value = true;
            showDialog.value = true;
          }

          let letterClass = ""
          if (letter === correctLetter){
            theWordCopy.value = removeLetterAtIndex(theWordCopy.value, colIndex);
            for (let i = 0; i < allLetters.length; i++) {
              if (allLetters[i].letter === letter) {
                if (allLetters[i].count > 0) {
                  allLetters[i].count--;
                  console.log(allLetters[i])
                  break;
                }
              }
            }
            letterClass = "correct";
          } else if (theWordCopy.value.includes(letter)){
            for (let i = 0; i < allLetters.length; i++) {
              if (allLetters[i].letter === letter) {
                  for (let ii = 0; ii < guess.length; ii++) {
                    if (theWord.value[ii] === guess[ii] && guess[ii] === letter) {
                      allLetters[i].count--;
                    }
                  }
                
                if (allLetters[i].count > 0) {
                  letterClass = "misplaced";
                  allLetters[i].count--;
                  break;
                } else {
                  letterClass = "incorrect";
                  break;
                }
              }
            }
          } else {
            letterClass = "incorrect";
          }

          alreadyGuessed[rowIndex][colIndex] = {letter: letter, class: letterClass}

          return letterClass
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
        theWordCopy.value = theWord.value;
        if (currentRow.value < 6){
          focusNextRow();
        } else {
          showDialog.value = true
        }
        getAllLetters();
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
        allWords.value = (await response.text()).split('\n');
      }
    }

    const selectTheWord = () => {
      const random = Math.floor(Math.random() * allWords.value.length);
      theWord.value = allWords.value[random].toUpperCase();
      theWordCopy.value = theWord.value;
      console.log(theWord.value)

      getAllLetters();
    }

    const getAllLetters = () => {
      allLetters.length = 0; 
      for (let i = 0; i < theWord.value.length; i++){
        let letterExists = false;

        for (let ii = 0; ii < allLetters.length; ii++) {
          if (allLetters[ii].letter === theWord.value[i]) {
            allLetters[ii].count++; 
            letterExists = true;
            break;
          }
        }

        if (!letterExists) {
          allLetters.push({ letter: theWord.value[i], count: 1 });
        }
      }
    }

    const getDialogHeader = () => {
      if (win.value){
        return "You won! The word was: " + theWord.value;
      } else {
        return "You lost. The word was: " + theWord.value;
      }
    }

    const removeLetterAtIndex = (str, index) => {
      // If the index is out of bounds, return the string unchanged
      if (index < 0 || index >= str.length) {
        return str;
      }

      // Use slice to remove the letter at the specified index
      return str.slice(0, index) + str.slice(index + 1);
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
      alreadyGuessed,
      allLetters,
      keyboardRows,
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
      removeLetterAtIndex,
      getAllLetters,
      simulateKeyPress,
      keepFocus,
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

.keyboard {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.row {
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
}

button {
  min-width: 40px;
  min-height: 40px;
  font-size: 1.2rem;
  background-color: #eee;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #ccc;
}
</style>
