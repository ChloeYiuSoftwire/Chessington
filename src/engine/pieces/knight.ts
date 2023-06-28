import Piece from "./piece";
import Player from "../player";
import Board from "../board";
import Square from "../square";
import King from "./king";

export default class Knight extends Piece {
  public constructor(player: Player) {
    super(player);
  }

  public getAvailableMoves(board: Board) {
    let location = board.findPiece(this);
    let moves: Square[] = [];
    let movements = [
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
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
            moves.push(targetSquare);
          }
        } else {
          moves.push(targetSquare);
        }
      }
    });
    return moves;
  }
}
