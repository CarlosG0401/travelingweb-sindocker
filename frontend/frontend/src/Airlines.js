import React, { useEffect, useState } from 'react';
import './assets/styles/styles-app-air.css';
import { useParams } from 'react-router-dom';

function Airlines() {
  const { viajeId } = useParams();
  const [aerolineas, setAerolineas] = useState([]);
  const [cantidad, setCantidad] = useState({}); // guarda cantidad por fila

  useEffect(() => {
    fetch(`http://localhost:8000/obtener_aerolineas.php?viaje_id=${viajeId}`)
      .then(res => res.json())
      .then(data => setAerolineas(data))
      .catch(err => console.error(err));
  }, [viajeId]);

  const handleChange = (index, value) => {
    setCantidad({ ...cantidad, [index]: value });
  };

  const handleReserva = (index) => {
    const pasajes = cantidad[index] || 1;
    alert(`Reservaste ${pasajes} pasaje(s) con ${aerolineas[index].nombre}`);
  };

  return (
    <div className="center-text">
      <h1>Aerolíneas Disponibles</h1>

      <div className="airlines-box">
        <table className="results-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nombre</th>
              <th>Tipo de vuelo</th>
              <th>Hora de salida</th>
              <th>Hora de llegada</th>
              <th>Opción</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {aerolineas.map((a, i) => (
              <tr key={i}>
                <td>
                  <img
                    src={`/${a.logo_nombre}`} // ← viene directo desde la DB
                    alt={a.nombre}
                    style={{ width: '40px', height: '50px' }}
                  />
                </td>
                <td>{a.nombre}</td>
                <td>{a.tipo_vuelo}</td>
                <td>{a.hora_salida}</td>
                <td>{a.hora_llegada}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={cantidad[i] || 1}
                    onChange={(e) => handleChange(i, e.target.value)}
                    style={{ width: '60px', padding: '5px' }}
                  />
                </td>
                <td>
                  <button onClick={() => handleReserva(i)} className="btn reservar-btn">
                    Reservar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Airlines;


