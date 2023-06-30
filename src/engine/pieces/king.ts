import Piece from "./piece";
import Player from "../player";
import Board from "../board";
import Square from "../square";

export default class King extends Piece {
  public constructor(player: Player) {
    super(player);
  }

  public getAvailableMoves(board: Board) {
    let location = board.findPiece(this);
    let moves: Square[] = [];
    let movements = [
      [0, 1],
      [1, 1],
      [1, 0],
      [-1, 0],
      [-1, 1],
      [-1, -1],
      [1, -1],
      [0, -1],
    ];
    movements.forEach((movement) => {
      const targetSquare = new Square(
        location.row + movement[0],
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
        } else {
          this.pushOnlyLegalMoves(moves, location, targetSquare, board);
        }
      }
    });
    return moves;
  }
}
