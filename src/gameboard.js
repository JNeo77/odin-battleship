import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.board = Array(10).fill(null).map(() => Array(10).fill(null));
    this.misses = new Set();
    this.sunkenShips = [];
  }

  placeShip(row, col, length) {
    const ship = new Ship(length);

    if (ship.direction === 'horizontal') {
      for (let i = col - 1; i < col - 1 + ship.length; i++) {
        if (this.board[row - 1][i] === null) { 
          this.board[row - 1][i] = ship;
        } else {
          throw new Error ('Space already occupied by another ship!');
        }
      }
    } else {
      for (let i = row - 1; i < row - 1 + ship.length; i++) {
        if (this.board[i][col - 1] === null) { 
          this.board[i][col - 1] = ship;
        } else {
          throw new Error ('Space already occupied by another ship!');
        }
      }
    }
  }
  
  receiveAttack(row, col) {
    if (this.board[row][col]) { 
      this.board[row][col].hit();
      const isSunk = this.board[row][col].isSunk();
      if (isSunk) this.sunkenShips.push(this.board[row][col]);
    } else {
      this.misses.add(`${row},${col}`);
    }
  }

  allShipsSunk() {
    return this.sunkenShips.length === 5;
  }
}