'use strict';

//*********** Selecting elements ***********//

// for give id we can use this method(getElementById) too but with write #
const score0El = document.querySelector('#score--0');
// for give id we have this method(getElementById) to call that without write #
// its work faster than querySelector
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0'); //First side
const player1El = document.querySelector('.player--1'); //Second side

const dicePicture = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//*********** Starting conditions ***********//

// they're only available inside of this initialization function So i define outside of function
let scores, activePlayer, currentScore, playing;
const initialization = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  dicePicture.classList.add('hidden');

  scores = [0, 0]; // Its total score
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  dicePicture.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('Player--active');
  player1El.classList.remove('Player--active');
};

initialization();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // Switch to next player
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//*********** Rolling dice functionality ***********//
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    dicePicture.src = `dice-${dice}.png`;
    dicePicture.classList.remove('hidden');

    // 3. Check for rolled number 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// A function to cast the current score to the total score
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if players score is >= 100 finish the game

    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      // dicePicture.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch to the next player
      switchPlayer();
    }
  }
});

// A function for new game
btnNew.addEventListener('click', initialization);
