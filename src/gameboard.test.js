import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

test("gameboard gets constructed", () => {
  const gameBoard = new Gameboard;
  expect(gameBoard.board[8][9]).toBe(null);
});

test("gameboard places ships horizontally", () => {
  const gameBoard = new Gameboard;
  const ship = gameBoard.allShips[4];
  gameBoard.placeShip(1, 1, ship);
  expect(gameBoard.board[0][0].hits).toBe(0);
  expect(gameBoard.board[0][1].hits).toBe(0);
});

test.skip("gameboard place ships vertically", () => {
  const gameBoard = new Gameboard;
  const ship = gameBoard.allShips[4];
  gameBoard.placeShip(7, 9, ship);
  expect(gameBoard.board[6][8].hits).toBe(0);
  expect(gameBoard.board[7][8].hits).toBe(0);
});

test("error is thrown if gameboard space already contains a ship", () => {
  const gameBoard = new Gameboard;
  const ship = gameBoard.allShips[4];

  gameBoard.placeShip(7, 9, ship);
  
  function expectError() {
    gameBoard.placeShip(7, 8, ship);
  }
  
  expect(expectError).toThrow('Space already occupied by another ship!');
  expect(gameBoard.board[6][7]).toBe(null);
  expect(gameBoard.board[6][8]).toBeInstanceOf(Ship);
  expect(gameBoard.board[6][9]).toBeInstanceOf(Ship);
});

test("attack misses a ship", () => {
  const gameBoard = new Gameboard;
  const ship = gameBoard.allShips[4];

  gameBoard.placeShip(1, 1, ship);
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
  const ship = gameBoard.allShips[4];

  gameBoard.placeShip(1, 1, ship);
  
  gameBoard.receiveAttack(0,0);
  gameBoard.receiveAttack(0,1);
  gameBoard.receiveAttack(0,2);

  expect(gameBoard.board[0][0].hits).toBe(2);
  expect(gameBoard.board[0][1].hits).toBe(2);
});

test("gameboard keeps track of sunken ships", () => {
  const gameBoard = new Gameboard;
  const ship = gameBoard.allShips[4];

  gameBoard.placeShip(1, 1, ship);
  
  gameBoard.receiveAttack(0,0);
  gameBoard.receiveAttack(0,1);

  expect(gameBoard.sunkenShips[0]).toBeInstanceOf(Ship)
});

test("gameboard reports whether or not all ships have been sunk", () => {
  const gameBoard = new Gameboard;
  const ship1 = gameBoard.allShips[0];
  const ship2 = gameBoard.allShips[1];
  const ship3 = gameBoard.allShips[2];
  const ship4 = gameBoard.allShips[3];
  const ship5 = gameBoard.allShips[4];
  
  gameBoard.placeShip(1, 1, ship1);
  gameBoard.placeShip(2, 1, ship2);
  gameBoard.placeShip(3, 1, ship3);
  gameBoard.placeShip(4, 1, ship4);
  gameBoard.placeShip(5, 1, ship5);

  gameBoard.receiveAttack(0,0);
  gameBoard.receiveAttack(0,1);
  gameBoard.receiveAttack(0,2);
  gameBoard.receiveAttack(0,3);
  gameBoard.receiveAttack(0,4);
  gameBoard.receiveAttack(1,0);
  gameBoard.receiveAttack(1,1);
  gameBoard.receiveAttack(1,2);
  gameBoard.receiveAttack(1,3);
  gameBoard.receiveAttack(2,0);
  gameBoard.receiveAttack(2,1);
  gameBoard.receiveAttack(2,2);
  gameBoard.receiveAttack(3,0);
  gameBoard.receiveAttack(3,1);
  gameBoard.receiveAttack(3,2);
  gameBoard.receiveAttack(4,0);
  gameBoard.receiveAttack(4,1);

  const allShipsSunk = gameBoard.allShipsSunk();

  expect(allShipsSunk).toBe(true);
});