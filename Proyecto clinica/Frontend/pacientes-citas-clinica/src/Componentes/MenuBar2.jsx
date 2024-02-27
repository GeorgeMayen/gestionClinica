import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useLocation , Link} from 'react-router-dom';
import React, { useState } from 'react';

function MenuBar() {
  const [showPacientesSubMenu, setShowPacientesSubMenu] = useState(false);
  const [showCitasSubMenu, setShowCitasSubMenu] = useState(false);

  const togglePacientesSubMenu = () => {
    setShowPacientesSubMenu(!showPacientesSubMenu);
  };

  const toggleCitasSubMenu = () => {
    setShowCitasSubMenu(!showCitasSubMenu);
  };


   // Obtiene la ubicación actual
 const location = useLocation();
const Pacientes = location.pathname === '/Pacientes';
const Citas = location.pathname === '/Citas';

  return (
    <nav className="bg-pink-600 text-white p-4  mt-140 text-3xl">
      <div className="container mx-auto">
        <ul className="flex justify-between space-x-4">
          <li><Link to="/Inicio" className='hover:underline'>Inicio</Link></li>
          <li
            onMouseEnter={togglePacientesSubMenu}
            onMouseLeave={togglePacientesSubMenu}
            className={showPacientesSubMenu ? 'active' : ''}
          >
            <Link to="/Pacientes" className='hover:underline'>Pacientes</Link>
            {showPacientesSubMenu && (
              <ul className="submenu">
                <li><Link to="/Pacientes" className={Pacientes ? 'underline ml-35' : 'hover:underline ml-35'}>Operaciones</Link></li>
              </ul>
            )}
          </li>
          <li
            onMouseEnter={toggleCitasSubMenu}
            onMouseLeave={toggleCitasSubMenu}
            className={showCitasSubMenu ? 'active' : ''}
          >
            <Link to="/Citas" className='hover:underline'>Citas</Link>
            {showCitasSubMenu && (
              <ul className="submenu">
                <li><Link to="/Citas" className={Citas ? 'underline ml-35' : 'hover:underline ml-35'}>Operaciones</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/Logout" className='hover:underline'>Logout </Link><FontAwesomeIcon icon={faRightFromBracket} /></li>
        </ul>
      </div>
    </nav>
  );
}

export default MenuBar;
