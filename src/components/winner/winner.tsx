// Styles
import s from './winner.module.css';

interface IProps {
  moves: number;
  max: number;
  onReset: () => void;
}

export const Winner: FC<IProps> = ({ moves, max, onReset }) => {
  return (
    <div className={s.wrapper}>
      <em className={s.icon}>🎊</em>
      <span className={s.text}>YOU WON!</span>
      <div className={s.score}>
        Solved! <p>Your moves: {moves}</p>
        <p>Recommend: {max}</p>
      </div>
      <button className={s.button} onClick={onReset}>
        New Game
      </button>
    </div>
  );
};
