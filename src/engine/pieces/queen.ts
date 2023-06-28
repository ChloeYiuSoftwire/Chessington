import Piece from "./piece";
import Player from "../player";
import Board from "../board";
import Square from "../square";

export default class Queen extends Piece {
  public constructor(player: Player) {
    super(player);
  }

  public getAvailableMoves(board: Board) {
    let location = board.findPiece(this);
    let moves = [];
    // bishop part
    for (let num = 1; num < 8; num++) {
      if (location.row + num >= 8 || location.col + num >= 8) {
        break;
      }
      moves.push(new Square(location.row + num, location.col + num));
    }
    for (let num = 1; num < 8; num++) {
      if (location.row - num < 0 || location.col + num >= 8) {
        break;
      }
      moves.push(new Square(location.row - num, location.col + num));
    }
    for (let num = 1; num < 8; num++) {
      if (location.row + num >= 8 || location.col - num < 0) {
        break;
      }
      moves.push(new Square(location.row + num, location.col - num));
    }
    for (let num = 1; num < 8; num++) {
      if (location.row - num < 0 || location.col - num < 0) {
        break;
      }
      moves.push(new Square(location.row - num, location.col - num));
    }
    // rook part
    for (let col = 0; col < 8; col++) {
      if (col !== location.col) {
        moves.push(new Square(location.row, col));
      }
    }
    for (let row = 0; row < 8; row++) {
      if (row !== location.row) {
        moves.push(new Square(row, location.col));
      }
    }
    return moves;
  }
}
