import Piece from "./piece";
import Player from "../player";
import Board from "../board";
import Square from "../square";
import King from "./king";

export default class Rook extends Piece {
  public constructor(player: Player) {
    super(player);
  }

  public getAvailableMoves(board: Board) {
    const location = board.findPiece(this);
    const moves: Square[] = [];
    const functionInputs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    functionInputs.forEach((functionInput) => {
      for (let multiplier = 1; true; multiplier++) {
        const targetSquare = new Square(
          location.row + multiplier * functionInput[0],
          location.col + multiplier * functionInput[1]
        );
        if (
          targetSquare.row >= 8 ||
          targetSquare.row < 0 ||
          targetSquare.col >= 8 ||
          targetSquare.col < 0
        ) {
          break;
        }
        const targetPiece = board.getPiece(targetSquare);
        if (targetPiece !== undefined) {
          if (
            this.player !== targetPiece.player &&
            !(targetPiece instanceof King)
          ) {
            this.pushOnlyLegalMoves(moves, location, targetSquare, board);
          }
          break;
        }
        this.pushOnlyLegalMoves(moves, location, targetSquare, board);
      }
    });
    return moves;
  }
}
