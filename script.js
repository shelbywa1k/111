'use strict';

// List of elements selection
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0Elemet = document.querySelector('#current--0');
const current1Elemet = document.querySelector('#current--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

// Game initial conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
let currentScore = 0;
const totalScore = [0, 0];
let activePlayer = 0;
let isPlaying = true;

diceElement.classList.add('hidden');

const switchActivePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Roll the dice

btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // Generate a random number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // Display number on the dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice${diceNumber}.png`;
    // If the number is 1, switch to the next player, else add number to a current score
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
});

// Hold points

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Add current score to active player total score
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];
    // 2. If total score of active player >=100, active player won, if now - switch active player
    if (totalScore[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      isPlaying = false;
      diceElement.classList.add('hidden');
    }
    switchActivePlayer();
  }
});

btnNew.addEventListener('click', function () {
  currentScore = 0;
  score0Element.textContent = currentScore;
  score1Element.textContent = currentScore;
  for (let i = 0; i < totalScore.length; i++) {
    totalScore[i] = 0;
  }
  console.log(totalScore);
  console.log(currentScore);
  diceElement.classList.add('hidden');
  if (player1Element.classList.contains('player--active')) {
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
  }
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  isPlaying = true;
});
