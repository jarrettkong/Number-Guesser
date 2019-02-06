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
var drawTemplate = document.getElementById("draw-template");

var minRange;
var maxRange;
var random;
var count = 0;
var timer;

// Event Listeners

clearButton.addEventListener("click", function(e) {
  e.preventDefault();
  clear();
});

updateButton.addEventListener("click", function(e) {
  e.preventDefault();
  minRange = parseInt(minRangeQuery.value);
  maxRange = parseInt(maxRangeQuery.value);
  if(!checkEmpty(0,1) && validateRange(minRange, maxRange)) {
    minRangeSmall.innerText = minRange;
    maxRangeSmall.innerText = maxRange;
    random = generateRandomNumber(minRange, maxRange);
    console.log(random);
  }
});

submitButton.addEventListener('click', function(e) {
  e.preventDefault();
  var challengerOneGuess = parseInt(challengerOneGuessQuery.value);
  var challengerTwoGuess = parseInt(challengerTwoGuessQuery.value);
    validateGuess(challengerOneGuess, challengerOneGuessQuery);
    validateGuess(challengerTwoGuess, challengerTwoGuessQuery);
  if(!checkEmpty(2,5)) {
    count += 2;
    updateResults(challengerOneGuess, challengerTwoGuess);
    getWinner(challengerOneGuess, challengerTwoGuess, count);
  }
});

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keyup', disableButtons);
}

function updateResults(guess1, guess2) {
  names[0].innerText = challengerOneName.value;
  names[1].innerText = challengerTwoName.value;
  scores[0].innerText = guess1;
  scores[1].innerText = guess2;
  checkGuess(text[0], guess1);
  checkGuess(text[1], guess2);
}

resetButton.addEventListener("click", function(e) {
  e.preventDefault();
  for(var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  // minRangeQuery.value = 1;
  // maxRangeQuery.value = 100;
  reset();
});

cardArea.addEventListener('click', function(event) {
  if (event.target.className === 'close-card') {
    event.target.parentNode.parentNode.parentNode.remove()
  }
});

function clear() {
  inputs[0] = minRange;
  inputs[1] = maxRange;
  for(var i = 2; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function reset() {
  cardArea.innerHTML = "";
  minRange = 1;
  maxRange = 100;
  newGame();
  resetResults();
  disableButtons();
}

function newGame() {
  for(i = 2; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  minRangeSmall.innerText = minRange;
  maxRangeSmall.innerText = maxRange;
  random = generateRandomNumber(minRange, maxRange);
}

function resetResults() {
  for(var i = 0; i < 2; i++) {
    names[i].innerText = "-";
    scores[i].innerText = "--";
    text[i].innerText = "-";
  }
}

function validateGuess(num, element) {
  var minRange = parseInt(minRangeQuery.value);
  var maxRange = parseInt(maxRangeQuery.value);
  if(num < minRange || num > maxRange) {
    element.value = "";
  }
}

function generateRandomNumber(min, max) {
  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}

function getWinner(guess1, guess2, count) {
  var winner;
  if (guess1 === random && guess2 === random) {
    addDraw(count);
    newGame();
  } else if (guess1 === random && guess2 !== random) {
    winner = challengerOneName.value;
    addCard(winner, count);
    changeRange();
    newGame();
  } else if (guess2 === random && guess1 !== random) {
    winner = challengerTwoName.value;
    addCard(winner, count);
    changeRange();
    newGame();
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

function addDraw(count) {
  var clone = drawTemplate.content.cloneNode(true);
  clone.getElementById("game-card-c1").innerText = challengerOneName.value;
  clone.getElementById("game-card-c2").innerText = challengerTwoName.value;
  clone.querySelector(".winner").innerText = "Draw";
  clone.querySelector(".count").innerText = count;
  cardArea.appendChild(clone);
}

function addCard(winner, count) {
  var clone = cardTemplate.content.cloneNode(true);
  clone.getElementById("game-card-c1").innerText = challengerOneName.value;
  clone.getElementById("game-card-c2").innerText = challengerTwoName.value;
  clone.querySelector(".winner").innerText = winner;
  clone.querySelector(".count").innerText = count;
  cardArea.appendChild(clone);
}

function validateRange(min, max) {
  var valid = false;
  if(min >= max) {
    minRangeQuery.value = "";
    errors[0].classList.remove('hidden');
    minRangeQuery.classList.add('empty');
  } else {
    errors[0].classList.add('hidden');
    minRangeQuery.classList.remove('empty');
    valid = true;
  }
  return valid;
}

function checkEmpty(start, end) {
  var empty = false;
  for(var i = start; i < end + 1; i++) {
    if(inputs[i].value == "") {
      inputs[i].classList.add("empty");
      errors[i].classList.remove("hidden");
      empty = true;
    } else {
      inputs[i].classList.remove("empty");
      errors[i].classList.add("hidden");
    }
  }
  return empty;
}

function startGame() {
  minRange = 1;
  maxRange = 100;
  newGame();
}

startGame();

function disableButtons(e) {
    if (minRangeQuery.value !== ''
      || maxRangeQuery.value !== ''
      || challengerOneName.value !== ''
      || challengerOneGuessQuery.value !== ''
      || challengerTwoName.value !== ''
      || challengerTwoGuessQuery.value !== '')
    {
      resetButton.disabled = false;
      clearButton.disabled = false;
    } else {
      resetButton.disabled = true;
      clearButton.disabled = true;
    }
}

function changeRange(e) {
  minRange -= 10;
  maxRange += 10;
}