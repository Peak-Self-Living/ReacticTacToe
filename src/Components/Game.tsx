import React from "react";
import Board from "./Board";
import BoardValues from "./BoardValues";

interface GameState {
  currentSquares: Array<string>,
  currentViewingQuareNumber: number,
  history: Array<BoardValues>,
  isViewingCurrentMove: boolean,
  moves: number,
  status: string,
  showNavigationControls: boolean,
  xIsNext: boolean
}

class Game extends React.Component<{}, GameState> {
    constructor(props: {}) {
        super(props);
        this.state = {
          currentSquares: [],
          currentViewingQuareNumber: 1,
          history: [{
              squares: Array(9).fill("")
            }],
          isViewingCurrentMove: true,
          moves: 0,
          showNavigationControls: false,
          status: "",
          xIsNext: true
        }
    }
    
    handleSquareClick(ev: React.MouseEvent<HTMLButtonElement>) {
      const i = Number(ev.currentTarget.value);
      const history = this.state.history;
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (this.calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        isViewingCurrentMove: true,
        moves: this.state.moves + 1,
        showNavigationControls: true,
        xIsNext: !this.state.xIsNext,
      });
    }
    
    calculateWinner(squares: Array<string>) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
    }
    goBackOneMove() {
      const squares = this.state.history[this.state.currentViewingQuareNumber - 1].squares.slice();
      this.setState({
        currentSquares: squares,
        isViewingCurrentMove: false,
      });
    }

    goForwardOneMove() {
      const squares = this.state.history[this.state.currentViewingQuareNumber + 1].squares.slice();
      this.setState({
        currentSquares: squares,
        isViewingCurrentMove: false,
      });
    }

    goToCurrentMove() {
      const squares = this.state.history[this.state.moves - 1].squares.slice();
      this.setState({
        currentSquares: squares,
        isViewingCurrentMove: true,
      });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = this.calculateWinner(current.squares);
        let status = "";
        if (winner) {
          status = "Winner: " + winner;
        } else {
          status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
        return (
          <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onSquareClick={(ev) => this.handleSquareClick(ev)}
              />
            </div>
            <div className="game-info">
              <div className="game-status">{status}</div>
              <div className="number-of-moves">Number of moves: {this.state.moves}</div>
              {this.state.showNavigationControls &&
                <div className="navigation-controls">  
                  <h4>See current and past moves</h4>                
                  <button className="nav-button" id="btnPreviousMove" onClick={this.goBackOneMove} disabled={this.state.moves < 2}>
                      Previous Move
                  </button>                
                  <button className="nav-button" id="btnNextMove" onClick={this.goForwardOneMove} disabled={this.state.isViewingCurrentMove}>
                      Next Move
                  </button>            
                  <button className="nav-button" id="btnCurrentMove" onClick={this.goToCurrentMove} disabled={this.state.isViewingCurrentMove}>
                      Current Move
                  </button>
                </div>
              }
            </div>
          </div>
        );
    }
}

export default Game;

//https://reactjs.org/tutorial/tutorial.html