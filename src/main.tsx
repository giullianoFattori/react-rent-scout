import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppProvider } from './app/providers/AppProvider';
import { AppRoutes } from './routes/AppRoutes';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </React.StrictMode>
);
