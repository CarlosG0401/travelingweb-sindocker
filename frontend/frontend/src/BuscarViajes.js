//En esta pestaña se pueden buscar viajes disponibles según los criterios ingresados por el usuario.
//Importamos las librerías y estilos necesarios de uso general, así como la imagen del logo y el hook useNavigate para la navegación entre rutas, el useState y useEffect para manejar el estado y los efectos secundarios del componente.
import React, { useState, useEffect } from 'react';
import './assets/styles/buscar_viajes_styles.css'
import logoImg from './assets/images/imagen-foto-removebg-preview.png';
import { useNavigate } from 'react-router-dom';

//Función principal del componente BuscarViajes.

function BuscarViajes() {
  const [viajes, setViajes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Recuperamos los datos de búsqueda del localStorage.
  // Si no hay datos, no hacemos nada.
  const storedData = JSON.parse(localStorage.getItem('busqueda'));
  if (!storedData) return;

  const data = new URLSearchParams(storedData);

  console.log("Datos enviados:", Object.fromEntries(data.entries()));


  fetch('http://localhost:8000/buscar_viajes.php', {
    method: 'POST',
    body: data,
  })
    .then(res => res.json())
    .then(result => {
      console.log("Resultado de búsqueda:", result); 
      setViajes(result);
    })
    .catch(() => alert('Error al buscar viajes'));
}, []);


  return (
    <>
      <header>
        <h2 className="logo">
          <img src={logoImg} alt="Logo" className="logo-img" />
        </h2>
        <nav className="navigation">
          <a href="/">Home</a>
          <a href="#">Service</a>
          <a href="#">Nosotros</a>
          <a href="#">Contacto</a>
        </nav>
      </header>

      <div className="center-text">
        <h1>Resultados</h1>
      </div>
      {viajes.length > 0 && (
        <div className="search-container">
          
          <table className="results-table">
            <thead>
              <tr>
                <th>Origen</th>
                <th>Destino</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Días</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {viajes.map((v, index) => (
                <tr key={index}>
                  <td>{v.origen}</td>
                  <td>{v.destino}</td>
                  <td>{v.fecha_inicio}</td>
                  <td>{v.fecha_fin}</td>
                  <td>{v.dias}</td>
                  <td>
                   <button
                    onClick={() => {
                      localStorage.setItem('viaje_id', v.id); // <-- Guardar ID del viaje aquí
                      navigate(`/aerolineas/${v.id}`);
                    }}
                    className="search-btn"
                  >
                    Ver Aerolíneas
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
export default BuscarViajes;

// © 2025 TravelingWeb - All rights reserved.
