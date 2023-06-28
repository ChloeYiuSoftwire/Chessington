import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let location = board.findPiece(this)
        let moves = [];
        for (let col = 0; col < 8; col++) {
            if (col !== location.col) {
                moves.push(new Square(location.row, col))
            }
        }
        for (let row = 0; row < 8; row++) {
            if (row !== location.row) {
                moves.push(new Square(row, location.col))
            }
        }
        return moves
    }
}
