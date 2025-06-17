// Archivo: ErroresRecomendaciones.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './assets/styles/errores-recomendaciones.css';


function ErroresRecomendaciones() {
  const location = useLocation();
  const navigate = useNavigate();

  const { errores = [], recomendaciones = [], nacionalidad } = location.state || {};

  const volverAlFormulario = () => navigate('/formulario-cliente');

  return (
    <div className="errores-container">
      <h1>Errores y Recomendaciones para {nacionalidad}</h1>

      {errores.length > 0 && (
        <div className="errores-box">
          <h2>Errores Detectados:</h2>
          <ul>
            {errores.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {recomendaciones.length > 0 && (
        <div className="recomendaciones-box">
          <h2>Recomendaciones:</h2>
          <ul>
            {recomendaciones.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="boton-volver" onClick={volverAlFormulario}>
        Volver al Formulario
      </button>
    </div>
  );
}

export default ErroresRecomendaciones;