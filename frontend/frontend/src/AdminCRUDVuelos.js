//En esta pestaña el administrador puede agregar, editar y eliminar vuelos.

//Importamos las librerías y estilos necesarios.
import "./assets/styles/AdminCRUDVuelos.css";
import React, { useState } from "react";

// Componente AdminCRUDVuelos
const AdminCRUDVuelos = () => {
  // Datos de ejemplo -- ELIMINAR CUANDO SE CONECTE AL BACKEND

    const initialFlights = [
    {
        id: 1,
        origen: "Santiago",
        destino: "Buenos Aires",
        fecha_inicio: "2025-06-01",
        fecha_fin: "2025-06-10",
        dias: 9,
        fecha: "2025-05-22T08:00",
    },
    {
        id: 2,
        origen: "Madrid",
        destino: "Barcelona",
        fecha_inicio: "2025-07-05",
        fecha_fin: "2025-07-08",
        dias: 3,
        fecha: "2025-06-20T09:30",
    },
    {
        id: 3,
        origen: "Lima",
        destino: "Cusco",
        fecha_inicio: "2025-08-12",
        fecha_fin: "2025-08-15",
        dias: 3,
        fecha: "2025-07-30T10:00",
    },
    {
        id: 4,
        origen: "Buenos Aires",
        destino: "Rio de Janeiro",
        fecha_inicio: "2025-09-10",
        fecha_fin: "2025-09-15",
        dias: 5,
        fecha: "2025-08-25T14:00",
    },
    {
        id: 5,
        origen: "Ciudad de México",
        destino: "Cancún",
        fecha_inicio: "2025-10-01",
        fecha_fin: "2025-10-07",
        dias: 6,
        fecha: "2025-09-10T16:00",
    },
    {
        id: 6,
        origen: "Paris",
        destino: "Londres",
        fecha_inicio: "2025-11-01",
        fecha_fin: "2025-11-05",
        dias: 4,
        fecha: "2025-10-15T12:00",
    },
    {
        id: 7,
        origen: "Nueva York",
        destino: "Miami",
        fecha_inicio: "2025-12-20",
        fecha_fin: "2025-12-25",
        dias: 5,
        fecha: "2025-12-01T18:00",
    },
    {
        id: 8,
        origen: "Tokio",
        destino: "Osaka",
        fecha_inicio: "2026-01-10",
        fecha_fin: "2026-01-14",
        dias: 4,
        fecha: "2025-12-20T07:30",
    },
    {
        id: 9,
        origen: "Sídney",
        destino: "Melbourne",
        fecha_inicio: "2026-02-05",
        fecha_fin: "2026-02-10",
        dias: 5,
        fecha: "2026-01-25T11:00",
    },
    {
        id: 10,
        origen: "Roma",
        destino: "Venecia",
        fecha_inicio: "2026-03-12",
        fecha_fin: "2026-03-16",
        dias: 4,
        fecha: "2026-02-28T13:30",
    },
    ];
    // FIN DE DATOS DE PRUEBA
    const [flights, setFlights] = useState(initialFlights);
    const [currentPage, setCurrentPage] = useState(1);
    const flightsPerPage = 5;

    const indexOfLastFlight = currentPage * flightsPerPage;
    const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
    const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);

    const totalPages = Math.ceil(flights.length / flightsPerPage);

    const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    };
  
  const [editingFlight, setEditingFlight] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    origen: "",
    destino: "",
    fecha_inicio: "",
    fecha_fin: "",
    dias: "",
    fecha: "",
  });

  const handleAdd = () => {
    setFormData({
      origen: "",
      destino: "",
      fecha_inicio: "",
      fecha_fin: "",
      dias: "",
      fecha: "",
    });
    setEditingFlight(null);
    setShowForm(true);
  };

  const handleEdit = (flight) => {
    setFormData(flight);
    setEditingFlight(flight);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setFlights(flights.filter((f) => f.id !== id));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newFlight = {
      ...formData,
      dias: parseInt(formData.dias),
    };

    if (editingFlight) {
      setFlights(
        flights.map((f) => (f.id === editingFlight.id ? { ...newFlight, id: f.id } : f))
      );
    } else {
      const newId = flights.length > 0 ? Math.max(...flights.map((f) => f.id)) + 1 : 1;
      setFlights([...flights, { ...newFlight, id: newId }]);
    }

    setShowForm(false);
    setEditingFlight(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Gestión de Vuelos</h1>

      <div className="admin-content-wrapper">
        <div className="admin-actions">
        <button className="btn-add" onClick={handleAdd}>
            + Agregar Vuelo
        </button>
        </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Días</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentFlights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.id}</td>
                <td>{flight.origen}</td>
                <td>{flight.destino}</td>
                <td>{flight.fecha_inicio}</td>
                <td>{flight.fecha_fin}</td>
                <td>{flight.dias}</td>
                <td>{flight.fecha}</td>
                <td className="actions-cell">
                  <button className="btn-edit" onClick={() => handleEdit(flight)}>
                    Editar
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(flight.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
                >
                {index + 1}
                </button>
            ))}
        </div>
      </div>
    </div>
      {showForm && (
        <form className="admin-form" onSubmit={handleSave}>
          <h2>{editingFlight ? "Editar Vuelo" : "Agregar Vuelo"}</h2>
          <div className="form-grid">
            <input
              type="text"
              name="origen"
              value={formData.origen}
              onChange={handleChange}
              placeholder="Origen"
              required
            />
            <input
              type="text"
              name="destino"
              value={formData.destino}
              onChange={handleChange}
              placeholder="Destino"
              required
            />
            <input
              type="date"
              name="fecha_inicio"
              value={formData.fecha_inicio}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="fecha_fin"
              value={formData.fecha_fin}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="dias"
              value={formData.dias}
              onChange={handleChange}
              placeholder="Días"
              required
            />
            <input
              type="datetime-local"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-save">
              Guardar
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};




export default AdminCRUDVuelos;
