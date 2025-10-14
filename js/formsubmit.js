document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('designForm');
    const formMessages = document.getElementById('form-messages');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Detiene el envío normal del formulario

            // Crea un objeto FormData para recopilar los datos del formulario
            const data = new FormData(form);
            
            // Dirección de FormSubmit. Reemplaza con tu email.
            const formAction = 'https://formsubmit.co/scultura3d.studio@gmail.com'; 

            // Limpia mensajes anteriores
            formMessages.innerHTML = ''; 
            
            // Función para mostrar la alerta
            const showAlert = (message, type) => {
                const alertDiv = document.createElement('div');
                alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-4`;
                alertDiv.setAttribute('role', 'alert');
                alertDiv.innerHTML = `
                    <strong>${message}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;
                formMessages.appendChild(alertDiv);
            };

            try {
                // Envía el formulario usando la Fetch API (AJAX)
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json' // Esto es crucial para la respuesta JSON (AJAX) de FormSubmit
                    }
                });

                // FormSubmit devuelve una respuesta 200 (OK) en caso de éxito.
                if (response.ok) {
                    showAlert('¡Solicitud enviada con éxito! Nuestro equipo revisará tu diseño pronto.', 'success');
                    form.reset(); // Limpia el formulario
                } else {
                    // Si hay un problema del lado de FormSubmit (aunque sea 400/500), tratamos como error.
                    showAlert('Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo más tarde.', 'danger');
                }
            } catch (error) {
                // Captura errores de red (p. ej., sin conexión)
                console.error('Error de red:', error);
                showAlert('Error de conexión. Asegúrate de estar conectado a internet e intenta de nuevo.', 'danger');
            }
        });
    }
});