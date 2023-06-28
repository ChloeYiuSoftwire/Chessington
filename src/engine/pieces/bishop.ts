import Piece from "./piece";
import Player from "../player";
import Board from "../board";
import Square from "../square";

export default class Bishop extends Piece {
  public constructor(player: Player) {
    super(player);
  }

  public getAvailableMoves(board: Board) {
    let location = board.findPiece(this);
    let moves = [];
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
    return moves;
  }
}
