import { Link } from "react-router-dom";
import { useContext } from "react";
// DEBE CAMBIAR: Importar el objeto de contexto desde el nuevo archivo
import { CartContext } from "../context/CartContext"; 
// Importaciones de iconos
import { FaWhatsapp, FaInstagram, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
    const { carrito } = useContext(CartContext);
    
    // Calcula la cantidad total de ítems en el carrito
    const contadorCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <header>
            <div className="logo">
                <Link to="/"> 
                    <img src="img/logo.png" alt="Logo Scultura 3D" /> 
                </Link>
                
                {/* ICONO DE WHATSAPP (CORREGIDO) */}
                {/* Usamos el componente FaWhatsapp y le aplicamos las clases de Bootstrap */}
                <a href="https://wa.me/+541130493689" target="_blank" className="text-success fs-4 me-3">
                    <FaWhatsapp /> 
                </a>
                
                {/* ICONO DE INSTAGRAM (CORREGIDO) */}
                <a href="https://www.instagram.com/tuusuario" target="_blank" className="text-danger fs-4 me-3">
                    <FaInstagram /> 
                </a>
            </div>
            
            <nav className="_navbar">
                <ul className="nav-links">
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/productos">Nuestros Diseños</Link></li>
                    <li><Link to="/diseno">Hacemos Tu diseno</Link></li>
                    <li><Link to="/#contacto">Contacto</Link></li>
                </ul>
            </nav>

            <div>
                {/* ICONO DEL CARRITO (CORREGIDO) */}
                <Link to="/carrito" className="carrito-link me-3">
                    <FaShoppingCart className="fa-lg" /> {/* Aplicamos la clase fa-lg si es necesaria */}
                    <span className="badge" id="contador-carrito">{contadorCarrito}</span>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;