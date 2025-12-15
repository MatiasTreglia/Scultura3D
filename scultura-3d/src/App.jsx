// src/App.jsx

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer"; 
import Home from "./pages/Home"; 
import Productos from "./pages/Productos";
import TuDiseno from "./pages/TuDiseno"; // <-- ¡CLAVE: Importación sin Ñ!
import Carrito from "./pages/Carrito";

const App = () => {
    return (
        <>
            <Navbar />
            
            <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/productos" element={<Productos />} />
                <Route path="/diseno" element={<TuDiseno />} /> 
                <Route path="/carrito" element={<Carrito />} />
            </Routes>
            
            <Footer />
        </>
    );
};

export default App;