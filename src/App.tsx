import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import { minimax } from './ai/minimax';
import './styles/main.css';

const initialSquares = Array(9).fill(null);

const App: React.FC = () => {
    const [squares, setSquares] = useState<Array<string | null>>(initialSquares);
    const [isXNext, setIsXNext] = useState(true);
    const [score, setScore] = useState({ X: 0, O: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [mode, setMode] = useState<'pvp' | 'ai'>('ai');
    const aiPlayer = 'O';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    useEffect(() => {
        if (
            mode === 'ai' &&
            !gameOver &&
            !isXNext // IA es 'O'
        ) {
            const bestMove = getBestMove(squares, aiPlayer);
            if (bestMove !== -1) {
                setTimeout(() => {
                    handleSquareClick(bestMove, true);
                }, 500);
            }
        }
        // eslint-disable-next-line
    }, [squares, isXNext, gameOver, mode]);

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

    const handleSquareClick = (index: number, isAI = false) => {
        if (squares[index] || gameOver) return;
        if (mode === 'ai' && !isXNext && !isAI) return;

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

    function getBestMove(board: Array<string | null>, player: string): number {
        // Margen de error: 30% de las veces la IA elige un movimiento subóptimo
        const errorMargin = 0.3;
        const moves: { idx: number, score: number }[] = [];

        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                const newBoard = board.slice();
                newBoard[i] = player;
                const score = minimax(newBoard.map(x => x || ''), 0, false);
                moves.push({ idx: i, score });
            }
        }

        // Ordena los movimientos de mejor a peor
        moves.sort((a, b) => b.score - a.score);

        if (moves.length === 0) return -1;

        if (Math.random() < errorMargin && moves.length > 1) {
            // Elige entre el segundo o tercer mejor movimiento (si existen)
            const suboptimalMoves = moves.slice(1, Math.min(3, moves.length));
            return suboptimalMoves[Math.floor(Math.random() * suboptimalMoves.length)].idx;
        }

        // Movimiento óptimo
        return moves[0].idx;
    }

    const resetGame = () => {
        setSquares(initialSquares);
        setIsXNext(true);
        setGameOver(false);
    };

    // Reiniciar todo al cambiar de modo
    useEffect(() => {
        resetGame();
        setScore({ X: 0, O: 0 });
    }, [mode]);

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
            <div style={{ marginBottom: 16 }}>
                <select
                    value={mode}
                    onChange={e => setMode(e.target.value as 'pvp' | 'ai')}
                    style={{
                        borderRadius: 8,
                        padding: '6px 12px',
                        border: '1px solid #e0e7ef',
                        background: 'var(--score-bg)',
                        color: 'var(--text)',
                        fontWeight: 500,
                        outline: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <option value="ai">Jugador vs IA</option>
                    <option value="pvp">Jugador vs Jugador</option>
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