// =========================================================
// 1. LÓGICA DEL CARRITO (Añadir y Contar)
// =========================================================

// Inicializa el carrito obteniendo datos del localStorage o un array vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Elementos del DOM
// Nota: 'contador-carrito' se encuentra en nuevoND.html (el archivo de productos)
const contadorCarrito = document.getElementById('contador-carrito');
const botonesAgregar = document.querySelectorAll('.card button.btn'); 

// Función para actualizar el contador visual del carrito en el header
function actualizarContador() {
    // Suma la cantidad de todos los productos en el carrito.
    const totalItems = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
    if (contadorCarrito) { // Verifica si el elemento existe (solo existe en nuevoND.html y carrito.html)
        contadorCarrito.textContent = totalItems.toString();
    }
}

// Función para guardar el carrito en el localStorage (persistencia)
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función que maneja la acción de agregar un producto
function agregarAlCarrito(productoData) {
    const productoExistente = carrito.find(p => p.id === productoData.id);

    if (productoExistente) {
        // Si existe, solo incrementa la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si no existe, lo agrega al carrito con cantidad inicial de 1
        carrito.push({ ...productoData, cantidad: 1 });
    }

    guardarCarrito(); // Guarda el carrito actualizado
    actualizarContador(); // Actualiza el contador
}

// Asigna el evento 'click' a cada botón 'Agregar al carrito'
botonesAgregar.forEach((boton, index) => {
    boton.addEventListener('click', (event) => {
        event.preventDefault(); 
        
        // Obtiene el elemento contenedor más cercano para extraer datos
        const cardElement = boton.closest('.card');
        
        const nombreProducto = cardElement.querySelector('h3').textContent;
        const precioTexto = cardElement.querySelector('.precio').textContent;
        
        // Limpia el precio y lo convierte a número (asume el formato "$950")
        const precioLimpio = precioTexto.replace('$', '').replace('.', '').trim();
        const precio = parseFloat(precioLimpio);

        // Crea el objeto del producto
        const producto = {
            // ID único basado en el nombre para evitar duplicados si se añade un producto nuevo
            id: nombreProducto.replace(/\s/g, ''), 
            nombre: nombreProducto,
            precio: precio,
            imagen: cardElement.querySelector('img').src // Obtenemos la ruta de la imagen
        };

        agregarAlCarrito(producto);
    });
});

// Inicializa el contador al cargar la página (se ejecuta en todas las páginas)
document.addEventListener('DOMContentLoaded', actualizarContador);

// =========================================================
// 2. LÓGICA DE FILTRADO DE PRODUCTOS POR CATEGORÍA
// Se ejecuta SOLO en nuevoND.html
// =========================================================

const enlacesCategorias = document.querySelectorAll('.categorias li a');
const tarjetasProductos = document.querySelectorAll('.grid-productos .card');

if (enlacesCategorias.length > 0 && tarjetasProductos.length > 0) {
    // Solo si estamos en la página de productos (donde existen categorías y tarjetas)

    function filtrarProductos(categoriaSeleccionada) {
        // 1. Ocultar/Mostrar Productos
        tarjetasProductos.forEach(card => {
            // El atributo data-categoria que pusimos en el HTML
            const categoriaProducto = card.getAttribute('data-categoria');

            // CORRECCIÓN FINAL: Usamos display: none para que el grid se reorganice
            if (categoriaSeleccionada === 'Todos' || categoriaProducto === categoriaSeleccionada) {
                // Muestra la tarjeta. Usamos 'flex' porque la tarjeta usa display: flex; en newND.css
                card.style.display = 'flex'; 
            } else {
                // Oculta completamente la tarjeta del flujo del grid para que no deje huecos
                card.style.display = 'none'; 
            }
        });

        // 2. Manejar la Clase Activa para resaltar la categoría seleccionada
        enlacesCategorias.forEach(link => {
            if (link.getAttribute('data-categoria') === categoriaSeleccionada) {
                link.classList.add('activa');
            } else {
                link.classList.remove('activa');
            }
        });
    }

    // 3. Asignar el Evento 'click' a cada enlace de categoría
    enlacesCategorias.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Detiene el comportamiento del enlace (ir a #)

            const categoria = event.target.getAttribute('data-categoria');
            filtrarProductos(categoria);
        });
    });

    // Filtra para mostrar "Todos" por defecto al cargar la página
    filtrarProductos('Todos');
}