// =========================================================
// 1. LÓGICA DEL FORMULARIO DE CONTACTO (Mensaje de Éxito)
// Esta lógica se ejecuta solo en index.html
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    // Verificamos si los elementos de contacto existen en esta página
    const contactoSection = document.getElementById('contacto-section');
    if (contactoSection) {
        
        const params = new URLSearchParams(window.location.search);
        const formEnviado = params.get('enviado');

        const mensajeExito = document.getElementById('mensaje-exito');
        const contenidoFormulario = document.getElementById('contenido-formulario');

        if (formEnviado === 'true') {
            // Ocultar el contenido normal del formulario
            if (contenidoFormulario) {
                contenidoFormulario.style.display = 'none';
            }
            
            // Mostrar el mensaje de éxito
            if (mensajeExito) {
                mensajeExito.style.display = 'block';
            }

            // Limpiar la URL del parámetro de éxito, manteniendo el scroll en #contacto
            window.history.replaceState(null, null, window.location.pathname + "#contacto");
            
        } else {
            // Aseguramos que el formulario esté visible si no hay envío exitoso
            if (contenidoFormulario) {
                contenidoFormulario.style.display = 'grid'; 
            }
            if (mensajeExito) {
                mensajeExito.style.display = 'none';
            }
        }
    }
});


// =========================================================
// 2. LÓGICA DEL CARRITO (Añadir y Contar) - LÓGICA EXISTENTE
// =========================================================

// Inicializa el carrito obteniendo datos del localStorage o un array vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Elementos del DOM
// Nota: 'contador-carrito' se encuentra en nuevoND.html (el archivo de productos)
const contadorCarrito = document.getElementById('contador-carrito');
const botonesAgregar = document.querySelectorAll('.card button.btn'); 
const tarjetasProductos = document.querySelectorAll('.card');

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
    actualizarContador(); // Actualiza el número en el ícono
    // Aquí podrías agregar un mensaje temporal de "Producto añadido" si fuera necesario
    console.log(`Producto ${productoData.nombre} añadido. Carrito actual:`, carrito);
}


// Asignar el evento click a los botones de "Agregar al carrito"
// Esto solo funcionará si estamos en nuevoND.html (donde existen las tarjetas)
if (botonesAgregar.length > 0) {
    botonesAgregar.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.card'); // Encuentra la tarjeta padre
            if (!card) return;

            // Extrae los datos del producto
            const productoData = {
                id: card.querySelector('h3').textContent.replace(/\s/g, '-'), // Genera un ID simple
                nombre: card.querySelector('h3').textContent,
                precio: parseFloat(card.querySelector('.precio').textContent.replace('$', '').replace(',', '.')), // Limpia el precio
                imagen: card.querySelector('.card-img img').src,
            };

            agregarAlCarrito(productoData);
        });
    });
}


// Inicializa el contador al cargar la página
actualizarContador();


// =========================================================
// 3. LÓGICA DE FILTRADO DE PRODUCTOS - LÓGICA EXISTENTE
// =========================================================

// Elementos del DOM
const enlacesCategorias = document.querySelectorAll('#menu-categorias a');

// 1. La Función Principal de Filtrado
if (enlacesCategorias.length > 0) {
    function filtrarProductos(categoriaSeleccionada) {
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