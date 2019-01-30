var updateButton = document.getElementById("update-button");
var submitButton = document.getElementById("submit-guess"); // Submit guess button
var resetButton = document.getElementById("reset-game"); // Reset game button
var clearButton = document.getElementById("clear-game"); // Clear game button

var inputs = document.querySelectorAll("input");

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
