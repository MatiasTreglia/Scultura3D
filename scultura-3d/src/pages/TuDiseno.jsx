// src/pages/TuDiseno.jsx (CÓDIGO CORREGIDO)
import { useState } from "react";

const TuDiseno = () => {
    // 1. Estados para manejar los campos del formulario
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: "",
    });
    const [status, setStatus] = useState({
        loading: false,
        message: null,
        type: null,
    });

    // 2. Manejador de cambios (Actualiza el estado por cada tecla)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. Manejador de envío (La función no retorna JSX)
    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatus({ loading: true, message: null, type: null });

        const endpoint = "https://formsubmit.co/ajax/scultura3d.studio@gmail.com";
        const data = new FormData(e.target);

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: data,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setStatus({
                    loading: false,
                    message: "✅ ¡Solicitud enviada con éxito! Te contactaremos a la brevedad.",
                    type: "success",
                });
                setFormData({ nombre: "", email: "", mensaje: "" }); // Limpia el formulario
            } else {
                setStatus({
                    loading: false,
                    message: "❌ Error al enviar el formulario. Inténtalo nuevamente.",
                    type: "danger",
                });
            }
        } catch (error) {
            // Se usa 'error' en console.error(), lo cual quita la advertencia.
            console.error("Detalle del error de conexión:", error); 

            setStatus({
                loading: false,
                message: "⚠️ Error de conexión. Verificá tu internet e intentá de nuevo.",
                type: "warning",
            });
        } // Fin del catch y fin de handleSubmit
    }; // <-- CIERRE CORRECTO DE LA FUNCIÓN handleSubmit

    // 4. EL RETURN DEL COMPONENTE TuDiseno (DEBE ESTAR FUERA DE handleSubmit)
    return (
        <section className="container my-5">
            <h1 className="text-center mb-4">Hacemos tu diseño</h1>
            <p className="text-center text-muted mb-5">
                Contanos tu idea y nosotros la hacemos realidad con impresión 3D.
            </p>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow p-4">
                        {/* Muestra mensajes de estado */}
                        {status.message && (
                            <div className={`alert alert-${status.type}`}>
                                {status.message}
                            </div>
                        )}

                        {/* El formulario */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    className="form-control"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="mensaje" className="form-label">
                                    Descripción
                                </label>
                                <textarea
                                    id="mensaje"
                                    name="mensaje"
                                    className="form-control"
                                    rows="5"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <div className="d-grid">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    disabled={status.loading}
                                >
                                    {status.loading ? "Enviando..." : "Enviar solicitud"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}; // <-- CIERRE CORRECTO DEL COMPONENTE TuDiseno

export default TuDiseno;