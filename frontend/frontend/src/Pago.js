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

  const handleSubmit = async (e) => {
  e.preventDefault();
  const reserva_id = localStorage.getItem('reserva_id');
  if (!reserva_id) return alert("No se encontró el ID de la reserva.");

  const payload = {
    nombre: formData.nombre,
    numero_tarjeta: formData.numero_tarjeta,
    fecha_expiracion: formData.fecha_expiracion,
    cvv: formData.cvv,
    reserva_id
  };

  try {
    const response = await fetch("http://localhost:8000/guardar_pago.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (result.status === "success") {
      alert("¡Pago procesado correctamente!");
      window.location.href = "/detalle-reserva"; // ✅ Redirigir
    } else {
      alert(result.message || "Error al guardar el pago.");
    }
  } catch (error) {
    console.error(error);
    alert("Error de conexión con el servidor.");
  }
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
