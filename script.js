const gameBoard = document.getElementById("game-board");
const squares = document.querySelectorAll(".game-square");
const turnTracker = document.getElementById("turn-tracker");
const scoreboardX = document.getElementById("scoreboard-x");
const scoreboardO = document.getElementById("scoreboard-o");
const playAgainButton = document.getElementById("button-play-again");

let currentPlayer = "X";
let gameOver = false;
let board = ["", "", "", "", "", "", "", "", ""];
let xScore = parseInt(localStorage.getItem("xScore")) || 0;
let oScore = parseInt(localStorage.getItem("oScore")) || 0;

function handledSquareClick(event) {
    if (gameOver) return;

    const square = event.target;
    const index = parseInt(square.id.split("-")[1]);

    if (board[index] === "") return;

    board[index] = currentPlayer;
    square.textContent = currentPlayer;
    
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnTracker.textContent = currentPlayer;
}

function checkForWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combination of winConditions) {
        if (board[condition[0]] === board[condition[1]] && board[condition[1]] === board[condition[2]] && board[condition[0]] !== "") {
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
    square.addEventListener("click", handledSquareClick);
});
playAgainButton.addEventListener("click", handlePLayAgainClick);

updateScoreboard();