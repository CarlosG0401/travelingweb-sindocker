//Copyright (c) 2024 TravelingWeb. All rights reserved.
//En esta pestaña se maneja el Dashboard de la aplicación, misma pestaña que el índice, pero con el usuario logueado y con la posibilidad de buscar viajes.

//Importamos estilos e imágenes necesarias para el Dashboard.
import './assets/styles/styles.css';
import React, { useEffect } from 'react';
import logoImg from './assets/images/imagen-foto-removebg-preview.png';
import facebookImg from './assets/images/facebook.png';
import twitterImg from './assets/images/gorjeo.png';
import instagramImg from './assets/images/instagram.png';
import unionImg from './assets/images/union.jpeg';
import unitedImg from './assets/images/united.png';
import englandImg from './assets/images/england.png';
import ColombiaImg from './assets/images/colombia.png';
import BrasilImg from './assets/images/bandera-de-brasil.jpg';
import ArgentinaImg from './assets/images/argentina.png';
import PeruImg from './assets/images/peru.png';
import { useNavigate } from 'react-router-dom';

// Definimos el componente Dashboard que representa la página principal del usuario logueado.
function Dashboard() {
  const navigate = useNavigate();
  const getUsername = () => {
 
  const fromStorage = localStorage.getItem('username');
  if (fromStorage) return fromStorage;

  // Si no está en localStorage, buscamos en las cookies.
  const match = document.cookie.match(/(?:^|;\s*)username=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
};

const username = getUsername();

//En esta parte del código, se maneja el efecto de scroll para que el contenido se ajuste a la altura del footer.
  useEffect(() => {
    const wrapper = document.querySelector('.wrapper');
    const footer = document.getElementById('footer');

    const handleScroll = () => {
      if (!wrapper || !footer) return;

      const footerTop = footer.getBoundingClientRect().top;
      const wrapperHeight = wrapper.offsetHeight;
      const viewportHeight = window.innerHeight;

      if (footerTop < viewportHeight) {
        const offset = viewportHeight - footerTop + 20;
        wrapper.style.top = `calc(25% - ${offset}px)`;
      } else {
        wrapper.style.top = '25%';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
// Aquí puedes hacer una llamada a la API para buscar viajes.
    localStorage.setItem('busqueda', JSON.stringify(data)); 
    navigate('/buscar'); 
  };
// Esta función maneja la búsqueda de viajes cuando el usuario envía el formulario.
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
          <div className="user-dropdown">
            <button className="user-button">
                Bienvenido, {username} <span className="arrow">▼</span>
            </button>
            <div className="dropdown-content">
                <a href="#">Editar perfil</a>
                <button
                onClick={() => {
                    localStorage.removeItem('username');
                    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                     window.location.href = "http://localhost:8000/cerrar_sesion.php";
                }}
                >
                Cerrar sesión
                </button>
             </div>
            </div>
        </nav>
      </header>

      <div className="center-text">
        <h1>¡Aquí es dónde empieza tú aventura!</h1>
      </div>

      <div className="search-container">
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" name="origen" placeholder="Lugar de Origen" className="search-input" required />
          <input type="text" name="destino" placeholder="Lugar de Destino" className="search-input" required />
          <input type="date" name="fecha_inicio" className="search-input" required />
          <input type="date" name="fecha_fin" className="search-input" required />
          <button type="submit" className="search-btn">Buscar</button>
        </form>
      </div>

      <div className="exchange-container">
              <div className="animated-exchange">
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
          <p style={{ marginTop: '10px' }}>
            "Comprometidos con la calidad y el servicio desde 2024."
          </p>
          <p>
            Contacto: <a href="mailto:info@travelingweb.com" style={{ color: '#ccc' }}>info@travelingweb.com</a> |
            Teléfono: +22 444 663
          </p>
          <p>
            <a href="faq.html" style={{ color: '#ccc', textDecoration: 'none' }}>Preguntas Frecuentes</a> |
            <a href="soporte.html" style={{ color: '#ccc', textDecoration: 'none' }}>Soporte Técnico</a>
          </p>
          <p>
            <a href="terminos.html" style={{ color: '#ccc', textDecoration: 'none' }}>Términos y Condiciones</a> |
            <a href="privacidad.html" style={{ color: '#ccc', textDecoration: 'none' }}>Política de Privacidad</a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Dashboard;
