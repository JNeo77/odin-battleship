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

  generateRandomAttack() {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    if (this.attacks.has(`${row},${col}`)) {
      this.generateRandomAttack();
    } else {
      this.attacks.add(`${row},${col}`);
    };

    return { row, col };
  }
}