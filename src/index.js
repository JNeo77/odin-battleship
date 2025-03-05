import { Ship } from "./ship.js";
import { Gameboard } from "./gameboard.js";
import { Player, ComputerPlayer } from "./player.js";

const battleship = (function () {
  const boards = document.querySelector('.board-section');

  const player = new Player('player');
  const computer = new ComputerPlayer('comp');

  const playerBoard = player.gameboard.render();
  const compBoard = computer.gameboard.render();

  boards.appendChild(playerBoard);
  boards.appendChild(compBoard);

  player.gameboard.placeShip(0, 0, 5);
  player.gameboard.placeShip(0, 2, 4);
  player.gameboard.placeShip(0, 4, 3);
  player.gameboard.placeShip(0, 6, 3);
  player.gameboard.placeShip(0, 8, 2);

  computer.gameboard.placeShip(0, 0, 5);
  computer.gameboard.placeShip(0, 2, 4);
  computer.gameboard.placeShip(0, 4, 3);
  computer.gameboard.placeShip(0, 6, 3);
  computer.gameboard.placeShip(0, 8, 2);

  return { player, computer };
})();

const { player, computer } = battleship;
const compSquares = document.querySelectorAll('.comp');
const columnLabels = document.querySelector('.column-label-wrap');
const mainButton = document.querySelector('.main-button');

export function endGame(loser) {
  player.gameboard.clearBoard();
  computer.gameboard.clearBoard();
  columnLabels.remove();
  mainButton.textContent = 'Play Again';
  document.querySelector('.board-section').innerHTML = announceWinner(loser);
}

function announceWinner(loser) {
  const winnerDisplay = loser === 'comp' ?
    ` <div class="container">
        <h1 style="color: #374d3e">WINS</h1>
      </div>
      <div class="container">
        <h1 style="color: #f27979">LOSES</h1>
      </div>
    ` : `
      <div class="container">
        <h1 style="color: #f27979">LOSES</h1>
      </div>
      <div class="container">
        <h1 style="color: #374d3e">WINS</h1>
      </div>
    `;
  return winnerDisplay;
}

function attackPlayer() {
 const { row, col } = computer.getRandomAttack();
 player.gameboard.receiveAttack(row, col);
}

compSquares.forEach(square => {
  square.addEventListener('click', () => {
    computer.gameboard.receiveAttack(square.dataset.row, square.dataset.col);
    setTimeout(() => {
      attackPlayer();
    }, 250);
  }, { once: true });
});
