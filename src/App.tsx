import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import './styles/main.css';

const initialSquares = Array(9).fill(null);

const App: React.FC = () => {
    const [squares, setSquares] = useState<Array<string | null>>(initialSquares);
    const [isXNext, setIsXNext] = useState(true);
    const [score, setScore] = useState({ X: 0, O: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const calculateWinner = (squares: Array<string | null>) => {
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
    };

    const handleSquareClick = (index: number) => {
        if (squares[index] || gameOver) return;

        const newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);

        const winner = calculateWinner(newSquares);
        if (winner) {
            setScore(prev => ({
                ...prev,
                [winner]: prev[winner as 'X' | 'O'] + 1
            }));
            setGameOver(true);
        } else if (newSquares.every(square => square)) {
            setGameOver(true);
        }
    };

    const resetGame = () => {
        setSquares(initialSquares);
        setIsXNext(true);
        setGameOver(false);
    };

    return (
        <div className="app">
            <div className="theme-selector">
                <select
                    value={theme}
                    onChange={e => setTheme(e.target.value as 'light' | 'dark')}
                >
                    <option value="light">🌞 Claro</option>
                    <option value="dark">🌙 Oscuro</option>
                </select>
            </div>
            <h1>Tres en Raya</h1>
            <Scoreboard player1="X" player2="O" score1={score.X} score2={score.O} />
            <Board squares={squares} onSquareClick={handleSquareClick} />
            {gameOver && (
                <div className="game-over">
                    <p>
                        {calculateWinner(squares)
                            ? `¡Ganó ${calculateWinner(squares)}!`
                            : '¡Empate!'}
                    </p>
                    <button onClick={resetGame}>Reiniciar</button>
                </div>
            )}
        </div>
    );
};

export default App;