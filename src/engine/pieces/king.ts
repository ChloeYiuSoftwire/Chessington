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
      if (
        location.row + movement[0] >= 0 &&
        location.row + movement[0] <= 7 &&
        location.col + movement[1] >= 0 &&
        location.col + movement[1] <= 7
      ) {
        moves.push(
          new Square(location.row + movement[0], location.col + movement[1])
        );
      }
    });
    return moves;
  }
}
