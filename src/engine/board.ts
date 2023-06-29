import Player from "./player";
import GameSettings from "./gameSettings";
import Square from "./square";
import Piece from "./pieces/piece";
import Pawn from "./pieces/pawn";

export default class Board {
  public currentPlayer: Player;
  private readonly board: (Piece | undefined)[][];
  public enPassant: Square | undefined;

  public constructor(currentPlayer?: Player) {
    this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
    this.board = this.createBoard();
    this.enPassant = undefined;
  }

  public setPiece(square: Square, piece: Piece | undefined) {
    this.board[square.row][square.col] = piece;
  }

  public getPiece(square: Square) {
    return this.board[square.row][square.col];
  }

  public findPiece(pieceToFind: Piece) {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] === pieceToFind) {
          return Square.at(row, col);
        }
      }
    }
    throw new Error("The supplied piece is not on the board");
  }

  public movePiece(fromSquare: Square, toSquare: Square) {
    const movingPiece = this.getPiece(fromSquare);
    if (!!movingPiece && movingPiece.player === this.currentPlayer) {
      this.setPiece(toSquare, movingPiece);
      this.setPiece(fromSquare, undefined);
      this.currentPlayer =
        this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE;
        // check if the move is an enPassant attack
      if (this.enPassant === new Square(fromSquare.row, toSquare.col)) {
        // write code
      }
      // check if the move can make the next step being an enPassant
      if (
        movingPiece instanceof Pawn &&
        Math.abs(toSquare.row - fromSquare.row) === 2
      ) {
        this.enPassant = toSquare;
      } else {
        this.enPassant = undefined;
      }
    }
  }

  private createBoard() {
    const board = new Array(GameSettings.BOARD_SIZE);
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(GameSettings.BOARD_SIZE);
    }
    return board;
  }
}
