import { Board } from '@/components/board/board';

export const App = () => (
  <>
    <header className="header">
      <div className="container">
        <h1 className="stack">
          <span>Puzzle</span>
          <img src="/icon/favicon.svg" alt="logo" width={22} />
        </h1>
      </div>
    </header>
    <main className="main">
      <div className="container">
        <Board />
      </div>
    </main>
    <footer className="footer">
      <div className="container">
        Check the source code <a href="https://github.com/floatrx/puzzle15">GitHub</a>
      </div>
    </footer>
  </>
);
