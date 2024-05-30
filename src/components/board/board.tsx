import { useState, useEffect } from 'react';
import { Cell } from '@/components/cell/cell';
import { Winner } from '@/components/winner/winner';
import { checkIsWin, getInitialBoard, validateMove, calcShuffles } from '@/lib/game';
import { playSound } from '@/lib/sounds';

// Styles
import s from './board.module.css';

interface IProps {}

export const Board: FC<IProps> = () => {
  const [isWin, setWin] = useState(false);
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(0);
  const [board, setBoard] = useState(getInitialBoard(level));

  const recommendMovesCount = calcShuffles(level);

  const handleCellClick = (coordinates: [number, number]) => {
    const { isValid } = validateMove(coordinates, board, setBoard);

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
    setMoves(0);
    setLevel((prev) => prev + 1);
    setWin(false);
    setBoard(getInitialBoard(level + 1)); // next level
    playSound('reset');
  };

  useEffect(() => {
    if (!checkIsWin(board)) return;
    console.log('👋 You win!');
    playSound('win');
    setWin(true);
  }, [board]);

  // Render winner screen
  if (isWin) {
    return <Winner moves={moves} max={recommendMovesCount} onReset={resetGame} />;
  }

  // Game board
  return (
    <section className={s.section}>
      <p className={s.stats}>
        Moves:{' '}
        <strong>
          {moves}/{recommendMovesCount}
        </strong>{' '}
        / Level: <strong>{level}</strong>
        <button onClick={resetGame}>[Reset]</button>
      </p>
      <div className={s.board}>
        {board.map((row, i) =>
          row.map((value, j) => <Cell key={j} coordinates={[i, j]} value={value} onClick={handleCellClick} />),
        )}
      </div>
      <p className="pt-2 text-center opacity-60">
        This board can be solved in <strong>{recommendMovesCount}</strong> moves.
      </p>
    </section>
  );
};
