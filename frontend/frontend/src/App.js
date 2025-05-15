import './assets/styles/styles.css';
import React from 'react';
import logoImg from './assets/images/imagen-foto-removebg-preview.png';
import facebookImg from './assets/images/facebook.png';
import twitterImg from './assets/images/gorjeo.png';
import instagramImg from './assets/images/instagram.png';

function App() {
  return (
    <>
      <header>
        <h2 className="logo">
          <img src={logoImg} alt="Logo" className="logo-img" />
        </h2>
        <nav className="navigation">
          <a href="#">Home</a>
          <a href="#">Service</a>
          <a href="#">Nosotros</a>
          <a href="#">Contacto</a>
          <button className="btnLogin-popup">Login</button>
        </nav>
      </header>

      <div className="center-text">
        <h1>¡Aquí es dónde empieza tú aventura!</h1>
      </div>

      <div className="search-container">
        <form className="search-form" method="post" action="http://localhost/backend/buscar_viajes.php">
          <input type="text" name="origen" placeholder="Lugar de Origen" className="search-input" required />
          <input type="text" name="destino" placeholder="Lugar de Destino" className="search-input" required />
          <input type="date" name="fecha_inicio" className="search-input" required />
          <input type="date" name="fecha_fin" className="search-input" required />
          <button type="submit" className="search-btn">Buscar</button>
        </form>
      </div>

      <footer>
        <div className="footer-content">
          <div className="address-section">
            <p>TravelingWeb</p>
            <p className="address">Dirección: Av. Valle del Norte 123, Santiago, Chile</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12..."
              width="200"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa"
            ></iframe>
          </div>
          <div className="social-icons">
            <a href="#"><img src={facebookImg} alt="Facebook" /></a>
            <a href="#"><img src={twitterImg} alt="Twitter" /></a>
            <a href="#"><img src={instagramImg} alt="Instagram" /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; TravelingWeb. Todos los derechos reservados.</p>
          <p style={{ marginTop: '10px' }}>"Comprometidos con la calidad y el servicio desde 2024."</p>
          <p>Contacto: <a href="mailto:info@travelingweb.com" style={{ color: '#ccc' }}>info@travelingweb.com</a> | Teléfono: +22 444 663</p>
          <p><a href="faq.html" style={{ color: '#ccc', textDecoration: 'none' }}>Preguntas Frecuentes</a> | <a href="soporte.html" style={{ color: '#ccc', textDecoration: 'none' }}>Soporte Técnico</a></p>
          <p><a href="terminos.html" style={{ color: '#ccc', textDecoration: 'none' }}>Términos y Condiciones</a> | <a href="privacidad.html" style={{ color: '#ccc', textDecoration: 'none' }}>Política de Privacidad</a></p>
        </div>
      </footer>

      {/* Ionicons CDN */}
      <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
      <script noModule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    </>
  );
}

export default App;


