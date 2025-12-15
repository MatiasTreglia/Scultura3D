// src/pages/Home.jsx (CÓDIGO CORREGIDO)
import { Link } from "react-router-dom"; 

const Home = () => {
    return (
        <main>
            <section class="hero">
        <h1>Diseñamos e imprimimos tus ideas en 3D</h1>
        <p>Calidad profesional en impresión 3D, diseño y postprocesado.</p>
        <a href="#presupuesto" class="btn-hero">Tengo mi diseño</a>
    </section>

    <section class="services">
        <div class="container">
            <h2>Nuestros Servicios</h2>
            <p class="subtitle">
                Soluciones en impresión 3D adaptadas a tus necesidades
            </p>

            <div class="services-flex">
                <div class="service-card">
                    <h3>Impresión Personalizada</h3>
                    <p>
                        Creación de piezas únicas en diferentes materiales y colores,
                        ajustadas a tu proyecto.
                    </p>
                </div>

                <div class="service-card">
                    <h3>Souvenirs & Regalos</h3>
                    <p>
                        Diseños exclusivos para cumpleaños, eventos, y obsequios
                        especiales que sorprenden.
                    </p>
                </div>

                <div class="service-card">
                    <h3>Prototipado Rápido</h3>
                    <p>
                        Validá tus ideas con prototipos de alta calidad en poco tiempo y
                        con costos accesibles.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section class="portfolio">
        <h2>Portfolio</h2>
        <p>Algunos de nuestros diseños y productos destacados</p>

        <div class="portfolio-grid">
            <div class="portfolio-item">
                <img src="./img/1.jpg" alt="" />
                <div class="overlay">
                    <h3>Proyecto 1</h3>
                </div>
            </div>

            <div class="portfolio-item">
                <img src="./img/2.jpg" alt="" />
                <div class="overlay">
                    <h3>Proyecto 2</h3>
                </div>
            </div>

            <div class="portfolio-item">
                <img src="./img/3.jpg" alt="" />
                <div class="overlay">
                    <h3>Proyecto 3</h3>
                </div>
            </div>

            <div class="portfolio-item">
                <img src="./img/4.jpg" alt="" />
                <div class="overlay">
                    <h3>Proyecto 4</h3>
                </div>
            </div>
        </div>
    </section>

    <section id="contacto" class="contacto">
        <h2>Contacto</h2>
        <p>¿Tenés alguna consulta o querés más información? Escribinos.</p>

        <div class="contacto-contenido">
            <form id="contactForm" class="contacto-form">
    <input type="text" name="nombre" placeholder="Tu nombre" required />
    <input type="email" name="email" placeholder="Tu correo electrónico" required />
    <textarea name="mensaje" rows="5" placeholder="Escribe tu mensaje..." required></textarea>
    <button type="submit">Enviar</button>
    <div id="contact-form-messages" class="mt-3 text-center"></div>
</form>


            <div class="contacto-info">
                <h3>También podés encontrarnos en:</h3>
                <p><strong>Tel:</strong> +54 11 30493689</p>
                <p><strong>Email:</strong> scultura3D.studio@gmail.com</p>
                <p><strong>Dirección:</strong> Av. San Juan 3629</p>
            </div>
        </div>
    </section>
        </main>
    );
};

export default Home;