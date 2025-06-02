import React from 'react';

interface ScoreboardProps {
    player1: string;
    player2: string;
    score1: number;
    score2: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ player1, player2, score1, score2 }) => {
    return (
        <div className="scoreboard">
            <h2>Scoreboard</h2>
            <div className="score">
                <span>{player1}: {score1}</span>
                <span>{player2}: {score2}</span>
            </div>
        </div>
    );
};

export default Scoreboard;