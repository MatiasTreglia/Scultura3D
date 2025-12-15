// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom';
import { CartProvider } from './context/CartProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter> 
      <CartProvider> 
        <App />
      </CartProvider>
    </HashRouter>
  </React.StrictMode>,
);