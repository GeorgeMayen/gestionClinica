import React from "react";

function Contacto(prop) {
  const imagenContacto = require(`../Imagenes/${prop.imagen}.jpg`);
  const iconoContacto = require(`../Imagenes/${prop.icono}.png`);

// Supongamos que tienes una lista de información de contacto
const informacionContacto = [
  {
    icono: require("../Imagenes/IconoDir.png"),
    titulo: "Dirección",
    parrafo: "11 calle 10-56 zona 1.",
    parrafo2: " Edificio Santo Domingo, 6to Nivel Of. 602",
  },
  {
    icono: require("../Imagenes/iconoCorr.png"),
    titulo: "Correo Electrónico",
    parrafo: "nancycentenoaldana@gmail.com",
    parrafo2: "nancycentenoaldana@yahoo.es",
  },
  {
    icono: require("../Imagenes/iconoTel.png"),
    titulo: "Teléfono",
    parrafo: ["Oficina: ", "4469-8179"],
    parrafo2: ["Emergencias: ", "4040-8689"],
  },
];

return (
  <div className="h-screen w-full bg-gray-100 pt-50 pb-50 relative">
    {/* Icono de contacto */}
    <div className="mt-150 absolute left-1/2 transform -translate-x-1/2">
      <img
        src={iconoContacto}
        alt="Icono de contacto"
        className="mr-20 mt-20 w-50 h-50"
      />
    </div>

    {/* Texto de contacto a la derecha */}
    <div className="mt-225 absolute left-1/2">
      <p className="text-white text-5xl font-bold">Contacto</p>
    </div>

    {/* Imagen principal */}
    <img src={imagenContacto} alt="Imagen de inicio" className="w-full h-500" />

    {/* Información de contacto */}
    <div className="grid grid-cols-3 gap-4 mt-100">
      {informacionContacto.map((item, index) => (
        <div key={index} className="text-center">
          <img
            src={item.icono}
            alt={item.titulo}
            className="w-20 h-20 mx-auto"
          />
          <p className="mt-2 text-black font-bold">{item.titulo}</p>
          <p className="text-black">{item.parrafo}</p>
          <p className="text-black">{item.parrafo2}</p>
        </div>
      ))}
    </div>
  </div>
);
}

export default Contacto;