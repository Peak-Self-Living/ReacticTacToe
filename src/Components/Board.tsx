import React from "react";
import Square from "./Square";

interface BoardProps {
    onSquareClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void,
    squares: Array<string>
}
interface BoardState {
    squares: Array<string>,
    xIsNext: boolean
}

class Board extends React.Component<BoardProps, BoardState> {
    
    renderSquare(i: number) {
        return <Square squareNumber={i} value={this.props.squares[i]} onSquareClick={this.props.onSquareClick} />
    }

    render() {
        return(
            <div>
              <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
              </div>
              <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
              </div>
              <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
              </div>
            </div>
        );
    }
}

export default Board;