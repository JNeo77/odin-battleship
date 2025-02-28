export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.direction = 'horizontal';
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.length === this.hits;
  }
}