// src/context/CartProvider.jsx (Antiguo CartContext.jsx, AHORA SÓLO CON EL PROVEEDOR)

import React, { useState, useEffect } from "react"; 
// Importamos el objeto de Contexto desde el nuevo archivo simple
import { CartContext } from "./CartContext"; 

// 1. EL PROVEEDOR (ÚNICO EXPORT COMPONENTE)
export const CartProvider = ({ children }) => {
    
    // Estado inicial: Intenta cargar el carrito desde localStorage
    const [carrito, setCarrito] = useState(() => {
        const saved = localStorage.getItem("carrito");
        return saved ? JSON.parse(saved) : [];
    });

    // Efecto: Guarda el carrito en localStorage cada vez que cambia
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    // Función para agregar o incrementar producto
    const agregarAlCarrito = (producto) => {
        const existe = carrito.find((item) => item.id === producto.id);
        
        if (existe) {
            // Si ya existe, actualiza la cantidad
            setCarrito(carrito.map((item) => 
                item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
            ));
        } else {
            // Si es nuevo, agrégalo con cantidad 1
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    // Función para eliminar un producto del carrito
    const eliminarDelCarrito = (id) => {
        setCarrito(carrito.filter((item) => item.id !== id));
    };

    // Función para cambiar la cantidad (+1 o -1)
    const cambiarCantidad = (id, cambio) => {
        setCarrito(carrito.map(item => {
            if (item.id === id) {
                const nuevaCant = item.cantidad + cambio;
                // Si la nueva cantidad es menor a 1, lo eliminamos, si no, actualizamos
                return nuevaCant > 0 ? { ...item, cantidad: nuevaCant } : null;
            }
            return item;
        }).filter(Boolean)); // El .filter(Boolean) elimina los elementos nulos (los que se eliminaron)
    };
    
    // Función para vaciar el carrito (agregada por si se necesita)
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    // Calculadoras
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrecio = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    // El 'value' expone todas las funciones y estados al resto de la App
    return (
        <CartContext.Provider value={{ 
            carrito, 
            agregarAlCarrito, 
            eliminarDelCarrito, 
            cambiarCantidad, 
            vaciarCarrito, // Asegúrate de agregarlo si lo usas
            totalItems, 
            totalPrecio 
        }}>
            {children}
        </CartContext.Provider>
    );
};