// src/pages/Carrito.jsx
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/Context"; // <--- CORRECCIÓN AQUI
import { FaTrashAlt, FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const Carrito = () => {
    // Obtenemos del contexto todo lo que necesitamos
    const { 
        carrito, 
        eliminarDelCarrito, 
        cambiarCantidad, 
        totalPrecio 
    } = useContext(CartContext);

    const esVacio = carrito.length === 0;

    return (
        <main className="container my-5">
            <h1 className="mb-4">Tu Carrito de Compras</h1>

            {/* Muestra mensaje si el carrito está vacío */}
            {esVacio && (
                <div className="alert alert-info text-center" role="alert">
                    🛒 ¡Tu carrito está vacío! <Link to="/productos" className="alert-link">Ver productos</Link> para empezar a comprar.
                </div>
            )}

            {!esVacio && (
                <div className="row">
                    {/* Columna de Items del Carrito */}
                    <div className="col-lg-8">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th className="text-center">Cantidad</th>
                                    <th className="text-end">Precio Unitario</th>
                                    <th className="text-end">Subtotal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="items-carrito">
                                {carrito.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img src={item.imagen} alt={item.nombre} style={{ width: '50px', height: '50px', objectFit: 'contain', marginRight: '10px' }} />
                                                <span>{item.nombre}</span>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="btn-group btn-group-sm" role="group">
                                                <button 
                                                    className="btn btn-outline-secondary" 
                                                    onClick={() => cambiarCantidad(item.id, -1)}
                                                >
                                                    <FaMinusCircle />
                                                </button>
                                                <span className="btn btn-light">{item.cantidad}</span>
                                                <button 
                                                    className="btn btn-outline-secondary" 
                                                    onClick={() => cambiarCantidad(item.id, 1)}
                                                >
                                                    <FaPlusCircle />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="text-end">${item.precio.toFixed(2)}</td>
                                        <td className="text-end">${(item.precio * item.cantidad).toFixed(2)}</td>
                                        <td>
                                            <button 
                                                className="btn btn-danger btn-sm"
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

                    {/* Columna del Resumen del Pedido (Basado en tu carrito.html) */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm p-3">
                            <h4>Resumen del Pedido</h4>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Subtotal:</span>
                                    <strong>${totalPrecio.toFixed(2)}</strong>
                                </li>
                                <li className="list-group-item d-flex justify-content-between">
                                    <span>Envío:</span>
                                    <strong className="text-success">A calcular</strong> 
                                </li>
                                <li className="list-group-item d-flex justify-content-between fs-5 fw-bold bg-light">
                                    <span>Total (Estimado):</span>
                                    <strong className="text-danger">${totalPrecio.toFixed(2)}</strong>
                                </li>
                            </ul>
                            <button id="btn-finalizar-compra" className="btn btn-primary btn-lg mt-3" disabled>
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