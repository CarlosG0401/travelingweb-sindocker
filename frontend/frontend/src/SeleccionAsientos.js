import React, { useState } from 'react';
import './assets/styles/asientos.css';

function SeleccionAsientos() {
  const [asientoSeleccionado, setAsientoSeleccionado] = useState(null);

  const filas = 20;
  const columnas = ['A', 'B', 'C', '', 'D', 'E', 'F']; 
  const asientos = [];

  for (let i = 1; i <= filas; i++) {
    columnas.forEach((col) => {
      if (col !== '') asientos.push(`${i}${col}`);
    });
  }

  const handleSeleccion = (asiento) => {
    setAsientoSeleccionado(asiento);
  };

  return (
    <div className="cabina-avion">
      <div className="cabina">
        <h2>Selecciona tu Asiento</h2>
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
                    className={`asiento ${asientoSeleccionado === asiento ? 'seleccionado' : ''}`}
                    onClick={() => handleSeleccion(asiento)}
                  >
                    {asiento}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        {asientoSeleccionado && (
          <p className="asiento-info">Asiento seleccionado: <strong>{asientoSeleccionado}</strong></p>
        )}
      </div>
    </div>
  );
}

export default SeleccionAsientos;
