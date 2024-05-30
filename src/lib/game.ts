import type { Grid } from '@/types/game';

/**
 * Generate game board 4x4
 * with numbers from 1 to 15 in order
 */
export const generateBoard = (): Grid =>
  Array.from({ length: 4 }, (_, i) => {
    return Array.from({ length: 4 }, (_, j) => {
      if (i === 3 && j === 3) {
        return null;
      }
      return i * 4 + j + 1;
    });
  });

/**
 * Get shuffle count by level
 * NOTE: Complexity K is a constant that defines the difficulty of the game
 * @param level
 */
export const calcShuffles = (level: number) => {
  const COMPLEXITY_K = 30; // "30" is hardcoded at this moment -> TODO: Debug & balance it!
  return level * COMPLEXITY_K;
};

/**
 * Shuffle the board
 * @param array
 * @param shuffleCount
 */
export const shuffleBoard = (array: Grid, shuffleCount: number): Grid => {
  const board: Grid = array.map((row) => [...row]); // Copy the array
  // Possible moves for the empty cell
  const possibleMoves = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]; // up, down, left, right

  let emptyCellCoordinates = [-1, -1];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === null) {
        emptyCellCoordinates = [i, j];
        break;
      }
    }
  }

  for (let i = 0; i < shuffleCount; i++) {
    const validMoves = possibleMoves.filter(([di, dj]) => {
      const [newI, newJ] = [emptyCellCoordinates[0] + di, emptyCellCoordinates[1] + dj];
      return newI >= 0 && newI < 4 && newJ >= 0 && newJ < 4;
    });

    if (validMoves.length > 0) {
      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
      const [newI, newJ] = [emptyCellCoordinates[0] + randomMove[0], emptyCellCoordinates[1] + randomMove[1]];

      // Swap the empty cell with the randomly selected cell
      [board[emptyCellCoordinates[0]][emptyCellCoordinates[1]], board[newI][newJ]] = [
        board[newI][newJ],
        board[emptyCellCoordinates[0]][emptyCellCoordinates[1]],
      ];

      // Update the empty cell coordinates
      emptyCellCoordinates = [newI, newJ];
    }
  }

  return board;
};

/**
 * Get initial board with shuffle
 * @param level
 */
export const getInitialBoard = (level: number): Grid => {
  const initialBoard = generateBoard();
  return shuffleBoard(initialBoard, calcShuffles(level));
};

/**
 * Validate move
 * @param coordinates
 * @param board
 * @param cb
 */
export const validateMove = (coordinates: [number, number], board: Grid, cb: (newBoard: Grid) => void) => {
  const [i, j] = coordinates;

  // If current cell is empty -> do nothing (also covered by css pointer-events: none)
  if (!board[i][j]) return { isValid: false, message: 'Empty cell' };

  // Try to find nearest null cell -> possible moves
  const possibleMoves = [
    [i - 1, j],
    [i + 1, j],
    [i, j - 1],
    [i, j + 1],
  ];

  // check nearest null cell and swap
  const [si, sj] = possibleMoves.find(([i, j]) => board[i]?.[j] === null) || [-1, -1];

  if (si === -1 || sj === -1) {
    console.log('Bad move!');
    return { isValid: false, message: 'Bad move' };
  }
  //
  const newBoard = [...board];
  [newBoard[i][j], newBoard[si][sj]] = [newBoard[si][sj], newBoard[i][j]];

  cb(newBoard);

  return { isValid: true, si, sj };
};

/**
 * Check if the board is in win state
 * @param board
 */
export const checkIsWin = (board: Grid) => {
  const flatBoard = board.flat();
  return flatBoard.every((value, i) => {
    if (value === null) {
      return i === flatBoard.length - 1;
    }
    return value === i + 1;
  });
};
