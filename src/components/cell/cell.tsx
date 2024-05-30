// Styles
import { cn } from '@/lib/utils';
import s from './cell.module.scss';

interface IProps {
  className?: string;
  coordinates: [number, number];
  value: number | null;
  onClick: (coordinates: [number, number]) => void;
}

export const Cell: FC<IProps> = ({ className, value, coordinates, onClick }) => {
  return (
    <button onClick={() => onClick(coordinates)} className={cn(s.cell, className, { [s.empty]: value === null })}>
      {value}
    </button>
  );
};
