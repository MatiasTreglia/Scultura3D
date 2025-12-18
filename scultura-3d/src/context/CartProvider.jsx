

import React, { useState, useEffect } from "react"; 

import { CartContext } from "./CartContext"; 


export const CartProvider = ({ children }) => {
    
    
    const [carrito, setCarrito] = useState(() => {
        const saved = localStorage.getItem("carrito");
        return saved ? JSON.parse(saved) : [];
    });

    
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    
    const agregarAlCarrito = (producto) => {
        const existe = carrito.find((item) => item.id === producto.id);
        
        if (existe) {
            
            setCarrito(carrito.map((item) => 
                item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
            ));
        } else {
            
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    
    const eliminarDelCarrito = (id) => {
        setCarrito(carrito.filter((item) => item.id !== id));
    };

   
    const cambiarCantidad = (id, cambio) => {
        setCarrito(carrito.map(item => {
            if (item.id === id) {
                const nuevaCant = item.cantidad + cambio;
                
                return nuevaCant > 0 ? { ...item, cantidad: nuevaCant } : null;
            }
            return item;
        }).filter(Boolean)); 
    };
    
    
    const vaciarCarrito = () => {
        setCarrito([]);
    };

   
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrecio = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    
    return (
        <CartContext.Provider value={{ 
            carrito, 
            agregarAlCarrito, 
            eliminarDelCarrito, 
            cambiarCantidad, 
            vaciarCarrito, 
            totalItems, 
            totalPrecio 
        }}>
            {children}
        </CartContext.Provider>
    );
};