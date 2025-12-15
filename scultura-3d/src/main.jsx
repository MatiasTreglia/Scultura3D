// src/main.jsx (Actualizado con Bootstrap)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 1. Importar el CSS de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; 
// 2. Importar tu CSS personalizado
import './index.css'; 



// 2. Renderización de la Aplicación
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode ayuda a detectar problemas potenciales en la aplicación
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);