const board = document.getElementById("game-board");
const messageDis = document.getElementById("scoreboard");

let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

board.addEventListener("click", (e) => {
    const cell = e.target;
    const index = cell.getAttribute("data-index");

    if (cell.classList.contains("cell") && boardState[index] === "" && gameActive) {
        cell.textContent = currentPlayer;
        boardState[index] = currentPlayer;
        checkWin();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
});