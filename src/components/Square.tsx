import React from 'react';

interface SquareProps {
    value: string | null;
    onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
    return (
        <button className="square" onClick={onClick}>
            <span style={{
                opacity: value ? 1 : 0,
                transition: 'opacity 0.2s',
                display: 'inline-block'
            }}>
                {value}
            </span>
        </button>
    );
};

export default Square;