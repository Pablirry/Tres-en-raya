export type Player = 'X' | 'O';

export interface GameState {
    board: Player[][];
    currentPlayer: Player;
    winner: Player | null;
    isDraw: boolean;
}

export interface Score {
    playerX: number;
    playerO: number;
}

export interface GameProps {
    gameState: GameState;
    onSquareClick: (row: number, col: number) => void;
}

export interface ScoreboardProps {
    score: Score;
    playerXName: string;
    playerOName: string;
}