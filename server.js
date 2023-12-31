const fs = require('fs');
const readline = require('readline');
const chalk = require('chalk');
const evaluateGuess = require('./evaluateGuess.js');

const readandwrite = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to read a random word from a file
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

// Function to initialize the game
function GameStartFromHere() {
  // Welcome message and explanation of letter colors
  console.log('\nWelcome to Wordle! You have 6 attempts to guess the word.');
  console.log('Letter colors: ');
  console.log(`- ${chalk.green('Green')} indicates correct letters.`);
  console.log(`- ${chalk.yellow('Yellow')} indicates correct letters in the wrong position.`);
  console.log(`- ${chalk.blue('Blue')} indicates incorrect letters.\n`);
  readandwrite.question('Press 1 to start the game: ', async (input) => {
    if (input !== '1') {
      console.log('Invalid input. Please press 1 to start the game.');
      readandwrite.close();
      return;
    }

    const wordToGuess = await getRandomWord();
    console.log(wordToGuess);
    startGame(wordToGuess);
  });
}

// Function to start the game with the chosen word
async function startGame(wordToGuess) {
  const maxAttempts = 6;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const guess = await getValidGuessFromUser(attempts);

    const result = evaluateGuess(wordToGuess, guess);
    displayResult(result);

    if (wordToGuess === guess) {
      console.log(`\nCongratulations! You guessed the right word: ${wordToGuess}\n`);
      readandwrite.close();
      break;
    } else {
      attempts++;

      if (attempts >= maxAttempts) {
        console.log(`Out of attempts. You Lose The Game! The correct word was: ${wordToGuess}`);
        readandwrite.close();
        break;
      } else {
        console.log(`\nAttempts left: ${maxAttempts - attempts}`);
      }
    }
  }
}

// Function to get a valid guess from the user
async function getValidGuessFromUser(attempts) {
  return new Promise(async (resolve) => {
    let isValid = false;
    while (!isValid) {
      const guess = await getGuessFromUser(attempts);
      if (guess.length !== 5) {
        console.log('Error: Please enter a 5-letter word.');
      } else if (wordIsInTxtFile(guess)) {
        isValid = true;
        resolve(guess);
      } else {
        console.log('Error: The word is not present in the Words.txt file.');
      }
    }
  });
}

// Function to get a guess from the user
async function getGuessFromUser(attempts) {
  return new Promise((resolve) => {
    readandwrite.question(`\nGuess the word (attempt ${attempts + 1}): `, resolve);
  });
}


// Function to check if a word is in the dictionary
function wordIsInTxtFile(word) {
  const dictionary = fs.readFileSync('./words.txt', 'utf8');
  const words = dictionary.split('\n').map((w) => w.trim());
  return words.includes(word);
}

// Function to display the result
function displayResult(result) {
  result.forEach((letter) => {
    let statusColor;
    let guessedLetterColor;

    // Assign colors based on status (green, yellow, blue)
    if (letter.status === 'green') {
      statusColor = chalk.green(letter.status);
      guessedLetterColor = chalk.green(letter.guessedLetter);
    } else if (letter.status === 'yellow') {
      statusColor = chalk.yellow(letter.status);
      guessedLetterColor = chalk.yellow(letter.guessedLetter);
    } else {
      statusColor = chalk.blue(letter.status);
      guessedLetterColor = chalk.blue(letter.guessedLetter);
    }
    console.log(`{index: ${chalk.yellow(letter.index)}, guessLetter: ${guessedLetterColor}, status: ${statusColor}}`);
  });
}

// Start the game by calling this functions
GameStartFromHere();