const gameBoard = document.getElementById("game-board"); // Gets the game board from the HTML file
const squares = document.querySelectorAll(".game-square"); // Gets the squares declared by the HTML file
const turnTracker = document.getElementById("turn-tracker"); // Gets the turn tracker from the HTMl file
const scoreboardX = document.getElementById("scoreboard-x"); // Gets the scoreboard for x element from the HTML file
const scoreboardO = document.getElementById("scoreboard-o"); // Gets the scoreboard for o element from the HTML file
const playAgainButton = document.getElementById("button-play-again"); // Gets the play again button from HTML file

let currentPlayer = "X"; //Initially sets the player to X and only X
let gameOver = false; // Initially the game is not over to prevent loops
let board = ["", "", "", "", "", "", "", "", ""]; // Sets the board to empty by default
let xScore = parseInt(localStorage.getItem("xScore")) || 0; // Sets the score to 0 if no local storage for X and gets it from local storage
let oScore = parseInt(localStorage.getItem("oScore")) || 0; // Sets the score to 0 if no local storage for O and gets it from local storage

function handleSquareClick(event) { // Handles the click event for each square with some basic game logic
    if (gameOver) return; // If the game is over, continue on to the next part of code

    const square = event.target; // Gets the square that was clicked
    const index = parseInt(square.id.split("-")[1]); // Gets the index of the square

    if (board[index] !== "") return; // If the square is not empty, continue on to the next part of code

    board[index] = currentPlayer; // Sets the square to the current player
    square.textContent = currentPlayer; // Sets the text of the square to the current player

    checkForWin(); // Calls the check for win function
    checkForTie(); // Calls the check for tie function
    
    if (!gameOver) { // If the game is not over
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switches the current player
        turnTracker.textContent = "Current Turn: " + currentPlayer; // Updates the turn tracker
    } 
}

function checkForWin() { //Entire logic for checking for a win
    const winConditions = [ // Sets the win conditions for possible win combinations
        [0, 1, 2], // Win condition 1
        [3, 4, 5], // Win condition 2
        [6, 7, 8], // Win condition 3
        [0, 3, 6], // Win condition 4 
        [1, 4, 7], // Win condition 5
        [2, 5, 8], // Win condition 6
        [0, 4, 8], // Win condition 7
        [2, 4, 6], // Win condition 8
    ];

    for (const condition of winConditions) { // Loops through the win conditions checking for a winning combination
        if (board[condition[0]] === board[condition[1]]  // If the three squares in the win condition are the same
            && board[condition[1]] === board[condition[2]]  // If the three squares in the win condition are the same
            && board[condition[0]] !== "" // If the three squares in the win condition are not empty
        ) {

            gameOver = true; // Stops the game
            if (board[condition[0]] === "X") {  // If the three squares in the win condition are X
                xScore++; // Adds 1 to the X score
                localStorage.setItem("xScore", xScore); // Sets the X score to local storage
                alert("X wins!"); // Alerts X wins
            } else { // If the three squares in the win condition are O
                oScore++; // Adds 1 to the O score
                localStorage.setItem("oScore", oScore); // Sets the O score to local storage
                alert("O wins!"); // Alerts O wins
            }
            updateScoreboard(); // Updates the scoreboard
            return; // Exits the function
        }
    }
}

function checkForTie() { // Its in the name it checks for a tie
    if(!board.includes("") && !checkForWin) { // If the board does not contain an empty string
        gameOver = true; // Stops the game
        alert("It's a tie!"); // Alerts it's a tie
    }
}

function updateScoreboard() { // Updates the scoreboard at the bottom of the page
    scoreboardX.textContent = xScore; // Sets the X score to the scoreboard
    scoreboardO.textContent = oScore; // Sets the O score to the scoreboard
}

function handlePLayAgainClick() { // Handles the click event for the play again button
    currentPlayer = "X"; // Sets the current player to X no matter what
    gameOver = false; // Sets the game over to false
    board = ["", "", "", "", "", "", "", "", ""]; // Sets the board to empty
    turnTracker.textContent = currentPlayer; // Sets the turn tracker to the current player

    squares.forEach((square) => { // Loops through the squares
        square.textContent = ""; // Sets the text of the square to empty
    });
}

squares.forEach((square) => { // Loops through the squares
    square.addEventListener("click", handleSquareClick); // Adds a click event listener to each square
});
playAgainButton.addEventListener("click", handlePLayAgainClick); // Adds a click event listener to the play again button

updateScoreboard(); // Updates the scoreboard at the bottom of the page