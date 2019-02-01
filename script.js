var updateButton = document.getElementById("update-button"); // update buttons
var submitButton = document.getElementById("submit-guess"); // Submit guess button
var resetButton = document.getElementById("reset-game"); // Reset game button
var clearButton = document.getElementById("clear-game"); // Clear game button

var inputs = document.querySelectorAll("input");
var arenaInputs = document.querySelectorAll('#arena input');

// Range Inputs

var minRange;
var maxRange;

var minRangeQuery = document.getElementById('min-range'); // Min range user input
//var minRange = Number(minRangeQuery.value);
var maxRangeQuery = document.getElementById('max-range'); // Max range user input
//var maxRange = Number(maxRangeQuery.value);

var minRangeSmall = document.getElementById('min-range-small'); // Min Range Small
var maxRangeSmall = document.getElementById('max-range-small'); // Max Range Small

// Challenger One Inputs
var challengerOneName = document.getElementById('challenger-1-name');
var challengerOneGuessQuery = document.getElementById('challenger-1-guess');

//Challeneger Two Inputs
var challengerTwoName = document.getElementById('challenger-2-name');
var challengerTwoGuessQuery = document.getElementById('challenger-2-guess');

// Score Card Variables
var names = document.querySelectorAll('h4');
var scores = document.getElementsByClassName('challenger-result');

var text = document.getElementsByClassName('comparison');

var cardArea = document.getElementById("card-area");
var cardTemplate = document.getElementById("game-card-template");

var random;

// Clear button functionality
clearButton.addEventListener("click", function(e) {
  e.preventDefault();
  clear();
});

// Reset button functionality
resetButton.addEventListener("click", function(e) {
  e.preventDefault();
  clear();
  // Clear cards
  // Reset range to 1-100

});

// Set Range
updateButton.addEventListener("click", function(e) {
  e.preventDefault();
  minRange = Number(minRangeQuery.value);
  maxRange = Number(maxRangeQuery.value);
  // console.log(minRange, maxRange);
  if (minRange >= maxRange) {
    alert('Please make sure the minimum is less than the maximum.');
    clear(); // clears all fields, not just range. Change later?
   } else {
      minRangeSmall.innerText = minRange;
      maxRangeSmall.innerText = maxRange;
   }
   // Assigns random number between minRange and maxRange to random
   random = generateRandomNumber(minRange, maxRange);
   console.log(random);
  });

//
submitButton.addEventListener('click', function(e) {
  e.preventDefault();
  //covert input query to number data type
  var challengerOneGuess = Number(challengerOneGuessQuery.value);
  var challengerTwoGuess = Number(challengerTwoGuessQuery.value);

  validateInput(challengerOneGuess, challengerOneGuessQuery);
  validateInput(challengerTwoGuess, challengerTwoGuessQuery);

  //change name in score section
  names[0].innerText = challengerOneName.value;
  names[1].innerText = challengerTwoName.value;

  //change guess in score seciton
  scores[0].innerText = challengerOneGuess;
  scores[1].innerText = challengerTwoGuess;

  checkGuess(text[0], Number(challengerOneGuessQuery.value));
  checkGuess(text[1], Number(challengerTwoGuessQuery.value));

  getWinner();

});

resetButton.addEventListener("click", function(e) {
  e.preventDefault();
});

// Clear forms function
function clear() {
  inputs[0] = minRange;
  inputs[1] = maxRange;
  for(var i = 2; i < inputs.length; i++) { //inputs.length = 6;
    inputs[i].value = "";
  }
}

function reset() {

}

// Checks if input is within the range
function validateInput(num, element) {
  var minRange = Number(minRangeQuery.value);
  var maxRange = Number(maxRangeQuery.value);
  if(num < minRange || num > maxRange) {
    alert("Please enter a number within the correct range");
    element.value = "";
  }
}

// Generates random number between min and max
function generateRandomNumber(min, max) {
  var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNum;
}

function getWinner(guess1, guess2) {
  var winner;
  if (guess1 === random && guess2 === random) {
    // Draw
  } else if (guess1 === random && guess2 !== random) {
    winner = challengerOneName.value;
    addCard(winner);
  } else if (guess2 === random && guess1 !== random) {
    winner = challengerTwoName.value;
    addCard(winner);
  }
}

function checkGuess(text, guess) {
  if(guess < random) {
    text.innerText = "too low";
  } else if (guess > random) {
    text.innerText = "too high";
  } else {
    text.innerText = "BOOM!";
    getWinner(Number(challengerOneGuessQuery.value), Number(challengerTwoGuessQuery.value));
  }
}

function addCard(winner) {
  // Recursively clones the HTML in the <template>
  var clone = cardTemplate.content.cloneNode(true);
  updateCard(clone, winner);
  // cardArea.insertBefore(clone, cardArea.childNodes[0]);
}

function updateCard(clone, winner) {
  clone.querySelectorAll("span")[0].innerText = challengerOneName.value;
  clone.querySelectorAll("span")[1].innerText = challengerTwoName.value;
  clone.querySelector("h5").innerText = winner;
  cardArea.appendChild(clone);
}

function startGame() {
  minRange = 1;
  maxRange = 100;

  minRangeSmall.innerText = minRange;
  maxRangeSmall.innerText = maxRange;

  random = generateRandomNumber(minRange, maxRange);
}

startGame();
