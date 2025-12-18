import { Link } from "react-router-dom";
import { useContext } from "react";

import { CartContext } from "../context/CartContext";

import { FaWhatsapp, FaInstagram, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
    const { carrito } = useContext(CartContext);


    const contadorCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <header>
            <div className="logo">
                <Link to="/">
                    <img src="img/logo.png" alt="Logo Scultura 3D" />
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
                    <li><Link to="/diseno">Hacemos Tu diseno</Link></li>
                    <li><Link to="/#contacto">Contacto</Link></li>
                </ul>
            </nav>

            <div>

                <Link to="/carrito" className="carrito-link me-3">
                    <FaShoppingCart className="fa-lg" />
                    <span className="badge" id="contador-carrito">{contadorCarrito}</span>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;