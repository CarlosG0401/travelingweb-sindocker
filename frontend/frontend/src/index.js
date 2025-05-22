// Copyright (c) 2025 TravelingWeb. All rights reserved.

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './Dashboard';
import BuscarViajes from './BuscarViajes';
import Airlines from './Airlines';
import ObtenerPrecio from './ObtenerPrecio';
import FormularioCliente from './FormularioCliente';
import SeleccionAsientos from './SeleccionAsientos';
import AdminCRUDVuelos from './AdminCRUDVuelos';
import AdminReportes from './AdminReportes';
import DetalleReserva from './DetalleReserva';
import LoginAdmin from './AdminLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/buscar" element={<BuscarViajes />} />
      <Route path="/aerolineas/:viajeId" element={<Airlines />} />
      <Route path="/detalle-precio/:aerolineaId" element={<ObtenerPrecio />} />
      <Route path="/formulario-cliente" element={<FormularioCliente />} />
      <Route path="/seleccion-asientos" element={<SeleccionAsientos />} />
      <Route path="/admin/crud-vuelos" element={<AdminCRUDVuelos />} />
      <Route path="/admin/reportes" element={<AdminReportes />} />
      <Route path="/detalle-reserva" element={<DetalleReserva />} />
      <Route path="/admin/login" element={<LoginAdmin />} />
    </Routes>
  </BrowserRouter>
);
