import App from './App';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { StrictMode } from 'react';

import './index.css';

const UI_TREE_ROOT = document.getElementById('root')!;
const root = ReactDOM.createRoot(UI_TREE_ROOT);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
