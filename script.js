// Query selectors

var updateButton = document.getElementById("update-button");
var submitButton = document.getElementById("submit-guess");
var resetButton = document.getElementById("reset-game");
var clearButton = document.getElementById("clear-game");
var inputs = document.querySelectorAll("input");
var errors = document.getElementsByClassName("error");
var minRangeQuery = document.getElementById('min-range');
var maxRangeQuery = document.getElementById('max-range');
var minRangeSmall = document.getElementById('min-range-small');
var maxRangeSmall = document.getElementById('max-range-small');
var challengerOneName = document.getElementById('challenger-1-name');
var challengerOneGuessQuery = document.getElementById('challenger-1-guess');
var challengerTwoName = document.getElementById('challenger-2-name');
var challengerTwoGuessQuery = document.getElementById('challenger-2-guess');
var names = document.querySelectorAll('h4');
var scores = document.getElementsByClassName('challenger-result');
var text = document.getElementsByClassName('comparison');
var cardArea = document.getElementById("card-area");
var cardTemplate = document.getElementById("game-card-template");

var minRange;
var maxRange;
var random;

// Event Listeners

clearButton.addEventListener("click", function(e) {
  e.preventDefault();
  clear();
});

updateButton.addEventListener("click", function(e) {
  e.preventDefault();
  minRange = parseInt(minRangeQuery.value);
  maxRange = parseInt(maxRangeQuery.value);
  if (minRange >= maxRange) {
    minRangeQuery.value = "";
    maxRangeQuery.value = "";
   } else {
      minRangeSmall.innerText = minRange;
      maxRangeSmall.innerText = maxRange;
   }
   random = generateRandomNumber(minRange, maxRange);
   console.log(random);
  });

submitButton.addEventListener('click', function(e) {
  e.preventDefault();
  var challengerOneGuess = parseInt(challengerOneGuessQuery.value);
  var challengerTwoGuess = parseInt(challengerTwoGuessQuery.value);
  validateInput(challengerOneGuess, challengerOneGuessQuery);
  validateInput(challengerTwoGuess, challengerTwoGuessQuery);
  checkEmpty();
  names[0].innerText = challengerOneName.value;
  names[1].innerText = challengerTwoName.value;
  scores[0].innerText = challengerOneGuess;
  scores[1].innerText = challengerTwoGuess;
  checkGuess(text[0], challengerOneGuess);
  checkGuess(text[1], challengerTwoGuess);
  getWinner(challengerOneGuess, challengerTwoGuess);
});

resetButton.addEventListener("click", function(e) {
  e.preventDefault();
  for(var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  minRangeQuery.value = 1;
  maxRangeQuery.value = 100;
  reset();
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
  minRangeSmall.innerText = 1;
  maxRangeSmall.innerText = 100;
  cardArea.innerHTML = "";
  minRange = 1;
  maxRange = 100;
  random = generateRandomNumber(minRange, maxRange);
}

// Checks if input is within the range
function validateInput(num, element) {
  var minRange = parseInt(minRangeQuery.value);
  var maxRange = parseInt(maxRangeQuery.value);
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
  }
}

function addCard(winner) {
  var clone = cardTemplate.content.cloneNode(true);
  clone.querySelectorAll("span")[0].innerText = challengerOneName.value;
  clone.querySelectorAll("span")[1].innerText = challengerTwoName.value;
  clone.querySelector("h5").innerText = winner;
  cardArea.appendChild(clone);
}

function checkEmpty() {
  for(var i = 0; i < inputs.length; i++) {
    if(inputs[i].value == "") {
      inputs[i].classList.add("empty");
      errors[i].classList.remove("hidden");
    } else {
      inputs[i].classList.remove("empty");
      errors[i].classList.add("hidden");
    }
  }
}

function startGame() {
  reset();
}

startGame();
