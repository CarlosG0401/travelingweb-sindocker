// Copyright (c) 2025 TravelingWeb. All rights reserved.
//En este código se configura la aplicación React para que use React Router para manejar las rutas de la aplicación. Cada ruta corresponde a un componente específico que se renderiza cuando se accede a esa ruta en el navegador.
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
import ErroresRecomendaciones from './ErroresRecomendaciones';
import Pago from './Pago';

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
      <Route path="/validacion-documentacion" element={<ErroresRecomendaciones />} />
      <Route path="/pago" element={<Pago />} />
    </Routes>
  </BrowserRouter>
);
