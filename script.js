// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    let board = Array(9).fill(null);
    let currentPlayer = 'x';
    let gameActive = true;

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

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === player;
            });
        });
    }

    function checkDraw() {
        return board.every(cell => cell !== null);
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (board[index] !== null || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer.toUpperCase();
        event.target.classList.add(currentPlayer, 'active');

        if (checkWin(currentPlayer)) {
            message.textContent = `${currentPlayer.toUpperCase()} wins!`;
            gameActive = false;
        } else if (checkDraw()) {
            message.textContent = 'Draw!';
            gameActive = false;
        } else {
            switchPlayer();
            setTimeout(cpuMove, 500);
        }
    }

    function cpuMove() {
        let availableCells = [];
        board.forEach((cell, index) => {
            if (cell === null) {
                availableCells.push(index);
            }
        });

        if (availableCells.length === 0) return;

        let cpuIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[cpuIndex] = currentPlayer;
        const cell = document.querySelector(`.cell[data-index='${cpuIndex}']`);
        cell.textContent = currentPlayer.toUpperCase();
        cell.classList.add(currentPlayer, 'active');

        if (checkWin(currentPlayer)) {
            message.textContent = `${currentPlayer.toUpperCase()} wins!`;
            gameActive = false;
        } else if (checkDraw()) {
            message.textContent = 'Draw!';
            gameActive = false;
        } else {
            switchPlayer();
        }
    }

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    // Loading screen logic
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
    }, 3000);
});
