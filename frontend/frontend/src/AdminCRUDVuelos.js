import "./assets/styles/AdminCRUDVuelos.css";
import React, { useState, useEffect } from "react";

const AdminCRUDVuelos = () => {
  const [flights, setFlights] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  const flightsPerPage = 5;
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);
  const totalPages = Math.ceil(flights.length / flightsPerPage);

  useEffect(() => {
    fetch("http://localhost:8000/obtener_viajes.php")
      .then((res) => res.json())
      .then((data) => setFlights(data))
      .catch((err) => console.error("Error cargando vuelos:", err));
  }, []);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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
    // Aquí podrías agregar lógica para eliminar vuelo en la BD si lo deseas.
    setFlights(flights.filter((f) => f.id !== id));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const newFlight = {
      ...formData,
      dias: parseInt(formData.dias),
    };

    const res = await fetch("http://localhost:8000/agregar_viaje.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFlight),
    });

    const result = await res.json();

    if (result.success) {
      const res = await fetch("http://localhost:8000/obtener_viajes.php");
      const data = await res.json();
      setFlights(data);
      setShowForm(false);
      setEditingFlight(null);
    } else {
      alert("Error al guardar: " + result.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_username");
    localStorage.removeItem("admin_id");
    window.location.href = "/admin/login";
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Gestión de Vuelos</h1>
        <nav className="admin-nav">
          <a href="/admin/reportes" className="nav-link">Reportes</a>
          <span className="admin-user">👤 {localStorage.getItem("admin_username")}</span>
          <button className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
      </header>

      <div className="admin-content-wrapper">
        <div className="admin-actions">
          <button className="btn-add" onClick={handleAdd}>+ Agregar Vuelo</button>
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
                    <button className="btn-edit" onClick={() => handleEdit(flight)}>Editar</button>
                    <button className="btn-delete" onClick={() => handleDelete(flight.id)}>Eliminar</button>
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
            <input type="text" name="origen" value={formData.origen} onChange={handleChange} placeholder="Origen" required />
            <input type="text" name="destino" value={formData.destino} onChange={handleChange} placeholder="Destino" required />
            <input type="date" name="fecha_inicio" value={formData.fecha_inicio} onChange={handleChange} required />
            <input type="date" name="fecha_fin" value={formData.fecha_fin} onChange={handleChange} required />
            <input type="number" name="dias" value={formData.dias} onChange={handleChange} placeholder="Días" required />
            <input type="datetime-local" name="fecha" value={formData.fecha} onChange={handleChange} required />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-save">Guardar</button>
            <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminCRUDVuelos;

