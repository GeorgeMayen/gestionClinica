import React from "react";
import { useLocation, Link } from "react-router-dom";

function MenuBar(prop) {
  // Obtiene la ubicación actual
  const location = useLocation();

  // Verifica si la ubicación actual corresponde a la página indicada
  const Home = location.pathname === "/";
  const Clinica = location.pathname === "/Clinica";
  const Servicios = location.pathname === "/Servicios";
  const Contacto = location.pathname === "/Contacto";

  return (
    //bg-gray quiere decir: fondo gris,  text-white es texto blanco, p-4 es padding de 4

    <nav className="w-full h-full p-3 bg-pink-600  flex text-2xl text-white">
      <div className="w-1/2 text-left flex items-center">
        <img
          className="w-20 h-20 rounded-full bg-white p-2 ml-3"
          src={require(`../Imagenes/${prop.logo}.png`)}
          alt="Logo clinica"
        />
        <div className="ml-5 text-center italic">
          <p>Clínica de ginecología y obstetricia</p>
          <p>Dra. Nancy Centeno</p>

        </div>
      </div>
      <div className="w-1/2 flex items-center justify-end pr-4">
        <ul className="flex space-x-9">
          <li>
            <Link to="/" className={Home ? "underline" : "hover:underline"}>
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/Clinica"
              className={Clinica ? "underline" : "hover:underline"}
            >
              Clínica
            </Link>
          </li>
          <li>
            <Link
              to="/Servicios"
              className={Servicios ? "underline" : "hover:underline"}
            >
              Servicios
            </Link>
          </li>
          <li>
            <Link
              to="/Contacto"
              className={Contacto ? "underline" : "hover:underline"}
            >
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default MenuBar;
//Instalamos react router para el enrutamiento
//npm install react-router-dom

//Instalamos fontawesome
/*
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
 */
