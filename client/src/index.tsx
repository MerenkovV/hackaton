import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import RootStore, { Context } from './store/RootStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Context.Provider value={new RootStore()}>
      <App />
    </Context.Provider>
    
  </React.StrictMode>
);

