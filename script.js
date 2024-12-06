const board = document.getElementById("gameBoard");
const fruits = ["🍎", "🍌", "🍇", "🍓", "🍊", "🍍"];
const rows = 6, cols = 6;
let gameBoard = Array(rows).fill(null).map(() => Array(cols).fill(null));

function createBoard() {
    board.innerHTML = "";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            gameBoard[i][j] = fruits[Math.floor(Math.random() * fruits.length)];
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.innerText = gameBoard[i][j];
            board.appendChild(tile);
        }
    }
}
createBoard();
