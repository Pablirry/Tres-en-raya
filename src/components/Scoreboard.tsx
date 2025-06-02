import React from 'react';

interface ScoreboardProps {
    player1: string;
    player2: string;
    score1: number;
    score2: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ player1, player2, score1, score2 }) => (
    <div className="scoreboard">
        <span>{player1}: {score1}</span>
        <span>{player2}: {score2}</span>
    </div>
);

export default Scoreboard;