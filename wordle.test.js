const evaluateGuess = require('./evaluateGuess.js');
const expect = require('chai').expect;

// Create a function to test guess evaluation
function testGuessEvaluation(wordToGuess, guess, expectedResults) {
  const result = evaluateGuess(wordToGuess, guess);

  const actualResult = result.map((letter) => ({
    index: letter.index,
    guessedLetter: letter.guessedLetter,
    status: letter.status,
  }));

  expect(actualResult).to.deep.equal(expectedResults);
}

describe('Wordle Game', function () {
  it('should evaluate a correct guess correctly', function () {
    const wordToGuess = 'apple';
    const guess = 'apple';
    const expectedResults = [
      { index: 0, guessedLetter: 'a', status: 'green' },
      { index: 1, guessedLetter: 'p', status: 'green' },
      { index: 2, guessedLetter: 'p', status: 'green' },
      { index: 3, guessedLetter: 'l', status: 'green' },
      { index: 4, guessedLetter: 'e', status: 'green' },
    ];
    testGuessEvaluation(wordToGuess, guess, expectedResults);
  });

  it('should evaluate an incorrect guess correctly', function () {
    const wordToGuess = 'apple';
    const guess = 'taple';
    const expectedResults = [
      { index: 0, guessedLetter: 't', status: 'blue' },
      { index: 1, guessedLetter: 'a', status: 'yellow' },
      { index: 2, guessedLetter: 'p', status: 'green' },
      { index: 3, guessedLetter: 'l', status: 'green' },
      { index: 4, guessedLetter: 'e', status: 'green' },
    ];
    testGuessEvaluation(wordToGuess, guess, expectedResults);
  });

  it('should evaluate another correct guess correctly', function () {
    const wordToGuess = 'honey';
    const guess = 'honey';
    const expectedResults = [
      { index: 0, guessedLetter: 'h', status: 'green' },
      { index: 1, guessedLetter: 'o', status: 'green' },
      { index: 2, guessedLetter: 'n', status: 'green' },
      { index: 3, guessedLetter: 'e', status: 'green' },
      { index: 4, guessedLetter: 'y', status: 'green' },
    ];
    testGuessEvaluation(wordToGuess, guess, expectedResults);
  });

  it('should evaluate an incorrect guess correctly', function () {
    const wordToGuess = 'clues';
    const guess = 'clear';
    const expectedResults = [
      { index: 0, guessedLetter: 'c', status: 'green' },
      { index: 1, guessedLetter: 'l', status: 'green' },
      { index: 2, guessedLetter: 'e', status: 'yellow' },
      { index: 3, guessedLetter: 'a', status: 'blue' },
      { index: 4, guessedLetter: 'r', status: 'blue' },
    ];
    testGuessEvaluation(wordToGuess, guess, expectedResults);
  });
});
