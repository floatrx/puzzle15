import { useState, useEffect } from 'react';
import { getInitialBoard, validateMove, checkIsWin } from '@/lib/game.ts';
import { playSound } from '@/lib/sounds.ts';

export const useGame = () => {
  const [isWin, setWin] = useState(false);
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(0);
  const [board, setBoard] = useState(getInitialBoard(level));

  const checkMove = (coordinates: [number, number]) => {
    const isValid = validateMove(coordinates, board, setBoard);

    // Bad move!
    if (!isValid) {
      playSound('error');
      return;
    }

    playSound('move');

    // Increment moves counter
    setMoves((prev) => prev + 1);
  };

  const resetGame = () => {
    // Next level
    if (isWin) {
      setLevel((prev) => prev + 1);
    }

    // Reset board
    setBoard(getInitialBoard(isWin ? level + 1 : level));

    playSound('reset');
    setWin(false);
    setMoves(0);
  };

  useEffect(() => {
    if (!checkIsWin(board)) return;
    console.log('👋 You win!');
    playSound('win');
    setWin(true);
  }, [board]);

  return {
    isWin,
    moves,
    level,
    board,
    checkMove,
    resetGame,
  };
};
