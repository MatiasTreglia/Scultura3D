// =========================================================
// LÓGICA ESPECÍFICA PARA LA PÁGINA DEL CARRITO
// =========================================================

// Obtener elementos del DOM
const itemsCarritoDOM = document.getElementById('items-carrito');
const subtotalPedidoDOM = document.getElementById('subtotal-pedido');
const totalPedidoDOM = document.getElementById('total-pedido');
const carritoVacioDOM = document.getElementById('carrito-vacio');
const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');

// La clave para guardar en localStorage
const LOCAL_STORAGE_KEY = 'carrito';

// 1. Obtener y Guardar Carrito (Funciones Reutilizadas)
// NOTA: Estas funciones son las mismas que en index.js, pero las duplicamos 
// para que carrito.js pueda funcionar de forma independiente si es necesario.
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(carrito));
}


// 2. Dibujar la Tabla del Carrito
function renderizarCarrito() {
    let carrito = obtenerCarrito();
    itemsCarritoDOM.innerHTML = ''; // Limpiar la tabla

    if (carrito.length === 0) {
        // Mostrar mensaje de carrito vacío y ocultar resumen
        carritoVacioDOM.style.display = 'block';
        document.querySelector('.row').style.display = 'none'; // Oculta toda la tabla/resumen
        return;
    }

    // Ocultar mensaje de carrito vacío si hay productos
    carritoVacioDOM.style.display = 'none';
    document.querySelector('.row').style.display = 'flex'; // Mostrar la tabla/resumen
    btnFinalizarCompra.disabled = false;
    
    let subtotal = 0;

    carrito.forEach(producto => {
        const subtotalProducto = producto.precio * producto.cantidad;
        subtotal += subtotalProducto;

        // Crear la fila de la tabla
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: contain;">
            </td>
            <td>
                <h5 class="my-0">${producto.nombre}</h5>
            </td>
            <td class="text-center">$${producto.precio.toFixed(2)}</td>
            <td class="text-center">
                <div class="input-group input-group-sm justify-content-center">
                    <button class="btn btn-outline-secondary btn-restar" data-id="${producto.id}">-</button>
                    <input type="number" class="form-control text-center input-cantidad" 
                           value="${producto.cantidad}" 
                           min="1" 
                           style="width: 50px;"
                           data-id="${producto.id}"
                           readonly>
                    <button class="btn btn-outline-secondary btn-sumar" data-id="${producto.id}">+</button>
                </div>
            </td>
            <td class="text-center fw-bold">$${subtotalProducto.toFixed(2)}</td>
            <td class="text-center">
                <button class="btn btn-danger btn-sm btn-eliminar" data-id="${producto.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        itemsCarritoDOM.appendChild(row);
    });

    // Actualizar el resumen del pedido
    const costoEnvio = 0.00; // Asumimos envío gratuito por ahora o lo calculas después
    const totalConEnvio = subtotal + costoEnvio;

    subtotalPedidoDOM.textContent = `$${subtotal.toFixed(2)}`;
    // costoEnvioDOM.textContent = `$${costoEnvio.toFixed(2)}`; // Si lo usas
    totalPedidoDOM.textContent = `$${totalConEnvio.toFixed(2)}`;

    // La función actualizarContador debe estar disponible globalmente (en index.js)
    if (typeof actualizarContador === 'function') {
        actualizarContador();
    }
    
    // Asignar Eventos después de que la tabla se haya dibujado
    asignarEventosCarrito();
}


// 3. Manejar Eventos (Sumar, Restar, Eliminar)
function asignarEventosCarrito() {
    // 3.1 Eliminar Producto
    document.querySelectorAll('.btn-eliminar').forEach(button => {
        button.addEventListener('click', (e) => {
            const idProducto = e.currentTarget.dataset.id;
            eliminarProducto(idProducto);
        });
    });

    // 3.2 Cambiar Cantidad
    document.querySelectorAll('.btn-sumar').forEach(button => {
        button.addEventListener('click', (e) => {
            const idProducto = e.currentTarget.dataset.id;
            cambiarCantidad(idProducto, 1); // Sumar 1
        });
    });
    
    document.querySelectorAll('.btn-restar').forEach(button => {
        button.addEventListener('click', (e) => {
            const idProducto = e.currentTarget.dataset.id;
            cambiarCantidad(idProducto, -1); // Restar 1
        });
    });
}

function eliminarProducto(id) {
    let carrito = obtenerCarrito();
    // Filtra el carrito para mantener solo los productos que NO coincidan con el ID
    carrito = carrito.filter(producto => producto.id !== id);
    guardarCarrito(carrito);
    renderizarCarrito(); // Vuelve a dibujar la tabla
}

function cambiarCantidad(id, cambio) {
    let carrito = obtenerCarrito();
    const productoIndex = carrito.findIndex(p => p.id === id);

    if (productoIndex !== -1) {
        let nuevaCantidad = carrito[productoIndex].cantidad + cambio;

        if (nuevaCantidad < 1) {
            // Si la cantidad es menor a 1, eliminamos el producto (como si hubieran hecho clic en el botón Eliminar)
            eliminarProducto(id);
        } else {
            // Actualizamos la cantidad y guardamos
            carrito[productoIndex].cantidad = nuevaCantidad;
            guardarCarrito(carrito);
            renderizarCarrito(); // Vuelve a dibujar la tabla
        }
    }
}

// Inicializar: Ejecutar la función cuando se carga la página
document.addEventListener('DOMContentLoaded', renderizarCarrito);

// =========================================================