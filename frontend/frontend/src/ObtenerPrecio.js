//En esta pestaña el usuario puede ver el precio de los pasajes de una aerolínea específica al consultar tanto de ida como de ida y vuelta.

import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './assets/styles/precios_styles.css';

function ObtenerPrecio() {
  const { aerolineaId } = useParams();
  const [precios, setPrecios] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const pasajes = query.get('pasajes') || 1;

  useEffect(() => {
    fetch(`http://localhost:8000/obtener_precio.php?aerolineas_id=${aerolineaId}`)
      .then(res => res.json())
      .then(data => setPrecios(data))
      .catch(err => console.error(err));
  }, [aerolineaId]);

  const handleVerDetalle = () => {
    alert('Detalles desplegados (puedes hacer lógica más avanzada)');
  };

  const handleSiguiente = () => {
    // redirige a la nueva ruta
    navigate('/formulario-cliente');
  };

  return (
    <div className="center-text">
      <h1>Detalle de Precios</h1>
      <table className="results-table">
        <thead>
          <tr>
            <th>Precio Ida</th>
            <th>Precio Ida y Vuelta</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {precios.map((p, i) => (
            <tr key={i}>
              <td>${p.precio_ida}</td>
              <td>${p.precio_ida_vuelta}</td>
              <td>Por Persona</td>
              <td>
                <button onClick={handleVerDetalle}>Ver Detalle</button>
                <button onClick={handleSiguiente}>Siguiente</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ObtenerPrecio;
