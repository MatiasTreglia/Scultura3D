// src/App.jsx (VERSIÓN FINAL Y CORRECTA)

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; 
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 

import Home from "./pages/home";           
import Productos from "./pages/Productos"; 
import TuDiseno from "./pages/TuDiseño";   
import Carrito from "./pages/Carrito";     

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/diseno" element={<TuDiseno />} />
            <Route path="/carrito" element={<Carrito />} />
            {/* Puedes agregar rutas 404 si quieres */}
            {/* <Route path="*" element={<h1>404 Not Found</h1>} /> */}
        </Routes>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;