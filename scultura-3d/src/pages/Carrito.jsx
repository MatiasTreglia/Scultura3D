// src/pages/Carrito.jsx

import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
// Importar iconos de Font Awesome para React
import { FaTrashAlt, FaArrowLeft } from 'react-icons/fa'; 


// Función para formatear el precio a ARS
const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) return '$0.00';
    return price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
};

const Carrito = () => {
    const { carrito, actualizarCantidad, eliminarDelCarrito, totalPrecio, vaciarCarrito } = useContext(CartContext);
    
    // Usamos totalPrecio del contexto
    const subtotal = totalPrecio; 

    return (
        <main className="container py-5">
            <h1 className="mb-4 text-center">Tu Carrito de Compras</h1>

            {/* Mensaje si el carrito está vacío */}
            {carrito.length === 0 && (
                <div id="carrito-vacio" className="alert alert-info text-center">
                    Tu carrito está vacío. ¡Añade algunos productos!
                </div>
            )}
            
            {/* Contenido del carrito solo se muestra si hay productos */}
            {carrito.length > 0 && (
                <div className="row">
                    {/* COLUMNA IZQUIERDA: TABLA DE PRODUCTOS */}
                    <div className="col-lg-8">
                        
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col" className="text-center" colSpan="2">Producto</th>
                                        <th scope="col" className="text-center">Precio Unit.</th>
                                        <th scope="col" className="text-center">Cantidad</th>
                                        <th scope="col" className="text-center">Subtotal</th>
                                        <th scope="col" className="text-center"></th> 
                                    </tr>
                                </thead>
                                
                                <tbody id="items-carrito">
                                    {carrito.map(item => (
                                        <tr key={item.id}>
                                            {/* Imagen del producto (CLAVE DE LA CORRECCIÓN) */}
                                            <td style={{ width: '80px' }}>
                                                <img 
                                                    // Aquí se añade la barra inicial para ruta absoluta
                                                    src={'/Scultura3D/' + item.imagen} 
                                                    alt={item.nombre} 
                                                    className="img-fluid rounded" 
                                                    style={{ maxHeight: '80px' }}
                                                />
                                            </td>
                                            
                                            {/* Nombre del producto */}
                                            <td>
                                                <Link to={`/productos?id=${item.id}`} className="text-decoration-none">
                                                    {item.nombre}
                                                </Link>
                                            </td>

                                            {/* Precio Unitario */}
                                            <td className="text-center">
                                                {formatPrice(item.precio)}
                                            </td>
                                            
                                            {/* Cantidad */}
                                            <td className="text-center" style={{ width: '120px' }}>
                                                <input 
                                                    type="number"
                                                    min="1"
                                                    value={item.cantidad}
                                                    onChange={(e) => 
                                                         // Asumiendo que actualizarCantidad recibe id y nueva cantidad
                                                         // Nota: En tu contexto enviaste 'cambiarCantidad'. Si usas 'actualizarCantidad' aquí, debe ser la función que maneja el input.
                                                         actualizarCantidad(item.id, parseInt(e.target.value) || 1)
                                                     }
                                                    className="form-control form-control-sm text-center"
                                                />
                                            </td>
                                            
                                            {/* Subtotal por Item */}
                                            <td className="text-center fw-bold">
                                                {formatPrice(item.precio * item.cantidad)}
                                            </td>
                                            
                                            {/* Botón de Eliminar (Icono Corregido) */}
                                            <td className="text-center">
                                                <button 
                                                    className="btn btn-sm btn-outline-danger" 
                                                    aria-label={`Eliminar ${item.nombre}`}
                                                    onClick={() => eliminarDelCarrito(item.id)}
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Botones inferiores (Icono Corregido) */}
                        <div className="d-flex justify-content-between">
                            <Link to="/productos" className="btn btn-secondary mt-3">
                                <FaArrowLeft className="me-2" />Seguir Comprando
                            </Link>
                            <button 
                                className="btn btn-outline-danger mt-3"
                                onClick={vaciarCarrito}
                            >
                                Vaciar Carrito
                            </button>
                        </div>
                    </div>
                    
                    {/* COLUMNA DERECHA: RESUMEN DEL PEDIDO */}
                    <div className="col-lg-4 mt-4 mt-lg-0">
                        <div className="card p-4 shadow-sm">
                            <h4 className="card-title mb-4">Resumen del Pedido</h4>
                            <ul className="list-group list-group-flush mb-3">
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Subtotal:</span>
                                    <strong id="subtotal-pedido">{formatPrice(subtotal)}</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Envío:</span>
                                    <strong className="text-success" id="costo-envio">A calcular</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between fs-5 fw-bold bg-light">
                                    <span>Total (Estimado):</span>
                                    <strong id="total-pedido" className="text-danger">{formatPrice(subtotal)}</strong>
                                </li>
                            </ul>
                            
                            <button 
                                id="btn-finalizar-compra" 
                                className="btn btn-primary btn-lg mt-3"
                                onClick={() => alert("Función de checkout pendiente")}
                            >
                                Finalizar Compra
                            </button>
                            <small className="text-muted mt-2 text-center">Términos y condiciones aplican.</small>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Carrito;