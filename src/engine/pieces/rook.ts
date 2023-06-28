import Piece from "./piece";
import Player from "../player";
import Board from "../board";
import Square from "../square";

export default class Rook extends Piece {
  public constructor(player: Player) {
    super(player);
  }

  public getAvailableMoves(board: Board) {
    let location = board.findPiece(this);
    let moves: Square[] = [];

    for (let col = location.col - 1; col >= 0; col--) {
      if (board.getPiece(new Square(location.row, col)) !== undefined) {
        break;
      }
      moves.push(new Square(location.row, col));
    }
    for (let col = location.col + 1; col <= 7; col++) {
      if (board.getPiece(new Square(location.row, col)) !== undefined) {
        break;
      }
      moves.push(new Square(location.row, col));
    }
    for (let row = location.row - 1; row >= 0; row--) {
      if (board.getPiece(new Square(row, location.col)) !== undefined) {
        break;
      }
      moves.push(new Square(row, location.col));
    }
    for (let row = location.row + 1; row <= 7; row++) {
      if (board.getPiece(new Square(row, location.col)) !== undefined) {
        break;
      }
      moves.push(new Square(row, location.col));
    }

    return moves;
  }
}
