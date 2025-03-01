import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.board = Array(10).fill(null).map(() => Array(10).fill(null));
    this.misses = new Set();
    this.allShips = [
      { type: 'Carrier', shipObj: new Ship(5) },
      { type: 'Battleship', shipObj: new Ship(4) },
      { type: 'Cruise', shipObj: new Ship(3) },
      { type: 'Submarine', shipObj: new Ship(3) },
      { type: 'Destroyer', shipObj: new Ship(2) }
    ];
    this.sunkenShips = [];
  }

  placeShip(row, col, ship) {

    const { type, shipObj } = ship;
    
    this.checkIfOccupied(row, col, shipObj);

    if (shipObj.direction === 'horizontal') {
      for (let i = col - 1; i < col - 1 + shipObj.length; i++) {
        this.board[row - 1][i] = shipObj;
      }
    } else {
      for (let i = row - 1; i < row - 1 + shipObj.length; i++) {
        this.board[i][col - 1] = shipObj;
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

  checkIfOccupied(row, col, ship) {
    if (ship.direction === 'horizontal') {
      for (let i = col - 1; i < col - 1 + ship.length; i++) {
        if (this.board[row - 1][i] !== null) {
          throw new Error ('Space already occupied by another ship!');
        }
      }
    } else {
      for (let i = row - 1; i < row - 1 + ship.length; i++) {
        if (this.board[i][col - 1] !== null) { 
          throw new Error ('Space already occupied by another ship!');
        }
      }
    }
  }
}