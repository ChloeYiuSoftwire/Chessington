import Pawn from "../../../src/engine/pieces/pawn";
import Board,{setPromotion} from "../../../src/engine/board";
import Player from "../../../src/engine/player";
import Square from "../../../src/engine/square";
import Rook from "../../../src/engine/pieces/rook";
import King from "../../../src/engine/pieces/king";
import Queen from "../../../src/engine/pieces/queen";
import Bishop from "../../../src/engine/pieces/bishop";
import Knight from "../../../src/engine/pieces/knight";

describe("Pawn", () => {
  let board: Board;
  beforeEach(() => (board = new Board()));

  describe("white pawns", () => {
    it("can only move one square up if they have already moved", () => {
      const pawn = new Pawn(Player.WHITE);
      board.setPiece(Square.at(1, 0), pawn);
      pawn.moveTo(board, Square.at(2, 0));

      const moves = pawn.getAvailableMoves(board);

      moves.should.have.length(1);
      moves.should.deep.include(Square.at(3, 0));
    });

    it("can move one or two squares up on their first move", () => {
      const pawn = new Pawn(Player.WHITE);
      board.setPiece(Square.at(1, 7), pawn);

      const moves = pawn.getAvailableMoves(board);

      moves.should.have.length(2);
      moves.should.deep.include.members([Square.at(2, 7), Square.at(3, 7)]);
    });

    it("cannot move at the top of the board", () => {
      const pawn = new Pawn(Player.WHITE);
      board.setPiece(Square.at(7, 3), pawn);

      const moves = pawn.getAvailableMoves(board);

      moves.should.be.empty;
    });

    it("can move diagonally if there is a piece to take", () => {
      const pawn = new Pawn(Player.WHITE);
      const opposingPiece = new Rook(Player.BLACK);
      board.setPiece(Square.at(4, 4), pawn);
      board.setPiece(Square.at(5, 3), opposingPiece);

      const moves = pawn.getAvailableMoves(board);

      moves.should.deep.include(Square.at(5, 3));
    });

    it("cannot move diagonally if there is no piece to take", () => {
      const pawn = new Pawn(Player.WHITE);
      board.setPiece(Square.at(4, 4), pawn);

      const moves = pawn.getAvailableMoves(board);

      moves.should.not.deep.include(Square.at(5, 3));
    });

    it("cannot take a friendly piece", () => {
      const pawn = new Pawn(Player.WHITE);
      const friendlyPiece = new Rook(Player.WHITE);
      board.setPiece(Square.at(4, 4), pawn);
      board.setPiece(Square.at(5, 3), friendlyPiece);

      const moves = pawn.getAvailableMoves(board);

      moves.should.not.deep.include(Square.at(5, 3));
    });

    it("cannot take the opposing king", () => {
      const pawn = new Pawn(Player.WHITE);
      const opposingKing = new King(Player.BLACK);
      board.setPiece(Square.at(4, 4), pawn);
      board.setPiece(Square.at(5, 3), opposingKing);

      const moves = pawn.getAvailableMoves(board);

      moves.should.not.deep.include(Square.at(5, 3));
    });
  });

  describe("black pawns", () => {
    let board: Board;
    beforeEach(() => (board = new Board(Player.BLACK)));

    it("can only move one square down if they have already moved", () => {
      const pawn = new Pawn(Player.BLACK);
      board.setPiece(Square.at(6, 0), pawn);
      pawn.moveTo(board, Square.at(5, 0));

      const moves = pawn.getAvailableMoves(board);

      moves.should.have.length(1);
      moves.should.deep.include(Square.at(4, 0));
    });

    it("can move one or two squares down on their first move", () => {
      const pawn = new Pawn(Player.BLACK);
      board.setPiece(Square.at(6, 7), pawn);

      const moves = pawn.getAvailableMoves(board);

      moves.should.have.length(2);
      moves.should.deep.include.members([Square.at(4, 7), Square.at(5, 7)]);
    });

    it("cannot move at the bottom of the board", () => {
      const pawn = new Pawn(Player.BLACK);
      board.setPiece(Square.at(0, 3), pawn);

      const moves = pawn.getAvailableMoves(board);

      moves.should.be.empty;
    });

    it("can move diagonally if there is a piece to take", () => {
      const pawn = new Pawn(Player.BLACK);
      const opposingPiece = new Rook(Player.WHITE);
      board.setPiece(Square.at(4, 4), pawn);
      board.setPiece(Square.at(3, 3), opposingPiece);

      const moves = pawn.getAvailableMoves(board);

      moves.should.deep.include(Square.at(3, 3));
    });

    it("cannot move diagonally if there is no piece to take", () => {
      const pawn = new Pawn(Player.BLACK);
      board.setPiece(Square.at(4, 4), pawn);

      const moves = pawn.getAvailableMoves(board);

      moves.should.not.deep.include(Square.at(3, 3));
    });

    it("cannot take a friendly piece", () => {
      const pawn = new Pawn(Player.BLACK);
      const friendlyPiece = new Rook(Player.BLACK);
      board.setPiece(Square.at(4, 4), pawn);
      board.setPiece(Square.at(3, 3), friendlyPiece);

      const moves = pawn.getAvailableMoves(board);

      moves.should.not.deep.include(Square.at(3, 3));
    });

    it("cannot take the opposing king", () => {
      const pawn = new Pawn(Player.BLACK);
      const opposingKing = new King(Player.WHITE);
      board.setPiece(Square.at(4, 4), pawn);
      board.setPiece(Square.at(3, 3), opposingKing);

      const moves = pawn.getAvailableMoves(board);

      moves.should.not.deep.include(Square.at(3, 3));
    });
  });

  it("cannot move if there is a piece in front", () => {
    const pawn = new Pawn(Player.BLACK);
    const blockingPiece = new Rook(Player.WHITE);
    board.setPiece(Square.at(6, 3), pawn);
    board.setPiece(Square.at(5, 3), blockingPiece);

    const moves = pawn.getAvailableMoves(board);

    moves.should.be.empty;
  });

  it("cannot move two squares if there is a piece two sqaures in front", () => {
    const pawn = new Pawn(Player.BLACK);
    const blockingPiece = new Rook(Player.WHITE);
    board.setPiece(Square.at(6, 3), pawn);
    board.setPiece(Square.at(4, 3), blockingPiece);

    const moves = pawn.getAvailableMoves(board);

    moves.should.not.deep.include(Square.at(4, 3));
  });

  it("can en passant as white", () => {
    const blackPawn = new Pawn(Player.BLACK);
    const whitePawn = new Pawn(Player.WHITE);
    const blackKing = new King(Player.BLACK);
    const whiteKing = new King(Player.WHITE);
    board.setPiece(Square.at(6, 4), blackPawn);
    board.setPiece(Square.at(4, 5), whitePawn);
    board.setPiece(Square.at(0, 4), blackKing);
    board.setPiece(Square.at(7, 4), whiteKing);
    board.currentPlayer = Player.BLACK;
    board.movePiece(Square.at(6, 4), Square.at(4, 4));

    const moves = whitePawn.getAvailableMoves(board);

    moves.should.deep.include.members([Square.at(5, 4)]);
  });

  it("can en passant as black", () => {
    const blackPawn = new Pawn(Player.BLACK);
    const whitePawn = new Pawn(Player.WHITE);
    board.setPiece(Square.at(3, 5), blackPawn);
    board.setPiece(Square.at(1, 4), whitePawn);
    board.currentPlayer = Player.WHITE;
    board.movePiece(Square.at(1, 4), Square.at(3, 4));

    const moves = blackPawn.getAvailableMoves(board);

    moves.should.deep.include.members([Square.at(2, 4)]);
  });

  it("white should not en passant after extra moves", () => {
    const blackPawn = new Pawn(Player.BLACK);
    const whitePawn = new Pawn(Player.WHITE);
    const blackKing = new King(Player.BLACK);
    const whiteKing = new King(Player.WHITE);
    board.setPiece(Square.at(6, 4), blackPawn);
    board.setPiece(Square.at(4, 5), whitePawn);
    board.setPiece(Square.at(0, 0), blackKing);
    board.setPiece(Square.at(0, 7), whiteKing);
    board.currentPlayer = Player.BLACK;
    board.movePiece(Square.at(6, 4), Square.at(4, 4));
    board.movePiece(Square.at(0, 7), Square.at(0, 6));
    board.movePiece(Square.at(0, 0), Square.at(0, 1));

    const moves = whitePawn.getAvailableMoves(board);

    moves.should.not.deep.include.members([Square.at(5, 4)]);
  });

  it("black should not en passant after extra moves", () => {
    const blackPawn = new Pawn(Player.BLACK);
    const whitePawn = new Pawn(Player.WHITE);
    const blackKing = new King(Player.BLACK);
    const whiteKing = new King(Player.WHITE);
    board.setPiece(Square.at(3, 5), blackPawn);
    board.setPiece(Square.at(1, 4), whitePawn);
    board.setPiece(Square.at(0, 0), blackKing);
    board.setPiece(Square.at(0, 7), whiteKing);
    board.currentPlayer = Player.WHITE;
    board.movePiece(Square.at(1, 4), Square.at(3, 4));
    board.movePiece(Square.at(0, 7), Square.at(0, 6));
    board.movePiece(Square.at(0, 0), Square.at(0, 1));

    const moves = blackPawn.getAvailableMoves(board);

    moves.should.not.deep.include.members([Square.at(2, 4)]);
  });

  it("en passant and pawn gets removed as white", () => {
    const blackPawn = new Pawn(Player.BLACK);
    const whitePawn = new Pawn(Player.WHITE);
    board.setPiece(Square.at(6, 4), blackPawn);
    board.setPiece(Square.at(4, 5), whitePawn);
    board.currentPlayer = Player.BLACK;
    board.movePiece(Square.at(6, 4), Square.at(4, 4));
    board.movePiece(Square.at(4, 5), Square.at(5, 4));

    // Assert
    (board.getPiece(Square.at(4, 4)) === undefined).should.equal(true);
  });

  it("en passant and pawn gets removed as black", () => {
    const blackPawn = new Pawn(Player.BLACK);
    const whitePawn = new Pawn(Player.WHITE);
    board.setPiece(Square.at(3, 5), blackPawn);
    board.setPiece(Square.at(1, 4), whitePawn);
    board.currentPlayer = Player.WHITE;
    board.movePiece(Square.at(1, 4), Square.at(3, 4));
    board.movePiece(Square.at(3, 5), Square.at(2, 4));

    // Assert
    (board.getPiece(Square.at(3, 4)) === undefined).should.equal(true);
  });

  it("white pawn promotes to Queen", () => {
    const whitePawn = new Pawn(Player.WHITE)
    board.setPiece(Square.at(6, 5), whitePawn);
    setPromotion('Q')
    board.currentPlayer = Player.WHITE;
    board.movePiece(Square.at(6,5), Square.at(7,5));
    

    (board.getPiece(Square.at(7, 5)) instanceof Queen).should.equal(true);
  });

  it("black pawn promotes to Queen", () => {
    const blackPawn = new Pawn(Player.BLACK)
    setPromotion('Q')
    board.setPiece(Square.at(1, 5), blackPawn);
    board.currentPlayer = Player.BLACK;
    board.movePiece(Square.at(1,5), Square.at(0,5));
    

    (board.getPiece(Square.at(0, 5)) instanceof Queen).should.equal(true);
  });

  it("white pawn promotes to Rook", () => {
    const whitePawn = new Pawn(Player.WHITE)
    board.setPiece(Square.at(6, 5), whitePawn);
    setPromotion('R')
    board.currentPlayer = Player.WHITE;
    board.movePiece(Square.at(6,5), Square.at(7,5));

    (board.getPiece(Square.at(7, 5)) instanceof Rook).should.equal(true);
  });

  it("black pawn promotes to Rook", () => {
    const blackPawn = new Pawn(Player.BLACK)
    board.setPiece(Square.at(1, 5), blackPawn);
    board.currentPlayer = Player.BLACK;
    setPromotion('R')
    board.movePiece(Square.at(1,5), Square.at(0,5));

    (board.getPiece(Square.at(0, 5)) instanceof Rook).should.equal(true);
  });

  it("white pawn promotes to Knight", () => {
    const whitePawn = new Pawn(Player.WHITE)
    board.setPiece(Square.at(6, 5), whitePawn);
    setPromotion('N')
    board.currentPlayer = Player.WHITE;
    board.movePiece(Square.at(6,5), Square.at(7,5));

    (board.getPiece(Square.at(7, 5)) instanceof Knight).should.equal(true);
  });

  it("black pawn promotes to Knight", () => {
    const blackPawn = new Pawn(Player.BLACK)
    board.setPiece(Square.at(1, 5), blackPawn);
    board.currentPlayer = Player.BLACK;
    setPromotion('N')
    board.movePiece(Square.at(1,5), Square.at(0,5));

    (board.getPiece(Square.at(0, 5)) instanceof Knight).should.equal(true);
  });

  it("white pawn promotes to Bishop", () => {
    const whitePawn = new Pawn(Player.WHITE)
    board.setPiece(Square.at(6, 5), whitePawn);
    setPromotion('B')
    board.currentPlayer = Player.WHITE;
    board.movePiece(Square.at(6,5), Square.at(7,5));

    (board.getPiece(Square.at(7, 5)) instanceof Bishop).should.equal(true);
  });

  it("black pawn promotes to Bishop", () => {
    const blackPawn = new Pawn(Player.BLACK)
    board.setPiece(Square.at(1, 5), blackPawn);
    board.currentPlayer = Player.BLACK;
    setPromotion('B')
    board.movePiece(Square.at(1,5), Square.at(0,5));

    (board.getPiece(Square.at(0, 5)) instanceof Bishop).should.equal(true);
  });



});
