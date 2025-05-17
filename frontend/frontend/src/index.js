// Copyright (c) 2024 [Your Name or Organization]. All rights reserved.

import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './Dashboard';
import BuscarViajes from './BuscarViajes';
import Airlines from './Airlines';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/buscar" element={<BuscarViajes />} />
      <Route path="/aerolineas/:viajeId" element={<Airlines />} />
    </Routes>
  </BrowserRouter>
);
