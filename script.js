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

function checkWin() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') continue: 
        if (boardState[a] === boardState[b] && boardState[b] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        messageDis.textContent = `${currentPlayer} wins!`;
        return;
    }

    if(!boardState.includes("")) {
        gameActive = false;
        messageDis.textContent = "Draw!";
    }
}