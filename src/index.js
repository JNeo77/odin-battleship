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

compSquares.forEach(square => {
  square.addEventListener('click', () => {
    computer.gameboard.receiveAttack(square.dataset.row, square.dataset.col);
    const { row, col } = computer.generateRandomAttack();
    setTimeout(() => {
      player.gameboard.receiveAttack(row, col);
    }, 250);
  }, { once: true });
});
