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