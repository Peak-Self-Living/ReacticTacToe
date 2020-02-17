import React from 'react';

interface SquareProps {
    value: string,
    onSquareClick: (ev: React.MouseEvent<HTMLButtonElement>) => void
}
interface SquareState {
    value: string
}

class Square extends React.Component<SquareProps, SquareState> {
    constructor(props: SquareProps) {
        super(props);
        this.state = {
            value: ''
        }
    }
    render() {
        return (
            <button className="square" onClick={this.props.onSquareClick}>
                {this.props.value}
            </button>
        );
    }
}

export default Square;