import Bishop from "../../../src/engine/pieces/bishop";
import Board from "../../../src/engine/board";
import Player from "../../../src/engine/player";
import Square from "../../../src/engine/square";
import Pawn from "../../../src/engine/pieces/pawn";
import King from "../../../src/engine/pieces/king";
import Queen from "../../../src/engine/pieces/queen";
import Knight from "../../../src/engine/pieces/knight";
import Rook from "../../../src/engine/pieces/rook";

describe("Check", () => {
  let board: Board;
  beforeEach(() => (board = new Board()));

  it("pawn can't move if illegal move", () => {
    const whiteKing = new King(Player.WHITE);
    const blackKing = new King(Player.BLACK);
    const whitePawn = new Pawn(Player.WHITE);
    const blackQueen = new Queen(Player.BLACK);
    board.whiteKingSquare = Square.at(0, 4);
    board.blackKingSquare = Square.at(7, 7);
    board.setPiece(Square.at(0, 4), whiteKing);
    board.setPiece(Square.at(7, 7), blackKing);
    board.setPiece(Square.at(1, 5), whitePawn);
    board.setPiece(Square.at(3, 7), blackQueen);

    board.currentPlayer = Player.WHITE;

    const moves = whitePawn.getAvailableMoves(board);

    moves.should.not.deep.include(Square.at(3, 5));
  });

  it("bishops can't move if illegal move", () => {
    const whiteKing = new King(Player.WHITE);
    const blackKing = new King(Player.BLACK);
    const whiteBishop = new Bishop(Player.WHITE);
    const blackQueen = new Queen(Player.BLACK);
    board.whiteKingSquare = Square.at(0, 4);
    board.blackKingSquare = Square.at(7, 7);
    board.setPiece(Square.at(0, 4), whiteKing);
    board.setPiece(Square.at(7, 7), blackKing);
    board.setPiece(Square.at(1, 5), whiteBishop);
    board.setPiece(Square.at(3, 7), blackQueen);

    board.currentPlayer = Player.WHITE;

    const moves = whiteBishop.getAvailableMoves(board);

    moves.should.not.deep.include(Square.at(0, 6));
  });

  it("knights can't move if illegal move", () => {
    const whiteKing = new King(Player.WHITE);
    const blackKing = new King(Player.BLACK);
    const whiteKnight = new Knight(Player.WHITE);
    const blackRook = new Rook(Player.BLACK);
    board.whiteKingSquare = Square.at(0, 3);
    board.blackKingSquare = Square.at(7, 7);
    board.setPiece(Square.at(0, 3), whiteKing);
    board.setPiece(Square.at(7, 7), blackKing);
    board.setPiece(Square.at(1, 3), whiteKnight);
    board.setPiece(Square.at(5, 3), blackRook);

    board.currentPlayer = Player.WHITE;

    const moves = whiteKnight.getAvailableMoves(board);

    moves.should.not.deep.include(Square.at(3, 4));
  });

  it("king can't move if illegal move", () => {
    const whiteKing = new King(Player.WHITE);
    const blackQueen = new Rook(Player.BLACK);
    const blackKing = new King(Player.BLACK);
    board.whiteKingSquare = Square.at(0, 4);
    board.blackKingSquare = Square.at(7, 7);
    board.setPiece(Square.at(0, 4), whiteKing);
    board.setPiece(Square.at(3, 3), blackQueen);
    board.setPiece(Square.at(7, 7), blackKing);

    board.currentPlayer = Player.WHITE;

    const moves = whiteKing.getAvailableMoves(board);

    moves.should.not.deep.include(Square.at(0, 3));
  });

  it("rook can't move if illegal move", () => {
    const whiteKing = new King(Player.WHITE);
    const blackKing = new King(Player.BLACK);
    const whiteRook = new Rook(Player.WHITE);
    const blackRook = new Rook(Player.BLACK);
    board.whiteKingSquare = Square.at(0, 3);
    board.blackKingSquare = Square.at(7, 7);
    board.setPiece(Square.at(0, 3), whiteKing);
    board.setPiece(Square.at(7, 7), blackKing);
    board.setPiece(Square.at(1, 3), whiteRook);
    board.setPiece(Square.at(5, 3), blackRook);

    board.currentPlayer = Player.WHITE;

    const moves = whiteRook.getAvailableMoves(board);

    moves.should.not.deep.include(Square.at(1, 4));
  });

  it("queen can't move if illegal move", () => {
    const whiteKing = new King(Player.WHITE);
    const blackKing = new King(Player.BLACK);
    const whiteQueen = new Queen(Player.WHITE);
    const blackRook = new Rook(Player.BLACK);
    board.whiteKingSquare = Square.at(0, 3);
    board.blackKingSquare = Square.at(7, 7);
    board.setPiece(Square.at(0, 3), whiteKing);
    board.setPiece(Square.at(7, 7), blackKing);
    board.setPiece(Square.at(1, 3), whiteQueen);
    board.setPiece(Square.at(5, 3), blackRook);

    board.currentPlayer = Player.WHITE;

    const moves = whiteQueen.getAvailableMoves(board);

    moves.should.not.deep.include(Square.at(1, 4));
  });
});
