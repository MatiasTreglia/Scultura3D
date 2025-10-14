document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formMessages = document.getElementById('contact-form-messages');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita recarga/redirección

            const data = new FormData(form);
            const endpoint = 'https://formsubmit.co/ajax/scultura3d.studio@gmail.com';

            // Limpia mensajes previos
            formMessages.innerHTML = '';

            const showAlert = (message, type) => {
                const alertDiv = document.createElement('div');
                alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
                alertDiv.setAttribute('role', 'alert');
                alertDiv.innerHTML = `
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;
                formMessages.appendChild(alertDiv);
            };

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showAlert('✅ ¡Mensaje enviado con éxito! Te responderemos a la brevedad.', 'success');
                    form.reset();
                } else {
                    showAlert('❌ Ocurrió un error al enviar el mensaje. Intentalo nuevamente.', 'danger');
                }
            } catch (error) {
                console.error('Error de conexión:', error);
                showAlert('⚠️ Error de conexión. Verificá tu internet e intentá de nuevo.', 'warning');
            }
        });
    }
});
