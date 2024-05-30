/**
 * ✨ Game logic ✨
 * Used contractions:
 *    r - row
 *    c - column
 *    mt - empty cell
 */
import type { Grid } from '@/types/game';

/**
 * Generate game board 4x4
 * with numbers from 1 to 15 in order
 */
export const generateBoard = (): Grid =>
  Array.from({ length: 4 }, (_, r) => {
    return Array.from({ length: 4 }, (_, c) => {
      if (r === 3 && c === 3) {
        return null;
      }
      return r * 4 + c + 1;
    });
  });

/**
 * Get shuffle count by level
 * NOTE: Complexity K is a constant that defines the difficulty of the game
 * @param lvl
 */
export const calcShuffles = (lvl: number) => {
  const COMPLEXITY_K = 30; // "30" is hardcoded at this moment -> TODO: Debug & balance it!
  return lvl * COMPLEXITY_K;
};

/**
 * Shuffle the board
 * Simulate user moves in random directions to get solvable board!
 * Algorithm:
 *  1. Find the empty cell
 *  2. Find possible moves
 *  3. Select random move
 *  4. Swap the empty cell with the randomly selected cell
 *  5. Update the empty cell coordinates
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

  // Find the empty cell before shuffling
  let emptyCellCoordinates = [-1, -1];
  for (let row = 0; row < 4; row++) {
    for (let cell = 0; cell < 4; cell++) {
      if (board[row][cell] === null) {
        emptyCellCoordinates = [row, cell];
        break;
      }
    }
  }

  // Empty cell coordinates
  const [mtR, mtC] = emptyCellCoordinates;

  // Shuffle the board
  for (let row = 0; row < shuffleCount; row++) {
    const validMoves = possibleMoves.filter(([dr, dc]) => {
      const [newR, newC] = [emptyCellCoordinates[0] + dr, emptyCellCoordinates[1] + dc];
      return newR >= 0 && newR < 4 && newC >= 0 && newC < 4;
    });

    if (validMoves.length > 0) {
      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
      const [newR, newC] = [emptyCellCoordinates[0] + randomMove[0], emptyCellCoordinates[1] + randomMove[1]];

      // Swap the empty cell with the randomly selected cell
      [board[mtR][mtC], board[newR][newC]] = [board[newR][newC], board[mtR][mtC]];

      // Update the empty cell coordinates
      emptyCellCoordinates = [newR, newC];
    }
  }

  return board;
};

/**
 * Get initial board with shuffle
 * @param lvl
 */
export const getInitialBoard = (lvl: number): Grid => {
  const initialBoard = generateBoard();
  return shuffleBoard(initialBoard, calcShuffles(lvl));
};

/**
 * Validate move
 * Algorithm:
 *  1. Check if the current cell is empty
 *  2. Find the nearest null cell
 *  3. Swap the current cell with the nearest null cell
 *  4. Update the board
 * @param coordinates - clicked cell coordinates
 * @param board
 * @param cb - callback/setState(action) to update the board (executed only if the move is valid)
 */
export const validateMove = (coordinates: [number, number], board: Grid, cb: (newBoard: Grid) => void): boolean => {
  const [r, c] = coordinates;

  // If current cell is empty -> do nothing (also covered by css pointer-events: none)
  if (!board[r][c]) return false;

  // Try to find nearest null cell -> possible moves
  const possibleMoves = [
    [r - 1, c],
    [r + 1, c],
    [r, c - 1],
    [r, c + 1],
  ];

  // check nearest null cell coordinates
  const [mtR, mtC] = possibleMoves.find(([i, j]) => board[i]?.[j] === null) || [-1, -1];

  // null cell -> not found
  if (mtR === -1 || mtC === -1) {
    console.log('Bad move!');
    return false;
  }

  // swap the current cell with the nearest null cell
  const newBoard = [...board];
  [newBoard[r][c], newBoard[mtR][mtC]] = [newBoard[mtR][mtC], newBoard[r][c]];

  // update the board using callback
  cb(newBoard);

  return true;
};

/**
 * Check if the board is in win state
 * Algorithm:
 *  1. Flatten the board
 *  2. Check if all cells are in order
 *  3. Check if the last cell is empty
 *  4. Return the true if all conditions are met
 * @param board
 */
export const checkIsWin = (board: Grid) => {
  const flatBoard = board.flat();
  return flatBoard.every((cell, idx) => {
    if (cell === null) {
      return idx === flatBoard.length - 1;
    }
    return cell === idx + 1;
  });
};
