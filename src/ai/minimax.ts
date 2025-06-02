export function minimax(board: string[], depth: number, isMaximizing: boolean): number {
    const scores: { [key: string]: number } = {
        'X': 1,
        'O': -1,
        'tie': 0
    };

    const result = checkWinner(board);
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X'; // AI is 'X'
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O'; // Player is 'O'
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

export function findBestMove(board: string[]): number {
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'X'; // AI is 'X'
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    return move;
}

function checkWinner(board: string[]): string | null {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    if (board.every(square => square !== '')) {
        return 'tie';
    }

    return null;
}