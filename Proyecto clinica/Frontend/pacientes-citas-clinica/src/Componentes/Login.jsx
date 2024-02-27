import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Login( props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  const navigate = useNavigate();
  const handleLogin = () => {
    const credentials = { username, password };
    // Enviar las credenciales al servidor
    fetch("http://localhost:3002/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        console.log("Response status:", response.status); // Agrega este console.log

        if (response.status === 200) {
          console.log("Redirección a /Inicio"); // Agrega este console.log
          props.setIsLoggedIn(true); // Actualizar el estado de inicio de sesión
          navigate('/Inicio'); 
        } else if (response.status === 401) {
          alert("Credenciales incorrectas");
        } else {
          alert("Error interno del servidor");
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        alert("Error al iniciar sesión");
      });
  };

  return (
    <div className="h-screen w-full p-100 flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-600 h-600 ">
        <div className="text-3xl font-bold text-center mb-6">
          <FontAwesomeIcon icon={faUser} className="text-blue-500 text-8xl m-10" />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-2xl font-bold mb-2">
            Nombre de usuario
          </label>
          <input
            type="text"
            id="username"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-2xl font-bold mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 w-full"
          />
        </div>
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full h-50"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default Login;