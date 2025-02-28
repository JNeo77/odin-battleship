import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

test("gameboard gets constructed", () => {
  const gameBoard = new Gameboard;
  expect(gameBoard.board[8][9]).toBe(null);
});

test.skip("gameboard places ships horizontally", () => {
  const gameBoard = new Gameboard;
  gameBoard.placeShip(1, 1, 2);
  expect(gameBoard.board[0][0].hits).toBe(0);
  expect(gameBoard.board[0][1].hits).toBe(0);
});

test("gameboard place ships vertically", () => {
  const gameBoard = new Gameboard;
  gameBoard.placeShip(7, 9, 2);
  expect(gameBoard.board[6][8].hits).toBe(0);
  expect(gameBoard.board[7][8].hits).toBe(0);
});

test("error is thrown if gameboard space already contains a ship", () => {
  const gameBoard = new Gameboard;

  gameBoard.placeShip(7, 9, 2);
  
  function expectError() {
    gameBoard.placeShip(7, 9, 2);
  }
  
  expect(expectError).toThrow('Space already occupied by another ship!');
});

test("attack misses a ship", () => {
  const gameBoard = new Gameboard;
  gameBoard.placeShip(1, 1, 2);
  gameBoard.receiveAttack(2, 2);
  gameBoard.receiveAttack(4, 5);
  gameBoard.receiveAttack(0, 0);

  const miss1 = gameBoard.misses.has('2,2');
  const miss2 = gameBoard.misses.has('4,5');
  const miss3 = gameBoard.misses.has('0,0');

  expect(miss1).toBe(true);
  expect(miss2).toBe(true);
  expect(miss3).toBe(false);
});

test("attack hits a ship", () => {
  const gameBoard = new Gameboard;
  gameBoard.placeShip(1, 1, 2);
  
  gameBoard.receiveAttack(0,0);
  gameBoard.receiveAttack(1,0);
  gameBoard.receiveAttack(2,0);

  expect(gameBoard.board[0][0].hits).toBe(2);
  expect(gameBoard.board[1][0].hits).toBe(2);
});

test("gameboard keeps track of sunken ships", () => {
  const gameBoard = new Gameboard;

  gameBoard.placeShip(1, 1, 2);
  
  gameBoard.receiveAttack(0,0);
  gameBoard.receiveAttack(1,0);

  expect(gameBoard.sunkenShips[0]).toBeInstanceOf(Ship)
});