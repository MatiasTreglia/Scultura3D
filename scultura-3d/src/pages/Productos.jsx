// src/pages/Productos.jsx

import { useContext } from "react"; 
import { useSearchParams, Link } from "react-router-dom";
import { productos } from "../data/productos"; // <-- ¡ESPACIO EN BLANCO ELIMINADO!
import { CartContext } from "../context/CartContext";

const categorias = [
    "Todos", 
    "Vasos Ferneteros", 
    "Llaveros", 
    "Señaladores", 
    "Juguetes Anti Stress", 
    "Juguetes"
];

const Productos = () => {
    // 1. OBTENER CONTEXTO Y URL PARAMS
    const { agregarAlCarrito } = useContext(CartContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const categoriaActual = searchParams.get("categoria") || "Todos";
    
    // 2. LÓGICA DE FILTRADO (CLAVE PARA DEFINIR productosFiltrados)
    const productosFiltrados = productos.filter(producto => {
        if (categoriaActual === "Todos") {
            return true;
        }
        return producto.categoria === categoriaActual;
    });

    // 3. HANDLERS
    const handleCategoriaClick = (categoria) => {
        if (categoria === "Todos") {
            setSearchParams({});
        } else {
            setSearchParams({ categoria: categoria });
        }
    };
    
    const handleAgregarCarrito = (producto) => {
        // Asumo que tu función agregarAlCarrito está bien definida en el contexto
        agregarAlCarrito(producto); 
        alert(`"${producto.nombre}" agregado al carrito!`);
    };

    return (
        <main className="layout"> 
            
            {/* SIDEBAR (Ahora usa la lógica de categorías) */}
            <aside className="sidebar"> 
                <h2>Categorías</h2>
                <ul className="categorias">
                    {categorias.map(cat => (
                        <li key={cat}>
                            <a 
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleCategoriaClick(cat);
                                }}
                                style={{ fontWeight: categoriaActual === cat ? 'bold' : 'normal' }}
                            >
                                {cat === "Todos" ? "Todos los productos" : cat}
                            </a>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* GRILLA DE PRODUCTOS */}
            <section className="grid-productos">
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map((producto) => (
                        <div className="card" key={producto.id} data-categoria={producto.categoria}>
                            <div className="card-img">
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