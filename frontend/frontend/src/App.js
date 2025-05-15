import './assets/styles/styles.css';
import React, { useEffect } from 'react';
import logoImg from './assets/images/imagen-foto-removebg-preview.png';
import facebookImg from './assets/images/facebook.png';
import twitterImg from './assets/images/gorjeo.png';
import instagramImg from './assets/images/instagram.png';

function App() {

    useEffect(() => {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');

    if (registerLink) {
      registerLink.addEventListener('click', () => {
        wrapper?.classList.add('active');
      });
    }

    if (loginLink) {
      loginLink.addEventListener('click', () => {
        wrapper?.classList.remove('active');
      });
    }

    if (btnPopup) {
      btnPopup.addEventListener('click', () => {
        wrapper?.classList.add('active-popup');
      });
    }

    if (iconClose) {
      iconClose.addEventListener('click', () => {
        wrapper?.classList.remove('active-popup');
      });
    }
    return () => {
      // Limpieza por si se desmonta el componente
      registerLink?.removeEventListener('click', () => {});
      loginLink?.removeEventListener('click', () => {});
      btnPopup?.removeEventListener('click', () => {});
      iconClose?.removeEventListener('click', () => {});
    };
  }, []);

  useEffect(() => {
    const wrapper = document.querySelector('.wrapper');
    const footer = document.getElementById('footer');

    const handleScroll = () => {
      if (!wrapper || !footer) return;

      const footerTop = footer.getBoundingClientRect().top;
      const wrapperHeight = wrapper.offsetHeight;
      const viewportHeight = window.innerHeight;

      if (footerTop < viewportHeight) {
        // Calcula cuánto empujar hacia arriba
        const offset = viewportHeight - footerTop + 20;
        wrapper.style.top = `calc(25% - ${offset}px)`; // Ajusta top dinámicamente
      } else {
        wrapper.style.top = '25%'; // Restaura posición normal
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



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

  <div className="wrapper">
    <span className="icon-close">
      <ion-icon name="close-circle-sharp"></ion-icon>
    </span>
    <div className="form-box login">
      <h2>Login</h2>
      <form action="php/login_usuario_be.php" method="post">
        <div className="input-box">
          <span className="icon"><ion-icon name="mail-sharp"></ion-icon></span>
          <input type="email" name="email" required />
          <label>Email</label>
        </div>
        <div className="input-box">
          <span className="icon"><ion-icon name="lock-closed-sharp"></ion-icon></span>
          <input type="password" name="password" required />
          <label>Contraseña</label>
        </div>
        <div className="remember-forgot">
          <label><input type="checkbox" />Recuérdame</label>
          <a href="#">¿Olvidó contraseña?</a>
        </div>
        <button type="submit" className="btn">Login</button>
        <div className="login-register">
          <p>¿No tienes cuenta?<a href="#" className="register-link">Registrarme</a></p>
        </div>
      </form>
    </div>

      <div className="form-box register">
        <h2>Registro</h2>
        <form action="php/registro_usuario_be.php" method="post">
          <div className="input-box">
            <span className="icon"><ion-icon name="person-circle-sharp"></ion-icon></span>
            <input type="text" name="username" required />
            <label>Usuario</label>
          </div>
          <div className="input-box">
            <span className="icon"><ion-icon name="mail-sharp"></ion-icon></span>
            <input type="email" name="email" required />
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className="icon"><ion-icon name="lock-closed-sharp"></ion-icon></span>
            <input type="password" name="password" required />
            <label>Contraseña</label>
          </div>
          <div className="remember-forgot">
            <label><input type="checkbox" />Estoy de acuerdo con los términos y condiciones</label>
          </div>
          <button type="submit" className="btn">Register</button>
          <div className="login-register">
            <p>¿Ya tienes una cuenta?<a href="#" className="login-link">Login</a></p>
          </div>
        </form>
      </div>
  </div>


      <footer id="footer">
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


