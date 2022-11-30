import { createRoot } from 'react-dom/client';

import './css/main.css';

import App from './components/App';
import { AppProvider } from './store';
import { DEFAULT_STATE } from './store';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AppProvider defaultState={DEFAULT_STATE}>
    <App />
  </AppProvider>
);
