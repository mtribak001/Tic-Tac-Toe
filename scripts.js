class TicTacToe {
  constructor() {
    this.currentPlayer = "X";
    this.gameState = ["", "", "", "", "", "", "", "", ""];
    this.winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this.gameActive = true;
    this.statusDisplay = document.querySelector(".game--status");
  }

  getMessage(type) {
    switch (type) {
      case "currentPlayerTurn":
        return `It's ${this.currentPlayer}'s turn`;
      case "winningMessage":
        return `Player ${this.currentPlayer} has won!`;
      case "drawMessage":
        return "Game ended in a draw!";
      default:
        return `It's ${this.currentPlayer}'s turn`;
    }
  }
  updateGameStatusDisplay(message) {
    this.statusDisplay.textContent = message;
  }

  handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute("data-cell-index")
    );
    if (this.gameState[clickedCellIndex] !== "" || !this.gameActive) {
      return;
    }
    this.handleCellPlayed(clickedCell, clickedCellIndex);
    this.handleResultValidation();
  }

  handleCellPlayed(clickedCell, clickedCellIndex) {
    this.gameState[clickedCellIndex] = this.currentPlayer;
    clickedCell.style.color = this.currentPlayer === 'X' ? 'red' : 'blue'; // Change color here
    clickedCell.innerHTML = this.currentPlayer;
  }

  handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < this.winningConditions.length; i++) {
      const [a, b, c] = this.winningConditions[i];
      if (
        this.gameState[a] === this.currentPlayer &&
        this.gameState[b] === this.currentPlayer &&
        this.gameState[c] === this.currentPlayer
      ) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      const winner = this.getMessage("winningMessage");
      this.updateGameStatusDisplay(winner);
      this.gameActive = false;
      return;
    }

    if (!this.gameState.includes("")) {
      this.updateGameStatusDisplay(this.getMessage("drawMessage"));
      this.gameActive = false;
      return;
    }

    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    this.updateGameStatusDisplay(this.getMessage("currentPlayerTurn"));
  }

  handleRestartGame() {
    this.gameActive = true;
    this.currentPlayer = "X";
    this.gameState = Array(9).fill("");
    const restartMessage = this.getMessage("currentPlayerTurn");
    this.updateGameStatusDisplay(restartMessage);
    document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  }
}

// Event listeners
const ticTacToe = new TicTacToe();
document
  .querySelectorAll(".cell")
  .forEach((cell) =>
    cell.addEventListener("click", (event) => ticTacToe.handleCellClick(event))
  );
document
  .querySelector(".game--restart")
  .addEventListener("click", () => ticTacToe.handleRestartGame());
