# Number Guesser
**Partner: Joe Johnson**

This goal of this project is to recreate a number guessing game to practice responsive design and `flex-box`. The project was created without using `grid`.

## Description
The project is created with only HTML, CSS, and JavaScript. It responds properly to resizing the window, as well as mobile viewports down to 320px width. There is a `normalize.css` file to fix any inconsistencies. As much CSS is reused as possible, and most JS functions are under 10 lines. We chose to let the HTML and JS make use of the `<template>` tag rather than `.innerHTML`.

Below is the original comp to replicate:

![The original comp](http://frontend.turing.io/assets/images/projects/number-guesser/week2-numberguesser-01.jpg)

Below is the recreated webpage:

![My completed webpage](https://i.imgur.com/YN9cXjD.png)

Mobile:

![Mobile version](https://i.imgur.com/ad0R2Ai.png)

## Getting Started

Clone the repo and open the ```index.html``` file in your web browser of choice or navigate to https://jarrettkong.github.io/Number-Guesser/ to view it in the browser.

Features:
- Inputs are disabled if the appropriate fields are empty.
- You cannot guess a outside the chosen range.
- Empty inputs are not allowed, and will display an error.
- Reset game resets the game to the initial stage, removing all previous cards and reseting the range.
- Clear game clears the challenger fields, but does not generate a new random number, therefore does not clear the range fields.
- Because both players guess at the same time, there is a draw card for ties.
- The counter will always be even because both players guess simultaneously.
- Cards are prepended to the card area, and the most recent card is shown at the top.
- Cards can be manually removed with the close button.
- Upon winning, but not a draw , the range is automatically adjusted by ±10.
- The card area is a fixed height, and is scrollable if there are enough cards.

### How to Play

The object of the game is to correctly guess a random number between a set range. You need at least two people to play Number Guesser. When the page opens a random number is generated between the default range of 1-100. The users can change this range and generate a new random number within the desired range in the set range input fields. Next you will fill in the name of each user as well as their guess of what the random number is. After submitting guesses, the "Latest Score" section will update with the results of the guess, and if a player guesses correctly, the card area will update with the stats from the game. A new game is then started automatically with the new range.

## Known Issues

- The timer is not implemented.
