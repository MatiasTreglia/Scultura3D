// LÓGICA DE CONFIRMACIÓN DE ENVÍO para tudiseño.html
document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener el parámetro 'enviado' de la URL
    const params = new URLSearchParams(window.location.search);
    const formEnviado = params.get('enviado'); 
    
    // Contenedores del DOM
    const mensajeExitoContainer = document.getElementById('mensaje-exito');
    const formCardContainer = document.getElementById('form-card-container'); 
    const introParrafo = document.getElementById('intro-parrafo'); 

    // Si la redirección fue exitosa (FormSubmit añadió '?enviado=true')
    if (formEnviado === 'true') {
        
        // 2. Ocultar el formulario y el párrafo introductorio
        if (formCardContainer) {
            formCardContainer.style.display = 'none';
        }
        if (introParrafo) {
            introParrafo.style.display = 'none';
        }

        // 3. Mostrar el mensaje de éxito
        if (mensajeExitoContainer) {
            // Llama a la función para inyectar el HTML del mensaje
            mostrarMensaje(mensajeExitoContainer, 'success', 
                '¡Solicitud enviada con éxito!');
        }
            
        // 4. Limpiar el parámetro de la URL
        window.history.replaceState({}, document.title, window.location.pathname);
    } else {
        // LÓGICA DE CORRECCIÓN DE CACHÉ: Si no hay parámetro de éxito, 
        // nos aseguramos de que el formulario y el párrafo estén VISIBLES.
        if (formCardContainer) {
            formCardContainer.style.display = 'block'; // Asegura visibilidad del formulario
        }
        if (introParrafo) {
            introParrafo.style.display = 'block'; // Asegura visibilidad del párrafo
        }
         if (mensajeExitoContainer) {
            mensajeExitoContainer.innerHTML = ''; // Limpia el mensaje de éxito si existe por caché
        }
    }
});


/**
 * Muestra un mensaje de éxito con estilos de Bootstrap.
 * @param {HTMLElement} container - El elemento donde se insertará la alerta.
 * @param {string} type - Tipo de alerta (siempre 'success' en este caso).
 * @param {string} title - El título principal del mensaje.
 */
function mostrarMensaje(container, type, title) {
    container.innerHTML = `
        <div class="alert alert-${type} fade show text-center border-0" role="alert" style="padding: 3rem; background-color: #e6ffed; color: #155724; border-radius: 1rem;">
            <h2>${title}</h2>
            <p class="mt-3 fs-5">
                ¡Gracias por contactarnos! Recibimos los detalles de tu diseño y te responderemos en breve para continuar con la cotización.
            </p>
            <a href="nuevoND.html" class="btn btn-success mt-4 shadow-sm">Ver más diseños</a>
        </div>
    `;
    // Mueve la vista a la alerta para una mejor experiencia de usuario
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}