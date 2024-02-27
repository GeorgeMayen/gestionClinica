import React from "react";

function Clinica(prop) {
  const imagenUrl = require(`../Imagenes/${prop.imagen}.jpg`);
  const iconoUbicacionUrl = require(`../Imagenes/${prop.iconoUbicacion}.png`);
  const edificio = require(`../Imagenes/${prop.edificio}.jpeg`);
  
  
  
  // Supongamos que tienes una lista de imágenes y sus descripciones
  const imagenesConDescripcion = [
    {
      imagen: require("../Imagenes/Edificio.jpg"),
      descripcion: "Edificio Santo Domingo",
    },
    {
      imagen: require("../Imagenes/oficina602.jpg"),
      descripcion: "Oficina 602",
    },
    {
      imagen: require("../Imagenes/LugarEspera.jpg"),
      descripcion: "Sala de espera",
    },
    {
      imagen: require("../Imagenes/Secretaría.jpg"),
      descripcion: "Secretaría",
    },
    {
      imagen: require("../Imagenes/Doctora.jpg"),
      descripcion: "Área de entrevista",
    },
    {
      imagen: require("../Imagenes/LugarExamen.jpg"),
      descripcion: "Área de examen",
    },
  ];

  return (
    <div className="h-full w-full bg-gray-100 pt-50 pb-50 relative ">
      
        {/* Icono de ubicación */}
        <div className=" mt-150 absolute left-1/2 transform -translate-x-1/2 ">
          <img
            src={iconoUbicacionUrl}
            alt="Icono de ubicación"
            className=" mr-40 w-200 h-200"
          />
        </div>

        {/* Texto de ubicación a la derecha */}
        <div className="mt-225 absolute left-1/2   ">
          <p className="text-white text-5xl font-bold ">Ubicación</p>
        </div>
      
      {/* Imagen principal */}
      <img src={imagenUrl} alt="Imagen de inicio" className="w-full h-500" />

 {/* Información del edificio centrada */}
 <div className="w-full flex justify-center items-center p-6">
        <img
          src={edificio}
          alt="Edificio Santo domingo"
          className="mr-40 w-500 h-500"
        />
        <p className="text-center text-xl">
          Dra.Nancy A. Centeno Aldana <br />
          Ginecóloga-Obstetra <br />
          Dirección: 11 calle 10-56 zona 1 <br />
          Edificio Santo Domingo. 6to. Nivel Of.602
        </p>
      </div>
      <div className="text-center text-4xl font-bold">
        <p>Instalaciones</p>
      </div>
      {/* Cuadrícula de imágenes y descripciones */}
      <div className="grid grid-cols-3 gap-4 mt-6 ml-5">
        {imagenesConDescripcion.map((imagenConDescripcion, index) => (
          <div key={index} className="text-center">
            <img
              src={imagenConDescripcion.imagen}
              alt={`Imagen ${index + 1}`}
              className="w-600 h-400"
            />
            <p className="mt-2 text-black text-xl">{imagenConDescripcion.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Clinica;
