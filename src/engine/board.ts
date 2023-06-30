import Player from "./player";
import GameSettings from "./gameSettings";
import Square from "./square";
import Piece from "./pieces/piece";
import Pawn from "./pieces/pawn";
import Rook from "./pieces/rook";
import Queen from "./pieces/queen";
import Bishop from "./pieces/bishop";
import Knight from "./pieces/knight";
import King from "./pieces/king";

export default class Board {
  public currentPlayer: Player;
  private readonly board: (Piece | undefined)[][];
  public enPassant: Square | undefined;
  public whiteKingSquare: Square;
  public blackKingSquare: Square;
  public piecepromote: String;

  public constructor(currentPlayer?: Player) {
    this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
    this.board = this.createBoard();
    this.enPassant = undefined;
    this.whiteKingSquare = new Square(0, 4);
    this.blackKingSquare = new Square(7, 4);
    this.piecepromote = 'Q'
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

  /*
  public changePromotion() {
    const input = document.querySelector("input");
    if (input !== null) {
      input.addEventListener("keydown", logKey: );
      function logKey(key: string) {
        if (key = 'Q') {
          this.piecepromote = 'Q'
        }
        if (key = 'Q') {
          console.log('Q')
        }
        if (key = 'Q') {
          console.log('Q')
        }
        if (key = 'Q') {
          console.log('Q')
        }
      }
    }
  }

*/






  public movePiece(fromSquare: Square, toSquare: Square) {
    const movingPiece = this.getPiece(fromSquare);
    if (!!movingPiece && movingPiece.player === this.currentPlayer) {
      this.setPiece(toSquare, movingPiece);
      this.setPiece(fromSquare, undefined);
      //check for promotion
      if (movingPiece instanceof Pawn && toSquare.row === 7) {
        console.log('we have accessed white promotion if statement')
        console.log(`piece promote = ${this.piecepromote}`)
        if (this.piecepromote === 'Q') {
          this.setPiece(toSquare, new Queen(Player.WHITE))
        } else if (this.piecepromote === 'R') {
          this.setPiece(toSquare, new Rook(Player.WHITE))
        } else if (this.piecepromote === 'N') {
          this.setPiece(toSquare, new Knight(Player.WHITE))
        } else if (this.piecepromote === 'B') {
          this.setPiece(toSquare, new Bishop(Player.WHITE))
        }
      }
      else if (movingPiece instanceof Pawn && toSquare.row === 0) {
        console.log('we have accessed black promotion if statement')
        console.log(`piece promote = ${this.piecepromote}`)
        if (this.piecepromote === 'Q') {
          this.setPiece(toSquare, new Queen(Player.BLACK))
        } else if (this.piecepromote === 'R') {
          this.setPiece(toSquare, new Rook(Player.BLACK))
        } else if (this.piecepromote === 'N') {
          this.setPiece(toSquare, new Knight(Player.BLACK))
        } else if (this.piecepromote === 'B') {
          this.setPiece(toSquare, new Bishop(Player.BLACK))
        }
      }

    }

    //change player
    this.currentPlayer = this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE;
    // check if the move is an enPassant attack
    if (
      this.enPassant !== undefined &&
      this.enPassant.equals(new Square(fromSquare.row, toSquare.col))
    ) {
      this.setPiece(this.enPassant, undefined);
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
    //check if king is moving
    if (movingPiece instanceof King) {
      this.currentPlayer === Player.WHITE
        ? (this.blackKingSquare = toSquare)
        : (this.whiteKingSquare = toSquare);
    }
    //reset promotion so queen is default
    this.piecepromote = 'Q'
  }

  public isAttacked(targetSquare: Square, attacker: Player) {
    return (
      this.checkRanksAndFiles(targetSquare, attacker) ||
      this.checkDiagonals(targetSquare, attacker) ||
      this.checkKnights(targetSquare, attacker) ||
      this.checkPawns(targetSquare, attacker) ||
      this.checkKing(targetSquare, attacker)
    );
  }

  public checkRanksAndFiles(startSquare: Square, attacker: Player) {
    let functionReturn = false;
    const functionInputs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    functionInputs.forEach((functionInput) => {
      for (let multiplier = 1; true; multiplier++) {
        let targetSquare = new Square(
          startSquare.row + multiplier * functionInput[0],
          startSquare.col + multiplier * functionInput[1]
        );
        if (
          targetSquare.row >= 8 ||
          targetSquare.row < 0 ||
          targetSquare.col >= 8 ||
          targetSquare.col < 0
        ) {
          break;
        }
        const targetPiece = this.getPiece(targetSquare);
        if (targetPiece !== undefined) {
          if (
            targetPiece.player === attacker &&
            (targetPiece instanceof Rook || targetPiece instanceof Queen)
          ) {
            functionReturn = true;
            break;
          } else {
            break;
          }
        }
      }
    });
    return functionReturn;
  }

  public checkDiagonals(startSquare: Square, attacker: Player) {
    let functionReturn = false;
    const functionInputs = [
      [1, 1],
      [-1, 1],
      [1, -1],
      [-1, -1],
    ];
    functionInputs.forEach((functionInput) => {
      for (let multiplier = 1; true; multiplier++) {
        const targetSquare = new Square(
          startSquare.row + multiplier * functionInput[0],
          startSquare.col + multiplier * functionInput[1]
        );
        if (
          targetSquare.row >= 8 ||
          targetSquare.row < 0 ||
          targetSquare.col >= 8 ||
          targetSquare.col < 0
        ) {
          break;
        }
        const targetPiece = this.getPiece(targetSquare);
        if (targetPiece !== undefined) {
          if (
            targetPiece.player === attacker &&
            (targetPiece instanceof Bishop || targetPiece instanceof Queen)
          ) {
            functionReturn = true;
            break;
          } else {
            break;
          }
        }
      }
    });
    return functionReturn;
  }

  public checkKnights(startSquare: Square, attacker: Player) {
    let functionReturn = false;
    const functionInputs = [
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
    ];
    functionInputs.forEach((functionInput) => {
      const targetSquare = new Square(
        startSquare.row + functionInput[0],
        startSquare.col + functionInput[1]
      );
      if (
        targetSquare.row >= 0 &&
        targetSquare.row <= 7 &&
        targetSquare.col >= 0 &&
        targetSquare.col <= 7
      ) {
        const targetPiece = this.getPiece(targetSquare);
        if (targetPiece !== undefined) {
          if (targetPiece.player === attacker && targetPiece instanceof Knight)
            functionReturn = true;
        }
      }
    });
    return functionReturn;
  }

  public checkKing(startSquare: Square, attacker: Player) {
    let functionReturn = false;
    const functionInputs = [
      [0, 1],
      [0, -1],
      [1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
    ];
    functionInputs.forEach((functionInput) => {
      const targetSquare = new Square(
        startSquare.row + functionInput[0],
        startSquare.col + functionInput[1]
      );
      if (
        targetSquare.row >= 0 &&
        targetSquare.row <= 7 &&
        targetSquare.col >= 0 &&
        targetSquare.col <= 7
      ) {
        const targetPiece = this.getPiece(targetSquare);
        if (targetPiece !== undefined) {
          if (targetPiece.player === attacker && targetPiece instanceof King)
            functionReturn = true;
        }
      }
    });
    return functionReturn;
  }

  public checkPawns(startSquare: Square, attacker: Player) {
    let functionReturn = false;
    const color = attacker === Player.WHITE ? -1 : 1;
    const functionInputs = [
      [color, 1],
      [color, -1],
    ];
    functionInputs.forEach((functionInput) => {
      const targetSquare = new Square(
        startSquare.row + functionInput[0],
        startSquare.col + functionInput[1]
      );
      if (
        targetSquare.row >= 0 &&
        targetSquare.row <= 7 &&
        targetSquare.col >= 0 &&
        targetSquare.col <= 7
      ) {
        const targetPiece = this.getPiece(targetSquare);
        if (targetPiece !== undefined) {
          if (targetPiece.player === attacker && targetPiece instanceof Pawn)
            functionReturn = true;
        }
      }
    });
    return functionReturn;
  }

  private createBoard() {
    const board = new Array(GameSettings.BOARD_SIZE);
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(GameSettings.BOARD_SIZE);
    }
    return board;
  }
}
