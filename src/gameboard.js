import { Ship } from "./ship.js";

export class Gameboard {
  constructor(playerType) {
    this.playerType = playerType;
    this.board = Array(10).fill(null).map(() => Array(10).fill(null));
    this.misses = new Set();
    this.hits = new Set();
    this.sunkenShips = [];
    this.container = document.createElement('div');
  }

  placeShip(row, col, length) {

    const ship = new Ship(length);
    
    this.checkIfOccupied(row, col, ship);

    if (ship.direction === 'horizontal') {
      for (let i = col; i < col + length; i++) {
        this.board[row][i] = ship;
      }
    } else {
      for (let i = row; i < row + length; i++) {
        this.board[i][col] = ship;
      }
    }

    this.render();
  }
  
  receiveAttack(row, col) {
    if (this.board[row][col]) { 
      this.board[row][col].hit();
      this.hits.add(`${row},${col}`);
      const isSunk = this.board[row][col].isSunk();
      if (isSunk) this.sunkenShips.push(this.board[row][col]);
    } else {
      this.misses.add(`${row},${col}`);
    }

    this.reRender();
  }

  allShipsSunk() {
    return this.sunkenShips.length === 5;
  }

  checkIfOccupied(row, col, ship) {
    if (ship.direction === 'horizontal') {
      for (let i = col; i < col + ship.length; i++) {
        if (this.board[row][i] !== null) {
          throw new Error ('Space already occupied by another ship!');
        }
      }
    } else {
      for (let i = row; i < row + ship.length; i++) {
        if (this.board[i][col] !== null) { 
          throw new Error ('Space already occupied by another ship!');
        }
      }
    }
  }

  render() {
    this.clearBoard();

    this.board.forEach((row, rowIdx) => {
      const rowDiv = document.createElement('div');
      const rowLabel = document.createElement('div');

      rowDiv.classList.add('row');
      rowLabel.classList.add('row-label');
      rowLabel.innerHTML = rowIdx + 1;
      rowDiv.appendChild(rowLabel);

      row.forEach((square, colIdx) => {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('square');
        squareDiv.classList.add(this.playerType);
        if (square !== null && this.playerType === 'player') squareDiv.classList.add('ship');
        squareDiv.dataset.row = rowIdx;
        squareDiv.dataset.col = colIdx;
        rowDiv.appendChild(squareDiv);
      });

      this.container.appendChild(rowDiv);
    });

    this.container.classList.add('container');
    return this.container;
  }

  reRender() {
    const squares = this.container.querySelectorAll('.square');
    
    squares.forEach(square => {
      if (this.misses.has(`${square.dataset.row},${square.dataset.col}`)) square.innerHTML = '<img src="img/miss.svg" alt="miss peg">'; 
      if (this.hits.has(`${square.dataset.row},${square.dataset.col}`)) square.innerHTML = '<img src="img/hit.svg" alt="hit peg">';
    });    
  }

  clearBoard() {
    let containerChild = this.container.lastElementChild;
    while (containerChild) {
      this.container.removeChild(containerChild);
      containerChild = this.container.lastElementChild;
    } 
  }
}
