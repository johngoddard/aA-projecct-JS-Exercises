let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let arr = new Array(8);

  for (let i = 0; i < 8; i ++){
    arr[i] = new Array(8);
  }
  arr[3][4] = new Piece("black");
  arr[4][3] = new Piece("black");
  arr[3][3] = new Piece("white");
  arr[4][4] = new Piece("white");

  return arr;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  let x = pos[0], y = pos[1];
  if(this.isValidPos(pos)){
    return this.grid[x][y];
  } else {
    throw Error;
  }
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  let pieceToCheck = this.getPiece(pos);
    if (pieceToCheck && pieceToCheck.color === color) {
      return true;
    } else {
      return false;
    }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  if (this.getPiece(pos) === undefined) {
    return false;
  } else {
    return true;
  }
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  let x = pos[0], y = pos[1];

  if(x >= 0 && x < 8 && y >=0 && y < 8){
    return true;
  } else {
    return false;
  }
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip = []) {

  if(!board.isValidPos(pos) || !board.isOccupied(pos) ){
    return null;
  } else{
    if(board.isMine(pos, color)){

      return piecesToFlip;
    }
    else{

      piecesToFlip.push([pos]);
      let new_pos = [pos[0] + dir[0], pos[1] + dir[1]];
      return _positionsToFlip(board, new_pos, color, dir, piecesToFlip);
    }
  }
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if(this.isOccupied(pos)){
    return false;
  }
  let board = this;
  let valid = false;

  Board.DIRS.forEach(function(dir){
    let new_pos = [pos[0] + dir[0], pos[1] + dir[1]];
    let toFlip = _positionsToFlip(board, new_pos, color, dir, []);
    if(toFlip && toFlip.length > 0){
      valid = true;
    }
  });

  return valid;
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  let result = [];
  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      let pos = [i, j];
      if (this.validMove(pos, color)){
        result.push(pos);
      }
    }
  }
  return result;
};

module.exports = Board;
