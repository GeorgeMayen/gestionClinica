import React from "react";
import { useNavigate } from 'react-router-dom';


function Logout({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const salir = () => {
    setIsLoggedIn(false); // Cambia el estado de autenticación a "false"

    navigate('/'); 
  };
  const permanecer = () => {
    navigate('/Inicio'); 
  };
  return (
    <div className="w-full h-screen flex flex-col items-center bg-gray-100">
      <h1 className="text-5xl text-center pt-100 mt-150">
        ¿Estás seguro que deseas salir?
      </h1>
      <div className="flex flex-row mt-10">

        <button className="mr-10 w-150 h-50 bg-purple-500 text-white font-bold rounded hover:bg-purple-700 hover:text-white" onClick={salir}>
          Si
        </button>
        <button className="w-150 h-50 bg-purple-500 text-white font-bold rounded hover:bg-purple-700 hover:text-white" onClick={permanecer}>No</button>
      </div>
    </div>
  );
}
export default Logout;
