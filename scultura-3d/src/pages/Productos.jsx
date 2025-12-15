// src/pages/Productos.jsx (CÓDIGO CORREGIDO Y COMPLETO)

import { useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { productos } from "../data/productos"; // Asegúrate de que esta ruta sea correcta
import { CartContext } from "../context/Context"; // Ruta al archivo simple de contexto

const categorias = [
    "Todos", 
    "Vasos Ferneteros", 
    "Llaveros", 
    "Señaladores", 
    "Juguetes Anti Stress", 
    "Juguetes"
];

const Productos = () => {
    // Hooks de Contexto y Router
    const { agregarAlCarrito } = useContext(CartContext);
    const [searchParams, setSearchParams] = useSearchParams();

    // 1. Lógica de Filtrado
    const categoriaActual = searchParams.get("categoria") || "Todos";
    
    const productosFiltrados = productos.filter(producto => {
        if (categoriaActual === "Todos") {
            return true;
        }
        return producto.categoria === categoriaActual;
    });

    // Función para manejar el clic en la categoría
    const handleCategoriaClick = (categoria) => {
        if (categoria === "Todos") {
            setSearchParams({}); // Quita el parámetro para mostrar todos
        } else {
            setSearchParams({ categoria: categoria }); // Agrega el parámetro
        }
    };
    
    // Función para manejar la compra
    const handleAgregarCarrito = (producto) => {
        agregarAlCarrito(producto);
        alert(`"${producto.nombre}" agregado al carrito!`);
    };

    // ------------------------------------------
    // 2. ESTRUCTURA JSX (Copia fiel del HTML)
    // ------------------------------------------
    return (
        <main className="layout"> {/* CLAVE 1: La clase que hace el Grid (2 columnas) */}
            
            {/* ASIDE - Sidebar de Categorías */}
            <aside className="sidebar"> 
                <h2>Categorías</h2>
                <ul className="categorias">
                    {categorias.map(cat => (
                        <li key={cat}>
                            {/* Los enlaces ahora son <button> o <a> con onClick para usar el hook */}
                            <a 
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCategoriaClick(cat);
                                }}
                                // Opcional: para dar feedback visual de la categoría seleccionada
                                style={{ fontWeight: categoriaActual === cat ? 'bold' : 'normal' }}
                            >
                                {cat === "Todos" ? "Todos los productos" : cat}
                            </a>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* SECTION - Grid de Productos */}
            <section className="grid-productos">
    {productosFiltrados.length > 0 ? (
        productosFiltrados.map((producto) => (
            <div className="card" key={producto.id} data-categoria={producto.categoria}>
                <div className="card-img">
                    {/* ¡LA CORRECCIÓN ESTÁ AQUÍ! Usa producto.imagen directamente */}
                    <img src={producto.imagen} alt={producto.nombre} /> 
                </div>
                <div className="card-info">
                    <h3>{producto.nombre}</h3>
                    <p className="precio">${producto.precio}</p>
                    <button 
                        className="btn" 
                        onClick={() => handleAgregarCarrito(producto)}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        ))
    ) : (
        <p>No hay productos en esta categoría.</p>
    )}
</section>
        </main>
    );
};

export default Productos;