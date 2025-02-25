import { Ship } from "./ship";

test("get length of ship", () => {
  const ship = new Ship(6);
  expect(ship.length).toBe(6);
});

test("increment hitCount when hitting the ship", () => {
  const ship = new Ship(5);
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(2);
});

test("sink ship when hits equals length", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
