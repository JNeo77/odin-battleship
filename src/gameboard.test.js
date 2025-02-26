import { Gameboard } from "./gameboard";

test("gameboard gets constructed", () => {
  const gameBoard = new Gameboard;
  expect(gameBoard.board[8][9]).toBe(null);
});

test("gameboard places ships", () => {
  const gameBoard = new Gameboard;
  gameBoard.placeShip(1, 1, 2);
  expect(gameBoard.board[0][0].hits).toBe(0);
  expect(gameBoard.board[0][1].hits).toBe(0);
});