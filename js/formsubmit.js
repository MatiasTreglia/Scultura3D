document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('designForm');
    const formMessages = document.getElementById('form-messages');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evita redirección

            const data = new FormData(form);
            const endpoint = 'https://formsubmit.co/ajax/scultura3d.studio@gmail.com';

            formMessages.innerHTML = '';

            const showAlert = (message, type) => {
                const alertDiv = document.createElement('div');
                alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-4`;
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
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    showAlert('✅ ¡Solicitud enviada con éxito! Te contactaremos a la brevedad.', 'success');
                    form.reset();
                } else {
                    showAlert('❌ Error al enviar el formulario. Intentalo nuevamente.', 'danger');
                }
            } catch (err) {
                console.error('Error de conexión:', err);
                showAlert('⚠️ Error de conexión. Verificá tu internet e intentá de nuevo.', 'warning');
            }
        });
    }
});
