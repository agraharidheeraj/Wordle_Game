// Function to evaluate a guess
function evaluateGuess(wordToGuess, guess) {
    const result = [];
  
    for (let i = 0; i < wordToGuess.length; i++) {
      const guessedLetter = guess[i];
      const isCorrect = guessedLetter === wordToGuess[i];
      const isPresent = wordToGuess.includes(guessedLetter);
  
      let status;
      if (isCorrect) {
        status = 'green';
      } else if (isPresent) {
        status = 'yellow';
      } else {
        status = 'blue';
      }
      result.push({
        index: i,
        guessedLetter,
        status,
      });
    }
    return result;
  }
  
  module.exports = evaluateGuess;