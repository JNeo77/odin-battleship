export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.direction = Math.floor(Math.random() * 2) === 1 ? 'vertical' : 'horizontal';
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.length === this.hits;
  }
}