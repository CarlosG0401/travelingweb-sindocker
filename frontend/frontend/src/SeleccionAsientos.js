import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import './assets/styles/asientos.css';

function SeleccionAsientos() {
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [cantidadReservas, setCantidadReservas] = useState(1);
  const navigate = useNavigate(); // Hook para redirección

  useEffect(() => {
    const reservas = localStorage.getItem('cantidad_reservas');
    setCantidadReservas(parseInt(reservas || '1'));
  }, []);

  const usuario_id = document.cookie
    .split('; ')
    .find(row => row.startsWith('usuario_id='))
    ?.split('=')[1];

  const datos_cliente_id = localStorage.getItem("datos_cliente_id");
  const aerolinea_id = localStorage.getItem("aerolinea_id");
  const viaje_id = localStorage.getItem("viaje_id");

  const filas = 20;
  const columnas = ['A', 'B', 'C', '', 'D', 'E', 'F'];

  const handleSeleccion = (asiento) => {
    if (asientosSeleccionados.includes(asiento)) {
      setAsientosSeleccionados(prev => prev.filter(a => a !== asiento));
    } else {
      if (asientosSeleccionados.length < cantidadReservas) {
        setAsientosSeleccionados(prev => [...prev, asiento]);
      } else {
        alert(`Solo puedes seleccionar ${cantidadReservas} asientos.`);
      }
    }
  };

  const enviarReserva = async () => {
    if (asientosSeleccionados.length !== cantidadReservas) {
      alert(`Debes seleccionar exactamente ${cantidadReservas} asientos.`);
      return;
    }

    console.log("Asientos seleccionados:", asientosSeleccionados);
    console.log("usuario_id:", usuario_id);
    console.log("datos_cliente_id:", datos_cliente_id);
    console.log("aerolinea_id:", aerolinea_id);
    console.log("viaje_id:", viaje_id);

    const payload = {
      usuario_id,
      datos_cliente_id,
      aerolinea_id,
      viaje_id,
      asientos: asientosSeleccionados,
    };

    try {
      const response = await fetch('http://localhost:8000/guardar_reserva.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.status === "success" && result.reserva_id) {
        localStorage.setItem('reserva_id', result.reserva_id); // ✅ Guardar ID de la reserva
        alert(result.message || "Reserva realizada correctamente.");
        navigate('/pago'); // ✅ Redirigir al formulario de pago
      } else {
        alert(result.message || "Error al procesar la reserva.");
      }
    } catch (error) {
      console.error("Error al guardar la reserva:", error);
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="cabina-avion">
      <div className="cabina">
        <h2>Selecciona tus {cantidadReservas} Asientos</h2>
        <div className="asientos-grid">
          {Array.from({ length: filas }).map((_, filaIdx) => (
            <div key={filaIdx} className="fila">
              {columnas.map((col, idx) => {
                const asiento = col === '' ? null : `${filaIdx + 1}${col}`;
                return col === '' ? (
                  <div key={idx} className="pasillo"></div>
                ) : (
                  <button
                    key={idx}
                    className={`asiento ${asientosSeleccionados.includes(asiento) ? 'seleccionado' : ''}`}
                    onClick={() => handleSeleccion(asiento)}
                  >
                    {asiento}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <p className="asiento-info">
          Asientos seleccionados: <strong>{asientosSeleccionados.join(', ')}</strong>
        </p>
        <button className="boton-enviar" onClick={enviarReserva}>
          Enviar Reserva
        </button>
      </div>
    </div>
  );
}

export default SeleccionAsientos;


