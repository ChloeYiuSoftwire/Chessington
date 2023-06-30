import Player from "../player";
import Board from "../board";
import Square from "../square";

export default class Piece {
  public player: Player;

  public constructor(player: Player) {
    this.player = player;
  }

  public getAvailableMoves(board: Board) {
    throw new Error(
      "This method must be implemented, and return a list of available moves"
    );
  }

  public moveTo(board: Board, newSquare: Square) {
    const currentSquare = board.findPiece(this);
    board.movePiece(currentSquare, newSquare);
  }

  public checkMove(fromSquare: Square, toSquare: Square, currentBoard: Board) {
    // make a deep copy
    const currentPlayer = currentBoard.currentPlayer;
    let copyBoard = new Board(currentPlayer);
    for (let r = 0; r <= 7; r++) {
      for (let c = 0; c <= 7; c++) {
        const currentPiece = currentBoard.getPiece(new Square(r, c));
        copyBoard.setPiece(new Square(r, c), currentPiece);
      }
    }
    copyBoard.enPassant = currentBoard.enPassant;
    copyBoard.blackKingSquare = currentBoard.blackKingSquare;
    copyBoard.whiteKingSquare = currentBoard.whiteKingSquare;
    copyBoard.movePiece(fromSquare, toSquare);
    const kingSquare =
      copyBoard.currentPlayer === Player.WHITE
        ? copyBoard.blackKingSquare
        : copyBoard.whiteKingSquare;
    return !copyBoard.isAttacked(kingSquare, copyBoard.currentPlayer);
  }

  public pushOnlyLegalMoves(legalMoves: Square[], location: Square, targetSquare: Square, board: Board) {
    if (this.checkMove(location, targetSquare, board)) {
      legalMoves.push(targetSquare);
    }
  }
}
