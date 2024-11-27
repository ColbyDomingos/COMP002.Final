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

    const square = event.target;
    const index = parseInt(square.id.split("-")[1]);

    if (board[index] !== "") return;

    board[index] = currentPlayer;
    square.textContent = currentPlayer;

    checkForWin();
    checkForTie();
    
    if (!gameOver) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnTracker.textContent = "Current Turn: " + currentPlayer;
    }
}

function checkForWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const condition of winConditions) {
        if (board[condition[0]] === board[condition[1]] 
            && board[condition[1]] === board[condition[2]] 
            && board[condition[0]] !== ""
        ) {

            gameOver = true;
            if (board[condition[0]] === "X") {
                xScore++;
                localStorage.setItem("xScore", xScore);
                alert("X wins!");
            } else {
                oScore++;
                localStorage.setItem("oScore", oScore);
                alert("O wins!");
            }
            updateScoreboard();
            return;
        }
    }
}

function checkForTie() {
    if(!board.includes("")) {
        gameOver = true;
        alert("It's a tie!");
    }
}

function updateScoreboard() {
    scoreboardX.textContent = xScore;
    scoreboardO.textContent = oScore;
}

function handlePLayAgainClick() {
    currentPlayer = "X";
    gameOver = false;
    board = ["", "", "", "", "", "", "", "", ""];
    turnTracker.textContent = currentPlayer;

    squares.forEach((square) => {
        square.textContent = "";
    });
}

squares.forEach((square) => {
    square.addEventListener("click", handleSquareClick);
});
playAgainButton.addEventListener("click", handlePLayAgainClick);

updateScoreboard();