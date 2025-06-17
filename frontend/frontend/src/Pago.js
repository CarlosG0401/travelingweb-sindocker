import React, { useState } from 'react';
import './assets/styles/pago.css'; // Puedes crear tu propio estilo

function Pago() {
  const [formData, setFormData] = useState({
    nombre: '',
    numero_tarjeta: '',
    fecha_expiracion: '',
    cvv: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Procesando pago:", formData);
    alert("¡Pago procesado correctamente!");
    // Aquí podrías redirigir al home o a una página de confirmación
  };

  return (
    <div className="pago-container">
      <h2>Formulario de Pago</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre del titular:</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />

        <label>Número de tarjeta:</label>
        <input type="text" name="numero_tarjeta" value={formData.numero_tarjeta} onChange={handleChange} required maxLength="16" />

        <label>Fecha de expiración:</label>
        <input type="month" name="fecha_expiracion" value={formData.fecha_expiracion} onChange={handleChange} required />

        <label>CVV:</label>
        <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} required maxLength="4" />

        <button type="submit">Pagar</button>
      </form>
    </div>
  );
}

export default Pago;
