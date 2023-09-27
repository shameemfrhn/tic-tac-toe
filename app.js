document.addEventListener("DOMContentLoaded", function () {
    const cells = document.querySelectorAll(".cell");
    const resultDisplay = document.getElementById("result");
    const resetButton = document.getElementById("reset-button");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(cell, index));
    });

    resetButton.addEventListener("click", resetGame);

    function handleCellClick(cell, index) {
        if (board[index] === "" && gameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.style.backgroundColor = "#f0f0f0";

            if (checkWin() || checkDraw()) {
                gameActive = false;
                resultDisplay.textContent = checkWin()
                    ? `Player ${currentPlayer} wins!`
                    : "It's a draw!";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function checkWin() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }

        return false;
    }

    function checkDraw() {
        return board.every((cell) => cell !== "");
    }

    function resetGame() {
        currentPlayer = "X";
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.style.backgroundColor = "#fff";
        });
        resultDisplay.textContent = "";
    }
});
