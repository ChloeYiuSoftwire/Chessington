import Piece from "./piece";
import Player from "../player";
import Board from "../board";
import Square from "../square";

export default class Pawn extends Piece {
  public constructor(player: Player) {
    super(player);
  }

  public getAvailableMoves(board: Board) {
    const color = this.player === Player.WHITE ? 1 : -1;
    const moves = [];
    const location = board.findPiece(this);
    const targetSquare = new Square(location.row + 1 * color, location.col);
    if (targetSquare.row >= 0 && targetSquare.row <= 7 && board.getPiece(targetSquare) === undefined) {
      moves.push(targetSquare);
    }
    if (
      (location.row === 1 && this.player === Player.WHITE) ||
      (location.row === 6 && this.player === Player.BLACK)
    ) {
       const targetSquare2 = new Square(location.row + 2 * color, location.col);
      if (board.getPiece(targetSquare2) === undefined && board.getPiece(targetSquare) === undefined) {
          moves.push(targetSquare2);
        }
    }
    return moves;
  }
}
