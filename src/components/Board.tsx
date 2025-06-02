import React from 'react';
import Square from './Square';

interface BoardProps {
    squares: Array<string | null>;
    onSquareClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, onSquareClick }) => {
    return (
        <div className="board">
            {squares.map((square, index) => (
                <Square key={index} value={square} onClick={() => onSquareClick(index)} />
            ))}
        </div>
    );
};

export default Board;