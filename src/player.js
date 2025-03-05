import { Gameboard } from "./gameboard.js"

export class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard(this.type);
  }
}

export class ComputerPlayer extends Player {
  constructor(type) {
    super(type);
    this.attacks = new Set();
  }

  getRandomAttack() {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    
    while (this.attacks.has(`${row},${col}`)) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    }

    this.attacks.add(`${row},${col}`);
    return { row, col };
  }
}