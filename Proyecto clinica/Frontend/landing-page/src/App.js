import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuBar from './Componentes/MenuBar';
import Inicio from './Componentes/Inicio';
import Clinica from './Componentes/Clinica';
import Servicios from './Componentes/Servicios';
import Contacto from './Componentes/Contacto';
import Pie from './Componentes/Pie';

function App() {

  return (
    <div className="App">
      
      <MenuBar logo="Mujer" />
      <Routes>
        <Route path="/" element={<Inicio imagen1="Consulta" imagen2="Papanicolaou" imagen3="Ultrasonido" imagen4="Planificacion" imagen5="Prenatal" imagen6="Parto" />} />
        <Route path="/Clinica" element={<Clinica imagen="Ubicacion1" iconoUbicacion="iconoUbicacion" edificio="Doctora" />} />
        <Route path="/Servicios" element={<Servicios imagen="Inicio" />} />
        <Route path="/Contacto" element={<Contacto imagen="Contacto" icono="iconoContacto" />} />
  
      </Routes>
      <Pie />
    </div>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
