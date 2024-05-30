// Styles
import s from './winner.module.scss';

interface IProps {
  moves: number;
  onReset: () => void;
}

export const Winner: FC<IProps> = ({ moves, onReset }) => {
  return (
    <div className={s.wrapper}>
      <em className={s.icon}>🎊</em>
      <span className={s.text}>YOU WON!</span>
      <div className={s.score}>
        Solved! <p>Your moves: {moves}</p>
      </div>
      <button className={s.button} onClick={onReset}>
        New Game
      </button>
    </div>
  );
};
