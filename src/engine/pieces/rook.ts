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
    let location = board.findPiece(this);
    let moves: Square[] = [];

    for (let col = location.col - 1; col >= 0; col--) {
      const targetSquare = new Square(location.row, col);
      const targetPiece = board.getPiece(targetSquare);
      if (targetPiece !== undefined) {
        if (
          this.player !== targetPiece.player &&
          !(targetPiece instanceof King)
        ) {
          moves.push(targetSquare);
        }
        break;
      }
      moves.push(targetSquare);
    }
    for (let col = location.col + 1; col <= 7; col++) {
      const targetSquare = new Square(location.row, col);
      const targetPiece = board.getPiece(targetSquare);
      if (targetPiece !== undefined) {
        if (
          this.player !== targetPiece.player &&
          !(targetPiece instanceof King)
        ) {
          moves.push(targetSquare);
        }
        break;
      }
      moves.push(targetSquare);
    }
    for (let row = location.row - 1; row >= 0; row--) {
      const targetSquare = new Square(row, location.col);
      const targetPiece = board.getPiece(targetSquare);
      if (targetPiece !== undefined) {
        if (
          this.player !== targetPiece.player &&
          !(targetPiece instanceof King)
        ) {
          moves.push(targetSquare);
        }
        break;
      }
      moves.push(targetSquare);
    }
    for (let row = location.row + 1; row <= 7; row++) {
      const targetSquare = new Square(row, location.col);
      const targetPiece = board.getPiece(targetSquare);
      if (targetPiece !== undefined) {
        if (
          this.player !== targetPiece.player &&
          !(targetPiece instanceof King)
        ) {
          moves.push(targetSquare);
        }
        break;
      }
      moves.push(targetSquare);
    }

    return moves;
  }
}
