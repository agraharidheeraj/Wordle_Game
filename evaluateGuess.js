function evaluateGuess(wordToGuess, guess) {
  const result = [];
  const remainingLetters = [...wordToGuess];

  markCorrectLetters(result, guess, remainingLetters);
  markIncorrectLetters(result, guess, remainingLetters);

  result.sort((a, b) => a.index - b.index);

  return result;
}

function markCorrectLetters(result, guess, remainingLetters) {
  for (let i = 0; i < guess.length; i++) {
    const guessedLetter = guess[i];
    const isCorrect = guessedLetter === remainingLetters[i];

    if (isCorrect) {
      remainingLetters[i] = null;
      result.push({
        index: i,
        guessedLetter,
        status: "green",
      });
    } else {
      result.push({
        index: i,
        guessedLetter,
        status: "blue",
      });
    }
  }
}

function markIncorrectLetters(result, guess, remainingLetters) {
  for (let i = 0; i < guess.length; i++) {
    if (
      result[i].status === "blue" &&
      remainingLetters.includes(guess[i])
    ) {
      const correctPlace = remainingLetters.indexOf(guess[i]);
      remainingLetters[correctPlace] = null;
      result[i].status = "yellow";
    }
  }
}

module.exports = evaluateGuess;
