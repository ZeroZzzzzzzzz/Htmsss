const boardSize = 8;
const fruitTypes = ['apple', 'banana', 'cherry'];
let board = [];

// Função para criar o tabuleiro
function createBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';  // Limpa o tabuleiro

    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for (let j = 0; j < boardSize; j++) {
            const fruit = createFruit(i, j);
            board[i].push(fruit);
            boardElement.appendChild(fruit);
        }
    }
}

// Função para criar uma fruta
function createFruit(row, col) {
    const fruitElement = document.createElement('div');
    const randomFruit = fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
    fruitElement.classList.add('fruit', randomFruit);
    fruitElement.setAttribute('data-row', row);
    fruitElement.setAttribute('data-col', col);
    fruitElement.draggable = true;
    
    fruitElement.addEventListener('dragstart', handleDragStart);
    fruitElement.addEventListener('dragover', handleDragOver);
    fruitElement.addEventListener('drop', handleDrop);
    
    return fruitElement;
}

// Função para mover a fruta
function handleDragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
    event.target.style.opacity = '0.5';
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const draggedId = event.dataTransfer.getData('text');
    const draggedFruit = document.getElementById(draggedId);
    
    const targetFruit = event.target;
    swapFruits(draggedFruit, targetFruit);
    checkMatches();
}

// Função para trocar duas frutas no tabuleiro
function swapFruits(fruit1, fruit2) {
    const tempRow = fruit1.getAttribute('data-row');
    const tempCol = fruit1.getAttribute('data-col');
    
    fruit1.setAttribute('data-row', fruit2.getAttribute('data-row'));
    fruit1.setAttribute('data-col', fruit2.getAttribute('data-col'));
    
    fruit2.setAttribute('data-row', tempRow);
    fruit2.setAttribute('data-col', tempCol);
    
    // Trocar as classes de fruta
    const tempClass = fruit1.classList[1];
    fruit1.classList.remove(tempClass);
    fruit1.classList.add(fruit2.classList[1]);
    fruit2.classList.remove(fruit2.classList[1]);
    fruit2.classList.add(tempClass);
}

// Função para verificar as combinações de frutas
function checkMatches() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const fruit = board[i][j];
            if (checkMatch(i, j, fruit.classList[1])) {
                explodeFruit(i, j);
            }
        }
    }
}

// Função para verificar uma combinação de frutas
function checkMatch(row, col, fruitType) {
    // Verifica se há uma linha ou coluna com frutas do mesmo tipo
    return (
        (col + 2 < boardSize && board[row][col].classList[1] === board[row][col + 1].classList[1] && board[row][col].classList[1] === board[row][col + 2].classList[1]) ||
        (row + 2 < boardSize && board[row][col].classList[1] === board[row + 1][col].classList[1] && board[row][col].classList[1] === board[row + 2][col].classList[1])
    );
}

// Função para animar a explosão da fruta
function explodeFruit(row, col) {
    const fruitElement = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    fruitElement.classList.add('exploding');
    setTimeout(() => {
        fruitElement.remove();
    }, 500);  // Remove a fruta após a animação
}

// Iniciar o jogo
createBoard();
