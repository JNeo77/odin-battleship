export class Ship {
  #length
  constructor(length) {
    this.#length = length;
    this.hits = 0;
  }

  get length() {
    return this.#length;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.#length === this.hits;
  }
}