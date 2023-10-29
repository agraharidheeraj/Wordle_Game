const fs = require('fs');
const readline = require('readline');

const readandwrite = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getRandomWord() {
  return new Promise((resolve, reject) => {
    fs.readFile('./words.txt', 'utf8', (err, word) => {
      if (err) {
        reject(err);
      } else {
        const words = word.split('\n');
        const randomIndex = Math.floor(Math.random() * words.length);
        resolve(words[randomIndex].trim());
      }
    });
  });
}

async function startGame() {
  const maxAttempts = 6;
  let attempts = 0;
  let wordGuessed = false;
  const wordToGuess = await getRandomWord();

  console.log(`Welcome to Wordle! You have ${maxAttempts} attempts to guess the word.`);

  readandwrite.question('Press 1 to start the game: ', async (input) => {
    if (input !== '1') {
      console.log('Invalid input. Please press 1 to start the game.');
      readandwrite.close();
      return;
    }

    while (attempts < maxAttempts) {
      attempts++;
      const guess = await new Promise((resolve) => {
        readandwrite.question(`Guess the word (attempt ${attempts}): `, resolve);
      });

      const result = [];

      for (let i = 0; i < wordToGuess.length; i++) {
        const guessedLetter = guess[i];
        const isCorrect = guessedLetter === wordToGuess[i];
        const isPresent = wordToGuess.includes(guessedLetter);

        result.push({
          index: i,
          guessedLetter,
          isCorrect,
          isPresent,
        });
      }

      console.log(result);

      if (wordToGuess === guess) {
        wordGuessed = true;
        console.log(`Congratulations! You guessed the word: ${wordToGuess}`);
        readandwrite.close();
        break;
      } else if (attempts >= maxAttempts) {
        console.log(`Out of attempts. You Lose The Game ! The Correct word was: ${wordToGuess}`);
        readandwrite.close();
        break;
      } else {
        console.log(`Attempts left: ${maxAttempts - attempts}`);
      }
    }
  });
}
console.log('Press 1 to start the game');
startGame();