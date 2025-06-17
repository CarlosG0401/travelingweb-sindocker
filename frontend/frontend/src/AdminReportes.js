// En esta pestaña el administrador puede ver el detalle de reportes de reservas y ventas.

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./assets/styles/AdminReportes.css";

const reservas = [
  { id: 1, asientos: "A1,A2", tipo_precio: "Economy", precio_unitario: 100.5, cantidad_reservas: 2, total_pago: 201, aerolinea_id: 1, viaje_id: 1, datos_clientes_id: 1, usuario_id: 1 },
  { id: 2, asientos: "B1", tipo_precio: "Business", precio_unitario: 300, cantidad_reservas: 1, total_pago: 300, aerolinea_id: 2, viaje_id: 2, datos_clientes_id: 2, usuario_id: 2 },
  { id: 3, asientos: "C1,C2,C3", tipo_precio: "Economy", precio_unitario: 90, cantidad_reservas: 3, total_pago: 270, aerolinea_id: 1, viaje_id: 1, datos_clientes_id: 3, usuario_id: 3 },
  { id: 4, asientos: "D1", tipo_precio: "Economy", precio_unitario: 120, cantidad_reservas: 1, total_pago: 120, aerolinea_id: 3, viaje_id: 3, datos_clientes_id: 4, usuario_id: 4 },
  { id: 5, asientos: "E1,E2", tipo_precio: "Business", precio_unitario: 250, cantidad_reservas: 2, total_pago: 500, aerolinea_id: 2, viaje_id: 2, datos_clientes_id: 5, usuario_id: 1 },
  { id: 6, asientos: "F1,F2,F3,F4", tipo_precio: "Economy", precio_unitario: 80, cantidad_reservas: 4, total_pago: 320, aerolinea_id: 1, viaje_id: 3, datos_clientes_id: 6, usuario_id: 5 },
  { id: 7, asientos: "G1", tipo_precio: "Economy", precio_unitario: 110, cantidad_reservas: 1, total_pago: 110, aerolinea_id: 3, viaje_id: 1, datos_clientes_id: 7, usuario_id: 6 },
  { id: 8, asientos: "H1,H2", tipo_precio: "Business", precio_unitario: 320, cantidad_reservas: 2, total_pago: 640, aerolinea_id: 2, viaje_id: 3, datos_clientes_id: 8, usuario_id: 7 },
];

const viajes = [
  { id: 1, destino: "Buenos Aires" },
  { id: 2, destino: "Madrid" },
  { id: 3, destino: "Tokio" },
];

const totalCompras = reservas.reduce((acc, r) => acc + r.cantidad_reservas, 0);
const totalVentas = reservas.reduce((acc, r) => acc + r.total_pago, 0).toFixed(2);

const reservasPorDestinoMap = reservas.reduce((acc, r) => {
  const viaje = viajes.find((v) => v.id === r.viaje_id);
  if (viaje) {
    acc[viaje.destino] = (acc[viaje.destino] || 0) + r.cantidad_reservas;
  }
  return acc;
}, {});

const dataReservasPorDestino = Object.entries(reservasPorDestinoMap).map(([destino, cantidad]) => ({
  destino,
  cantidad,
}));

const ventasPorTipoPrecioMap = reservas.reduce((acc, r) => {
  acc[r.tipo_precio] = (acc[r.tipo_precio] || 0) + r.total_pago;
  return acc;
}, {});

const dataVentasPorTipoPrecio = Object.entries(ventasPorTipoPrecioMap).map(([tipo, total]) => ({
  tipo,
  total,
}));

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AdminReportesReservas() {
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
      <div className="reports-container">
        <div className="stats-cards">
          <div className="card">
            <h3>Total Compras</h3>
            <p>{totalCompras}</p>
          </div>

          <div className="card">
            <h3>Total Ventas ($)</h3>
            <p>{totalVentas}</p>
          </div>
        </div>

        <div className="charts-container">
          <div className="chart">
            <h3>Destinos más comprados</h3>
            <BarChart width={500} height={300} data={dataReservasPorDestino} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="destino" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#0d47a1" />
            </BarChart>
          </div>

          <div className="chart">
            <h3>Ventas por Tipo de Precio</h3>
            <PieChart width={400} height={300}>
              <Pie
                data={dataVentasPorTipoPrecio}
                dataKey="total"
                nameKey="tipo"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label
              >
                {dataVentasPorTipoPrecio.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  );
}

