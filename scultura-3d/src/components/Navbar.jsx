// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";               // <--- Importamos hook
import { CartContext } from "../context/Context"; // <--- Importamos Contexto

const Navbar = () => {
    // AQUI USAMOS EL CONTEXTO Y EXTRAEMOS totalItems
    const { totalItems } = useContext(CartContext); // <--- Usamos el contexto
  return (
    <header>
        <div className="logo">
            {/* El Link reemplaza a la etiqueta <a> para navegación interna */}
            <Link to="/">
                <img src="/img/logo.png" alt="Logo Scultura 3D" />
            </Link>

            <a href="https://wa.me/+541130493689" target="_blank" className="text-success fs-4 me-3">
                <FaWhatsapp />
            </a>

            <a href="https://www.instagram.com/tuusuario" target="_blank" className="text-danger fs-4 me-3">
                <FaInstagram />
            </a>
        </div>

        <nav className="_navbar">
            <ul className="nav-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Nuestros Diseños</Link></li>
                <li><Link to="/diseno">Hacemos Tu diseño</Link></li>
                <li><Link to="/#contacto">Contacto</Link></li>
            </ul>
        </nav>

       <div>
                <Link to="/carrito" className="carrito-link me-3">
                    <FaShoppingCart size={24} />
                    {/* AQUI DEBERIAS USAR totalItems para mostrar el contador */}
                    <span className="badge" id="contador-carrito">{totalItems}</span> 
                </Link>
            </div>
    </header>
  );
};

export default Navbar;