// Function to evaluate a guess
function evaluateGuess(wordToGuess, guess) {
  const result = [];
  const remainingIndices = new Set([...Array(wordToGuess.length).keys()]);

  for (let i = 0; i < wordToGuess.length; i++) {
    const guessedLetter = guess[i];
    const correctLetter = wordToGuess[i];
    let status = 'blue';

    if (guessedLetter === correctLetter) {
      status = 'green';
      remainingIndices.delete(i);
    } else if (wordToGuess.includes(guessedLetter) && remainingIndices.size > 0) {
      for (const index of remainingIndices) {
        if (wordToGuess[index] === guessedLetter) {
          status = 'yellow';
          remainingIndices.delete(index);
          break;
        }
      }
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