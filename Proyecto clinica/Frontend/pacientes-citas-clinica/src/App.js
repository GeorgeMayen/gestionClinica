import React, { useState } from 'react';
import './App.css';
import MenuBar from './Componentes/MenuBar2';
import Logo from './Componentes/Logo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OperacionesPacientes from './Componentes/OperacionesPacientes';
import OperacionesCitas from './Componentes/OperacionesCitas';
import Inicio from './Componentes/Inicio';
import Pie from './Componentes/Pie';
import Logout from './Componentes/Logout';
import Login from './Componentes/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        
        {isLoggedIn ? (
          <div>
            <Logo logo="Mujer"/>
            <MenuBar />
            <Routes>
              <Route path="/Inicio" element={<Inicio imagen1="Consulta" imagen2="Papanicolaou" imagen3="Ultrasonido" imagen4="Planificacion" imagen5="Prenatal" imagen6="Parto" />} />
              <Route path="/Pacientes" element={<OperacionesPacientes />} />
              <Route path="/Citas" element={<OperacionesCitas />} />
              <Route path="/Logout" element={<Logout  setIsLoggedIn={setIsLoggedIn}/>} />

            </Routes>
            <Pie />
          </div>
        ) : (
          <Login setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </Router>
  );
}

export default App;
