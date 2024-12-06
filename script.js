const boardSize = 8;
const fruitTypes = ['apple', 'banana', 'cherry', 'grape', 'orange'];
let board = [];

function generateBoard() {
    board = [];
    for (let i = 0; i < boardSize; i++) {
        const row = [];
        for (let j = 0; j < boardSize; j++) {
            const fruit = fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
            row.push(fruit);
        }
        board.push(row);
    }
}

function renderBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const fruit = document.createElement('div');
            fruit.classList.add('fruit', board[i][j]);
            fruit.dataset.row = i;
            fruit.dataset.col = j;
            fruit.addEventListener('click', handleFruitClick);
            gameBoard.appendChild(fruit);
        }
    }
}

function handleFruitClick(event) {
    const fruit = event.target;
    const row = parseInt(fruit.dataset.row);
    const col = parseInt(fruit.dataset.col);

    // Mover frutas (a lógica real de troca de frutas pode ser implementada aqui)
    // Verificar se há um "match" de 3 ou mais frutas iguais
    checkMatches(row, col);
}

function checkMatches(row, col) {
    // Simples verificação de combinação (aqui é apenas um exemplo, você deve implementar a lógica para verificar combos)
    const fruit = board[row][col];

    // Exemplo básico de animação de explosão quando a fruta desaparece
    const fruitElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    fruitElement.classList.add('exploding');
    setTimeout(() => {
        fruitElement.remove();  // Remove a fruta após a animação
    }, 500);
}

function startGame() {
    generateBoard();
    renderBoard();
}

startGame();
