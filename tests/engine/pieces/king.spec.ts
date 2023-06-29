import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from '../../../src/engine/pieces/rook';
import Queen from '../../../src/engine/pieces/queen';
import Bishop from '../../../src/engine/pieces/bishop';
import Knight from '../../../src/engine/pieces/knight';

describe('King', () => {
    let board: Board;
    beforeEach(() => board = new Board());

    it('can move to adjacent squares', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(2, 3), Square.at(2, 4), Square.at(2, 5), Square.at(3, 5),
            Square.at(4, 5), Square.at(4, 4), Square.at(4, 3), Square.at(3, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        moves.should.have.length(8);
    });

    it('cannot leave the board', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(0, 0), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(0, 1), Square.at(1, 1), Square.at(1, 0)];

        moves.should.have.deep.members(expectedMoves);
    });

    it('can take opposing pieces', () => {
        const king = new King(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(5, 5));
    });

    it('cannot take the opposing king', () => {
        const king = new King(Player.WHITE);
        const opposingKing = new King(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingKing);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('cannot take friendly pieces', () => {
        const king = new King(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), friendlyPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('rook can check king', () => {
        const whiteKing = new King(Player.WHITE);
        const blackRook = new Rook(Player.BLACK);
        board.setPiece(Square.at(4, 4), whiteKing);
        board.setPiece(Square.at(0, 4), blackRook);

        board.isAttacked(Square.at(4, 4), Player.BLACK).should.equal(true);
    });

    it('queen can check king on file', () => {
        const whiteKing = new King(Player.WHITE);
        const blackQueen = new Queen(Player.BLACK);
        board.setPiece(Square.at(4, 4), whiteKing);
        board.setPiece(Square.at(0, 4), blackQueen);

        board.isAttacked(Square.at(4, 4), Player.BLACK).should.equal(true);
    });

    it('Opposing Pawn Blocks Check for Rook', () => {
        const whiteKing = new King(Player.WHITE);
        const blackRook = new Rook(Player.BLACK);
        const blackPawn = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), whiteKing);
        board.setPiece(Square.at(0, 4), blackRook);
        board.setPiece(Square.at(2, 4), blackPawn);

        board.isAttacked(Square.at(4, 4), Player.BLACK).should.equal(false);
    });

    it('Opposing Pawn Blocks Check for Queen', () => {
        const whiteKing = new King(Player.WHITE);
        const blackQueen = new Queen(Player.BLACK);
        const blackPawn = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), whiteKing);
        board.setPiece(Square.at(0, 4), blackQueen);
        board.setPiece(Square.at(2, 4), blackPawn);

        board.isAttacked(Square.at(4, 4), Player.BLACK).should.equal(false);
    });

    it('same rook doesn\'t attack king', () => {
        const blackKing = new King(Player.BLACK);
        const blackRook = new Rook(Player.BLACK);
        board.setPiece(Square.at(4, 4), blackKing);
        board.setPiece(Square.at(0, 4), blackRook);

        board.isAttacked(Square.at(4, 4), Player.WHITE).should.equal(false);
    });

    it('same queen doesn\'t attack king', () => {
        const blackKing = new King(Player.BLACK);
        const blackQueen = new Queen(Player.BLACK);
        board.setPiece(Square.at(4, 4), blackKing);
        board.setPiece(Square.at(0, 4), blackQueen);

        board.isAttacked(Square.at(4, 4), Player.WHITE).should.equal(false);
    });

    it('bishop can check king', () => {
        const whiteKing = new King(Player.WHITE);
        const blackBishop = new Bishop(Player.BLACK);
        board.setPiece(Square.at(6, 1), whiteKing);
        board.setPiece(Square.at(2, 5), blackBishop);

        board.isAttacked(Square.at(6, 1), Player.BLACK).should.equal(true);
    });

    it('queen can check king on diagonal', () => {
        const whiteKing = new King(Player.WHITE);
        const blackQueen = new Queen(Player.BLACK);
        board.setPiece(Square.at(6, 1), whiteKing);
        board.setPiece(Square.at(2, 5), blackQueen);

        board.isAttacked(Square.at(6, 1), Player.BLACK).should.equal(true);
    });

    it('Opposing Pawn Blocks Check for Bishop', () => {
        const whiteKing = new King(Player.WHITE);
        const blackBishop = new Bishop(Player.BLACK);
        const blackPawn = new Pawn(Player.BLACK);
        board.setPiece(Square.at(6, 1), whiteKing);
        board.setPiece(Square.at(2, 5), blackBishop);
        board.setPiece(Square.at(3, 4), blackPawn);

        board.isAttacked(Square.at(6, 1), Player.BLACK).should.equal(false);
    });

    it('Opposing Pawn Blocks Check for Queen', () => {
        const whiteKing = new King(Player.WHITE);
        const blackQueen = new Queen(Player.BLACK);
        const blackPawn = new Pawn(Player.BLACK);
        board.setPiece(Square.at(6, 1), whiteKing);
        board.setPiece(Square.at(2, 5), blackQueen);
        board.setPiece(Square.at(3, 4), blackPawn);

        board.isAttacked(Square.at(6, 1), Player.BLACK).should.equal(false);
    });

    it('same rook doesn\'t attack king', () => {
        const blackKing = new King(Player.BLACK);
        const blackBishop = new Bishop(Player.BLACK);
        board.setPiece(Square.at(6, 1), blackKing);
        board.setPiece(Square.at(2, 5), blackBishop);

        board.isAttacked(Square.at(6, 1), Player.WHITE).should.equal(false);
    });

    it('same queen doesn\'t attack king', () => {
        const blackKing = new King(Player.BLACK);
        const blackQueen = new Queen(Player.BLACK);
        board.setPiece(Square.at(6, 1), blackKing);
        board.setPiece(Square.at(2, 5), blackQueen);

        board.isAttacked(Square.at(6, 1), Player.WHITE).should.equal(false);
    });

    it('knight can check king', () => {
        const whiteKing = new King(Player.WHITE);
        const blackKnight = new Knight(Player.BLACK);
        board.setPiece(Square.at(1, 1), whiteKing);
        board.setPiece(Square.at(3, 2), blackKnight);

        board.isAttacked(Square.at(1, 1), Player.BLACK).should.equal(true);
    });

    it('same knight doesn\'t attack king', () => {
        const blackKing = new King(Player.BLACK);
        const blackKnight = new Knight(Player.BLACK);
        board.setPiece(Square.at(1, 1), blackKing);
        board.setPiece(Square.at(3, 2), blackKnight);

        board.isAttacked(Square.at(1, 1), Player.WHITE).should.equal(false);
    });

    it('black pawn can check white king', () => {
        const whiteKing = new King(Player.WHITE);
        const blackPawn = new Pawn(Player.BLACK);
        board.setPiece(Square.at(2, 2), whiteKing);
        board.setPiece(Square.at(3, 3), blackPawn);

        board.isAttacked(Square.at(2, 2), Player.BLACK).should.equal(true);
    });

    it('white pawn can check black king', () => {
        const blackKing = new King(Player.BLACK);
        const whitePawn = new Pawn(Player.WHITE);
        board.setPiece(Square.at(3, 3), blackKing);
        board.setPiece(Square.at(2, 2), whitePawn);

        board.isAttacked(Square.at(3, 3), Player.WHITE).should.equal(true);
    });

    

});
