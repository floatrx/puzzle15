import { Cell } from '@/components/cell/cell';
import { Winner } from '@/components/winner/winner';

// Styles
import s from './board.module.scss';
import { useGame } from '@/hooks/use-game.ts';

interface IProps {}

export const Board: FC<IProps> = () => {
  const { isWin, moves, resetGame, level, board, checkMove } = useGame();

  // Render winner screen
  if (isWin) {
    return <Winner moves={moves} onReset={resetGame} />;
  }

  // Game board
  return (
    <section className={s.section}>
      <p className={s.stats}>
        Moves: <strong>{moves}</strong> / Level: <strong>{level}</strong>
        <button onClick={resetGame}>[Reset]</button>
      </p>
      <div className={s.board}>
        {board.map((row, i) =>
          row.map((value, j) => <Cell key={j} coordinates={[i, j]} value={value} onClick={checkMove} />),
        )}
      </div>
    </section>
  );
};
