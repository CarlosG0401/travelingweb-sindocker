import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell
} from "recharts";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./assets/styles/AdminReportes.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AdminReportesReservas() {
  const [totalCompras, setTotalCompras] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);
  const [dataReservasPorDestino, setDataReservasPorDestino] = useState([]);
  const [dataVentasPorTipoPrecio, setDataVentasPorTipoPrecio] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [filters, setFilters] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    destino: ""
  });

  const fetchReportes = () => {
    const query = new URLSearchParams(filters).toString();
    fetch(`http://localhost:8000/obtener_reportes.php?${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTotalCompras(data.total_compras);
          setTotalVentas(data.total_ventas);
          setDataReservasPorDestino(data.reservas_por_destino);
          setDataVentasPorTipoPrecio(data.ventas_por_tipo_precio);

          const destinosUnicos = [...new Set(data.reservas_por_destino.map(d => d.destino))];
          setDestinos(destinosUnicos);
        } else {
          console.error("Error:", data.message);
        }
      });
  };

  useEffect(() => {
    fetchReportes();
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    const ws1 = XLSX.utils.json_to_sheet(dataReservasPorDestino);
    XLSX.utils.book_append_sheet(wb, ws1, "Reservas por Destino");

    const ws2 = XLSX.utils.json_to_sheet(dataVentasPorTipoPrecio);
    XLSX.utils.book_append_sheet(wb, ws2, "Ventas por Tipo");

    const ws3 = XLSX.utils.aoa_to_sheet([
      ["Total Compras", totalCompras],
      ["Total Ventas", totalVentas],
    ]);
    XLSX.utils.book_append_sheet(wb, ws3, "Resumen");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, "reporte_ventas.xlsx");
  };

  const exportToPDF = () => {
  const doc = new jsPDF();

  doc.text("Reporte de Ventas", 14, 14);

  autoTable(doc, {
    head: [["Destino", "Cantidad"]],
    body: dataReservasPorDestino.map(r => [r.destino, r.cantidad]),
    startY: 20
  });

  autoTable(doc, {
    head: [["Tipo", "Total ($)"]],
    body: dataVentasPorTipoPrecio.map(r => [r.tipo, r.total]),
    startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 40
  });

  autoTable(doc, {
    head: [["Métrica", "Valor"]],
    body: [["Total Compras", totalCompras], ["Total Ventas ($)", totalVentas]],
    startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 60
  });

  doc.save("reporte_ventas.pdf");
  };


  const handleLogout = () => {
    localStorage.removeItem("admin_username");
    localStorage.removeItem("admin_id");
    window.location.href = "/admin/login";
  };

  return (
    <div className="admin-reports-wrapper">
      <header className="admin-header">
        <h1>Reporte de Ventas</h1>
        <nav className="admin-nav">
          <a href="/admin/vuelos" className="nav-link">Vuelos</a>
          <a href="/admin/reportes" className="nav-link">Reportes</a>
          <span className="admin-user">👤 {localStorage.getItem("admin_username")}</span>
          <button className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
      </header>

      <h2 className="reports-title">Reportes de Ventas</h2>

      <div className="filters-export-container">
        <div className="filters-container">
          <input type="date" name="fecha_inicio" value={filters.fecha_inicio} onChange={handleChange} />
          <input type="date" name="fecha_fin" value={filters.fecha_fin} onChange={handleChange} />
          <select name="destino" value={filters.destino} onChange={handleChange}>
            <option value="">Todos los destinos</option>
            {destinos.map((dest, idx) => (
              <option key={idx} value={dest}>{dest}</option>
            ))}
          </select>
        </div>

        <div className="export-buttons">
          <button className="btn-export btn-excel" onClick={exportToExcel}>Exportar a Excel</button>
          <button className="btn-export btn-pdf" onClick={exportToPDF}>Exportar a PDF</button>
        </div>
      </div>

      <div className="stats-cards">
        <div className="card"><h3>Total Compras</h3><p>{totalCompras}</p></div>
        <div className="card"><h3>Total Ventas ($)</h3><p>{totalVentas.toLocaleString()}</p></div>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h3>Destinos más comprados</h3>
          <BarChart width={500} height={300} data={dataReservasPorDestino}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="destino" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad" fill="#0d47a1" />
          </BarChart>
        </div>

        <div className="chart">
          <h3>Ventas por Tipo de Precio</h3>
          <PieChart width={400} height={300}>
            <Pie data={dataVentasPorTipoPrecio} dataKey="total" nameKey="tipo" cx="50%" cy="50%" outerRadius={90} label>
              {dataVentasPorTipoPrecio.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
