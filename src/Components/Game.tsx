import React from "react";
import Board from "./Board";
import BoardValues from "./BoardValues";
import Button from '@material-ui/core/Button';

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
    goBackOneMove(ev: React.MouseEvent<HTMLButtonElement>) {
      const squares = this.state.history[this.state.currentViewingQuareNumber - 1].squares.slice();
      this.setState({
        currentSquares: squares,
        isViewingCurrentMove: false,
      });
    }

    goForwardOneMove(ev: React.MouseEvent<HTMLButtonElement>) {
      const squares = this.state.history[this.state.currentViewingQuareNumber + 1].squares.slice();
      this.setState({
        currentSquares: squares,
        isViewingCurrentMove: false,
      });
    }

    goToCurrentMove(ev: React.MouseEvent<HTMLButtonElement>) {
      const squares = this.state.history[this.state.moves - 1].squares.slice();
      this.setState({
        currentSquares: squares,
        isViewingCurrentMove: true,
      });
    }
    newGame(ev: React.MouseEvent<HTMLButtonElement>) {
      this.setState({
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
      });
    }
    quitGame(ev: React.MouseEvent<HTMLButtonElement>) {
      this.setState({
        currentSquares: Array(9).fill(""),
        currentViewingQuareNumber: 0,
        history: {} as BoardValues[],
        isViewingCurrentMove: false,
        moves: 0,
        status: "quit game",
        showNavigationControls: false,
        xIsNext: false
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
                  <fieldset>
                    <legend>Move History</legend>              
                    <Button className="nav-button" id="btnPreviousMove" onClick={this.goBackOneMove} disabled={this.state.moves < 2}>
                      &lt;&lt;
                    </Button>                
                    <Button className="nav-button" id="btnNextMove" onClick={this.goForwardOneMove} disabled={this.state.isViewingCurrentMove}>
                        &gt;&gt;
                    </Button>            
                    <Button className="nav-button" id="btnCurrentMove" onClick={this.goToCurrentMove} disabled={this.state.isViewingCurrentMove}>
                        Current
                    </Button>
                  </fieldset> 
                </div>
              }        
              <div className="game-controls"> 
                <fieldset>
                  <legend>Game controls</legend>              
                  <Button className="game-button" id="btnNewGame" onClick={this.newGame} disabled={this.state.moves == 0}>
                      New
                  </Button>                
                  <Button className="game-button" id="btnNextMove" onClick={this.quitGame} disabled={this.state.moves == 0}>
                      Quit
                  </Button>   
                </fieldset> 
              </div>
            </div>
          </div>
        );
    }
}

export default Game;