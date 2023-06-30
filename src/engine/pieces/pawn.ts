import Piece from "./piece";
import Player from "../player";
import Board from "../board";
import Square from "../square";
import King from "./king";

export default class Pawn extends Piece {
  public constructor(player: Player) {
    super(player);
  }

  public getAvailableMoves(board: Board) {
    const color = this.player === Player.WHITE ? 1 : -1;
    const moves: Square[] = [];
    const location = board.findPiece(this);
    const targetSquare = new Square(location.row + 1 * color, location.col);
    if (
      targetSquare.row >= 0 &&
      targetSquare.row <= 7 &&
      board.getPiece(targetSquare) === undefined
    ) {
      this.pushOnlyLegalMoves(moves, location, targetSquare, board);
    }
    if (
      (location.row === 1 && this.player === Player.WHITE) ||
      (location.row === 6 && this.player === Player.BLACK)
    ) {
      const targetSquare2 = new Square(location.row + 2 * color, location.col);
      if (
        board.getPiece(targetSquare2) === undefined &&
        board.getPiece(targetSquare) === undefined
      ) {
        this.pushOnlyLegalMoves(moves, location, targetSquare2, board);
      }
    }
    let movements = [
      [1, 1],
      [1, -1],
    ];
    movements.forEach((movement) => {
      const targetSquare = new Square(
        location.row + movement[0] * color,
        location.col + movement[1]
      );
      if (
        targetSquare.row >= 0 &&
        targetSquare.row <= 7 &&
        targetSquare.col >= 0 &&
        targetSquare.col <= 7
      ) {
        const targetPiece = board.getPiece(targetSquare);
        if (targetPiece !== undefined) {
          if (
            this.player !== targetPiece.player &&
            !(targetPiece instanceof King)
          ) {
            this.pushOnlyLegalMoves(moves, location, targetSquare, board);
          }
        } else if (
          board.enPassant !== undefined &&
          board.enPassant.equals(new Square(location.row, targetSquare.col))
        ) {
          this.pushOnlyLegalMoves(moves, location, targetSquare, board);
        }
      }
    });
    return moves;
  }
}
