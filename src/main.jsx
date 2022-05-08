import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <App />,
  // it seems that React.StrictMode makes useEffect render twice
);
