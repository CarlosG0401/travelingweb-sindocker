//Esta pestaña es el índice principal de TravelingWeb, dónde el cliente puede buscar viajes, iniciar sesión y registrarse.
//// También incluye una barra de navegación, un formulario de búsqueda y un pie de página con información de contacto y redes sociales.

//Importa las imágenes y estilos necesarios
import './assets/styles/styles-app.css';

import React, { useEffect } from 'react';

// Imágenes generales
import logoImg from './assets/images/imagen-foto-removebg-preview.png';
import facebookImg from './assets/images/facebook.png';
import twitterImg from './assets/images/gorjeo.png';
import instagramImg from './assets/images/instagram.png';

// Imágenes de banderas
import unionImg from './assets/images/union.jpeg';
import unitedImg from './assets/images/united.png';
import englandImg from './assets/images/england.png';
import ColombiaImg from './assets/images/colombia.png';
import BrasilImg from './assets/images/bandera-de-brasil.jpg';
import ArgentinaImg from './assets/images/argentina.png';
import PeruImg from './assets/images/peru.png';

//Esta función es el componente principal de la aplicación, y que además maneja la lógica de interacción del usuario, como el inicio de sesión y el registro.
function App() {
  useEffect(() => {
    const loginPopup = document.querySelector('.login-popup-container');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');

    if (registerLink) {
      registerLink.addEventListener('click', () => {
        loginPopup?.classList.add('active');
      });
    }

    if (loginLink) {
      loginLink.addEventListener('click', () => {
        loginPopup?.classList.remove('active');
      });
    }

    if (btnPopup) {
      btnPopup.addEventListener('click', () => {
        loginPopup?.classList.add('active-popup');
      });
    }

    if (iconClose) {
      iconClose.addEventListener('click', () => {
        loginPopup?.classList.remove('active-popup');
      });
    }

    return () => {
      registerLink?.removeEventListener('click', () => {});
      loginLink?.removeEventListener('click', () => {});
      btnPopup?.removeEventListener('click', () => {});
      iconClose?.removeEventListener('click', () => {});
    };
  }, []);

  useEffect(() => {
    const loginPopup = document.querySelector('.login-popup-container');
    const footer = document.getElementById('footer');

    const handleScroll = () => {
      if (!loginPopup || !footer) return;

      const footerTop = footer.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      if (footerTop < viewportHeight) {
        const offset = viewportHeight - footerTop + 20;
        loginPopup.style.top = `calc(25% - ${offset}px)`;
      } else {
        loginPopup.style.top = '25%';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

//Renderiza todo el componente de la aplicación, desde el encabezado, formulario de búsqueda, entre otros.
  return (
    <>
    <header>
        <div class="logo-container">
          <h2 class="logo">
            <img src={logoImg} alt="Logo" class="logo-img" />
            TravelingWeb
          </h2>
        </div>
        <nav class="navigation">
          <a href="#">Home</a>
          <a href="#">Service</a>
          <a href="#">Nosotros</a>
          <a href="#">Contacto</a>
          <button class="btnLogin-popup">Login</button>
        </nav>
    </header>

      <div className="center-text">
        <h1>¡Aquí es dónde empieza tú aventura!</h1>
      </div>

      <div className="search-section">
        <form
          className="form-search-section"
          method="post"
          action="http://localhost/backend/buscar_viajes.php"
        >
          <input type="text" name="origen" placeholder="Lugar de Origen" className="search-input" required />
          <input type="text" name="destino" placeholder="Lugar de Destino" className="search-input" required />
          <input type="date" name="fecha_inicio" className="search-input" required />
          <input type="date" name="fecha_fin" className="search-input" required />
          <button type="submit" className="search-btn">Buscar</button>
        </form>
      </div>

      <div className="login-popup-container">
        <span className="icon-close"><ion-icon name="close-circle-sharp"></ion-icon></span>
        <div className="form-box-login">
          <h2>Login</h2>
          <form action="http://localhost:8000/login_usuario_be.php" method="post">
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

        <div className="form-box-register">
          <h2>Registro</h2>
          <form action="http://localhost:8000/registro_usuario_be.php" method="post">
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

      <div className="currency-exchange-strip">
        <div className="animated-strip">
          <div className="exchange-item"><img src={unionImg} alt="Euro" className="flag" /><span className="exchange-rate">1 EUR = 850 CLP</span></div>
          <div className="exchange-item"><img src={unitedImg} alt="USD" className="flag" /><span className="exchange-rate">1 USD = 800 CLP</span></div>
          <div className="exchange-item"><img src={englandImg} alt="Libra" className="flag" /><span className="exchange-rate">1 GBP = 1.200 CLP</span></div>
          <div className="exchange-item"><img src={BrasilImg} alt="Real" className="flag" /><span className="exchange-rate">1 BRL = 167 CLP</span></div>
          <div className="exchange-item"><img src={ArgentinaImg} alt="ARS" className="flag" /><span className="exchange-rate">1 ARS = 0,93 CLP</span></div>
          <div className="exchange-item"><img src={ColombiaImg} alt="COL" className="flag" /><span className="exchange-rate">1 COL = 0,21 CLP</span></div>
          <div className="exchange-item"><img src={PeruImg} alt="PEN" className="flag" /><span className="exchange-rate">1 PEN = 241 CLP</span></div>
          <div className="exchange-item"><img src={unionImg} alt="Euro" className="flag" /><span className="exchange-rate">1 EUR = 850 CLP</span></div>
          <div className="exchange-item"><img src={unitedImg} alt="USD" className="flag" /><span className="exchange-rate">1 USD = 800 CLP</span></div>
          <div className="exchange-item"><img src={englandImg} alt="Libra" className="flag" /><span className="exchange-rate">1 GBP = 1.200 CLP</span></div>
          <div className="exchange-item"><img src={BrasilImg} alt="Real" className="flag" /><span className="exchange-rate">1 BRL = 167 CLP</span></div>
          <div className="exchange-item"><img src={ArgentinaImg} alt="ARS" className="flag" /><span className="exchange-rate">1 ARS = 0,93 CLP</span></div>
          <div className="exchange-item"><img src={ColombiaImg} alt="COL" className="flag" /><span className="exchange-rate">1 COL = 0,21 CLP</span></div>
          <div className="exchange-item"><img src={PeruImg} alt="PEN" className="flag" /><span className="exchange-rate">1 PEN = 241 CLP</span></div>
          <div className="exchange-item"><img src={unionImg} alt="Euro" className="flag" /><span className="exchange-rate">1 EUR = 850 CLP</span></div>
          <div className="exchange-item"><img src={unitedImg} alt="USD" className="flag" /><span className="exchange-rate">1 USD = 800 CLP</span></div>
          <div className="exchange-item"><img src={englandImg} alt="Libra" className="flag" /><span className="exchange-rate">1 GBP = 1.200 CLP</span></div>
          <div className="exchange-item"><img src={BrasilImg} alt="Real" className="flag" /><span className="exchange-rate">1 BRL = 167 CLP</span></div>
          <div className="exchange-item"><img src={ArgentinaImg} alt="ARS" className="flag" /><span className="exchange-rate">1 ARS = 0,93 CLP</span></div>
          <div className="exchange-item"><img src={ColombiaImg} alt="COL" className="flag" /><span className="exchange-rate">1 COL = 0,21 CLP</span></div>
          <div className="exchange-item"><img src={PeruImg} alt="PEN" className="flag" /><span className="exchange-rate">1 PEN = 241 CLP</span></div>
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
          <p style={{ marginTop: '10px' }}>&quot;Comprometidos con la calidad y el servicio desde 2024.&quot;</p>
          <p>Contacto: <a href="mailto:info@travelingweb.com" style={{ color: '#ccc' }}>info@travelingweb.com</a> | Teléfono: +22 444 663</p>
          <p><a href="faq.html" style={{ color: '#ccc', textDecoration: 'none' }}>Preguntas Frecuentes</a> | <a href="soporte.html" style={{ color: '#ccc', textDecoration: 'none' }}>Soporte Técnico</a></p>
          <p><a href="terminos.html" style={{ color: '#ccc', textDecoration: 'none' }}>Términos y Condiciones</a> | <a href="privacidad.html" style={{ color: '#ccc', textDecoration: 'none' }}>Política de Privacidad</a></p>
        </div>
      </footer>
    </>
  );
}

export default App;




