// =========================================================
// 1. LÓGICA DEL FORMULARIO DE CONTACTO (Mensaje de Éxito)
// Esta lógica se ejecuta solo en index.html
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    // ¡CORRECCIÓN CLAVE! Verificamos si la sección de contacto (con el ID "contacto") existe
    const contactoSection = document.getElementById('contacto'); 
    const mensajeExito = document.getElementById('mensaje-exito');
    
    // Solo ejecutamos esta lógica si estamos en la página que tiene el formulario de contacto
    if (contactoSection && mensajeExito) {
        
        const params = new URLSearchParams(window.location.search);
        const formEnviado = params.get('enviado');

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
            // Si no se ha enviado, aseguramos que el formulario esté visible
            if (contenidoFormulario) {
                contenidoFormulario.style.display = 'grid'; // Usamos grid, como está definido en el HTML
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
const contadorCarrito = document.getElementById('contador-carrito');
const botonesAgregar = document.querySelectorAll('.card button.btn'); 
const tarjetasProductos = document.querySelectorAll('.card');

// Función para actualizar el contador visual del carrito en el header
function actualizarContador() {
    const totalItems = carrito.reduce((sum, producto) => sum + producto.cantidad, 0);
    if (contadorCarrito) { 
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
        productoExistente.cantidad += 1;
    } else {
        carrito.push({ ...productoData, cantidad: 1 });
    }

    guardarCarrito(); 
    actualizarContador(); 
    console.log(`Producto ${productoData.nombre} añadido. Carrito actual:`, carrito);
}


// Asignar el evento click a los botones de "Agregar al carrito"
if (botonesAgregar.length > 0) {
    botonesAgregar.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.card'); 
            if (!card) return;

            const productoData = {
                id: card.querySelector('h3').textContent.replace(/\s/g, '-'), 
                nombre: card.querySelector('h3').textContent,
                precio: parseFloat(card.querySelector('.precio').textContent.replace('$', '').replace(',', '.')), 
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
const enlacesCategorias = document.querySelectorAll('.sidebar .categorias a');

// 1. La Función Principal de Filtrado
if (enlacesCategorias.length > 0) {
    function filtrarProductos(categoriaSeleccionada) {
        tarjetasProductos.forEach(card => {
            const categoriaProducto = card.getAttribute('data-categoria');

            if (categoriaSeleccionada === 'Todos' || categoriaProducto === categoriaSeleccionada) {
                card.style.display = 'flex'; 
            } else {
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
            event.preventDefault(); 

            const categoria = event.target.getAttribute('data-categoria');
            filtrarProductos(categoria);
        });
    });

    // Filtra para mostrar "Todos" por defecto al cargar la página
    filtrarProductos('Todos');
}