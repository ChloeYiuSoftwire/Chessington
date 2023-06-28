import Piece from "./piece";
import Player from "../player";
import Board from "../board";
import Square from "../square";

export default class Pawn extends Piece {
  public constructor(player: Player) {
    super(player);
  }

  public getAvailableMoves(board: Board) {
    let color = this.player === Player.WHITE ? 1 : -1;
    let moves = [];
    let location = board.findPiece(this);
    moves.push(new Square(location.row + 1 * color, location.col));
    if (
      (location.row === 1 && this.player === Player.WHITE) ||
      (location.row === 6 && this.player === Player.BLACK)
    ) {
      moves.push(new Square(location.row + 2 * color, location.col));
    }
    return moves;
  }
}
