import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.board = Array(10).fill(null).map(() => Array(10).fill(null));
  }

  placeShip(x, y, length) {
    const ship = new Ship(length);

    this.board[y - 1].fill(ship, x - 1, ship.length);
  } 
}