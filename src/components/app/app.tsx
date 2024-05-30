import { Board } from '@/components/board/board.tsx';

// Styles
import s from './app.module.scss';

export const App = () => (
  <div className={s.app}>
    <header className={s.header}>
      <h1 className="stack">
        <span>Puzzle</span>
        <img src="/icon/favicon.svg" alt="logo" width={22} />
      </h1>
    </header>
    <main className={s.main}>
      <Board />
    </main>
    <footer className={s.footer}>
      <span>Check the source code</span>
      <a href="https://github.com/floatrx/puzzle15">GitHub</a>
    </footer>
  </div>
);
