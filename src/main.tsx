import { createRoot } from 'react-dom/client';
import { App } from '@/components/app/app.tsx';

// Styles
import '@/styles/index.scss';

createRoot(document.getElementById('root')!).render(<App />);
