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
 


  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [precioSeleccionado, setPrecioSeleccionado] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/obtener_precio.php?aerolineas_id=${aerolineaId}`)
      .then(res => res.json())
      .then(data => setPrecios(data))
      .catch(err => console.error(err));
  }, [aerolineaId]);

  const handleSeleccionPrecio = (tipo, precio) => {
    const viaje_id = localStorage.getItem('viaje_id');
    setTipoSeleccionado(tipo);
    setPrecioSeleccionado(precio);

    console.log("Seleccionando precio", {
    tipo,
    precio,
    viaje_id
    });

    localStorage.setItem('tipo_precio', tipo);
    localStorage.setItem('precio_unitario', precio);
    localStorage.setItem('aerolinea_id', aerolineaId);
    localStorage.setItem('cantidad_reservas', pasajes);
    localStorage.setItem('viaje_id', viaje_id);
  };

  const handleSiguiente = () => {
    if (!tipoSeleccionado || !precioSeleccionado) {
      alert("Debe seleccionar un tipo de precio antes de continuar.");
      return;
    }
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
            <th>Seleccionar</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {precios.map((p, i) => (
            <tr key={i}>
              <td>${p.precio_ida}</td>
              <td>${p.precio_ida_vuelta}</td>
              <td>
                <button
                  className={tipoSeleccionado === 'ida' ? 'btn-selected' : ''}
                  onClick={() => handleSeleccionPrecio('ida', p.precio_ida)}
                >
                  Seleccionar Ida
                </button>
                <button
                  className={tipoSeleccionado === 'ida_vuelta' ? 'btn-selected' : ''}
                  onClick={() => handleSeleccionPrecio('ida_vuelta', p.precio_ida_vuelta)}
                >
                  Seleccionar Ida y Vuelta
                </button>
              </td>
              <td>
                <button onClick={() => alert('Detalles desplegados')}>Ver Detalle</button>
                <button onClick={handleSiguiente}>Siguiente</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {tipoSeleccionado && (
        <p style={{ marginTop: '15px', fontWeight: 'bold' }}>
          Seleccionado: {tipoSeleccionado === 'ida' ? 'Solo Ida' : 'Ida y Vuelta'} por ${precioSeleccionado}
        </p>
      )}
    </div>
  );
}

export default ObtenerPrecio;


