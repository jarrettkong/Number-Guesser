var updateButton = document.getElementById("update-button"); // update buttons
var submitButton = document.getElementById("submit-guess"); // Submit guess button
var resetButton = document.getElementById("reset-game"); // Reset game button
var clearButton = document.getElementById("clear-game"); // Clear game button

var inputs = document.querySelectorAll("input");
var arenaInputs = document.querySelectorAll('#arena input');

// Range Inputs
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

var comparisonText = document.getElementsByClassName('comparison');

var random;

// Clear forms function
function clear() {
  for(var i = 0; i < inputs.length; i++) { //inputs.length = 6;
    inputs[i].value = "";
  }
};

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
  var minRange = Number(minRangeQuery.value);
  var maxRange = Number(maxRangeQuery.value);
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

  checkGuess(comparisonText[0], challengerOneGuess);
  checkGuess(comparisonText[1], challengerTwoGuess);
});

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
  var randNum = (Math.floor(Math.random() * max)) + min;
  return randNum;
}

function checkGuess(player, num) {
  if(num < random) {
    player.innerText = "too low";
  } else if (num > random) {
    player.innerText = "too high";
  } else {
    player.innerText = "BOOM!";
  }
}
