import './styles.css';
import './hit.svg';
import './miss.svg';
import { Player, ComputerPlayer } from "./player.js";

const battleship = function () {
  const boards = document.querySelector('.board-section');

  const player = new Player('player');
  const computer = new ComputerPlayer('comp');

  const playerBoard = player.gameboard.render();
  const compBoard = computer.gameboard.render();

  boards.appendChild(playerBoard);
  boards.appendChild(compBoard);

  player.gameboard.placeShips();
  computer.gameboard.placeShips();

  return { player, computer };
};

let { player, computer } = battleship();

const columnLabels = document.querySelector('.column-label-wrap');
const startButton = document.querySelector('.main-button');
const refreshButton = document.querySelector('.refresh-button');
const playAgainButton = document.querySelector('.play-again-button');
const playerHead = document.querySelector('.human');
const computerHead = document.querySelector('.computer');

export function endGame(loser) {
  playAgainButton.classList.toggle('hidden');
  player.gameboard.render();
  computer.gameboard.render();
  player.gameboard.reRender();
  computer.gameboard.reRender();
  announceResults(loser);
}

function announceResults(loser) {
  if (loser === 'comp') {
    playerHead.textContent = 'PLAYER1 WINS!';
    computerHead.textContent = 'COMPUTER LOSES!'
  } else {
    playerHead.textContent = 'PLAYER1 LOSES!';
    computerHead.textContent = 'COMPUTER WINS!'
  }
}

function attackPlayer() {
  const { row, col } = computer.getRandomAttack();
  player.gameboard.receiveAttack(row, col);
}

function startGame() {
  document.querySelectorAll('.comp').forEach(square => {
    square.addEventListener('click', () => {
      computer.gameboard.receiveAttack(square.dataset.row, square.dataset.col);
      setTimeout(() => {
        attackPlayer();
      }, 250);
    }, { once: true });
  });

  refreshButton.classList.toggle('hidden');
  startButton.classList.toggle('hidden');
}

function playAgain() {
  document.querySelector('.board-section').innerHTML = '';
  playerHead.textContent = 'PLAYER1';
  computerHead.textContent = 'COMPUTER'
  
  columnLabels.classList.toggle('hidden');
  refreshButton.classList.toggle('hidden');
  startButton.classList.toggle('hidden');
  playAgainButton.classList.toggle('hidden');

  ({ computer, player } = battleship());
}

refreshButton.addEventListener('click', () => {
  player.gameboard.placeShips();
});

startButton.addEventListener('click', startGame);

playAgainButton.addEventListener('click', playAgain);